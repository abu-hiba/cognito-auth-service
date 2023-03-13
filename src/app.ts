import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import session, { SessionOptions } from "express-session"
import { authRouter, authMiddleware } from "./auth"
import { getSecret } from "./lib/secretsManager"
import DynamoDBStore from "./lib/dynamodbStore"

export default async () => {
  const app = express()

  const sessionSecret = await getSecret("session_secret")
  if (!sessionSecret) throw new Error("Could not get session secret")

  const sessionName = await getSecret("session_name")
  if (!sessionName) throw new Error("Could not get session name")

  const sessionTtl = await getSecret("session_lifetime")
  if (!sessionTtl) throw new Error("Could not get session lifetime")

  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, NODE_ENV } = process.env
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error("Missing AWS credentials")
  }

  const sessionOptions: SessionOptions = {
    store: new DynamoDBStore({
      awsRegion: AWS_REGION,
      tableName: "user_sessions",
      ttl: parseInt(sessionTtl),
    }),
    secret: sessionSecret,
    name: sessionName,
    cookie: {
      maxAge: parseInt(sessionTtl),
      // httpOnly: true,
      // domain: "",
      // secure: NODE_ENV === "production",
    },
    resave: true,
    saveUninitialized: true,
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(morgan("combined"))

  app.use(session(sessionOptions))

  app.use('/auth', authRouter)

  app.use('/example', authMiddleware, (req, res, next) => {
    console.log({ session: req.session })
    res.json({ loggedIn: true })
  })

  return app
}
