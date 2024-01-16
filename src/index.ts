import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { authMiddleware, authRouter } from "./auth"
import { AuthenticationRouter } from "./router"

const PORT = parseInt(process.env.PORT || "8080")

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(morgan("combined"))

app.use('/auth', authRouter)

const authenticationRouter = new AuthenticationRouter();
app.use('/authn', authenticationRouter.router);

app.use('/example', authMiddleware, (req, res, next) => {
  res.json({ loggedIn: true })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
