import { DynamoDBClient, GetItemCommand, GetItemCommandInput, PutItemCommand, PutItemCommandInput, DeleteItemCommand, DeleteItemCommandInput, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb"
import { SessionData, Store } from "express-session"
import dayjs from "dayjs"

type DynamoDBStoreOptions = {
    awsRegion: string
    tableName: string
    ttl?: number
    disableTTL?: boolean
    disableTouch?: boolean
    captureRejections?: boolean // added to prevent error: Type 'DynamoDBStoreOptions' has no properties in common with type 'EventEmitterOptions'.ts(2559)
}

const noop: Function = () => { }

export default class DynamoDBStore extends Store {
    client: DynamoDBClient
    tableName: string
    ttl: number
    disableTTL: boolean
    disableTouch: boolean

    constructor(options: DynamoDBStoreOptions) {
        super(options)

        const client = new DynamoDBClient({ region: options.awsRegion })

        this.client = client
        this.tableName = options.tableName
        this.ttl = options.ttl || 1000 * 60 * 60 // default to 1 hour
        this.disableTTL = options.disableTTL || false
        this.disableTouch = options.disableTouch || false
    }

    public async get(sid: string, cb = noop) {
        const params: GetItemCommandInput = {
            TableName: this.tableName,
            ConsistentRead: true,
            Key: {
                SessionId: {
                    S: sid,
                },
            },
        }

        const command = new GetItemCommand(params)

        try {
            const result = await this.client.send(command)
            if (!result.Item?.sess.S) return cb(null ,null)
            return cb(null, JSON.parse(result.Item.sess.S))
        } catch (err) {
            return cb(err, null)
        }
    }

    public async set(sid: string, session: SessionData, cb = noop) {
        const creationTime = dayjs()
        const expirationTime = creationTime.add(this.ttl, "milliseconds")
        const params: PutItemCommandInput = {
            TableName: this.tableName,
            Item: {
                SessionId: {
                    S: sid,
                },
                CreationTime: {
                    N: JSON.stringify(creationTime.unix()),
                },
                ExpirationTime: {
                    N: JSON.stringify(expirationTime.unix()),
                },
                sess: {
                    S: JSON.stringify(session),
                },
            },
        }

        const command = new PutItemCommand(params)

        try {
            await this.client.send(command)
            return cb()
        } catch (err) {
            return cb(`Error setting session details.\n${err}`)
        }
    }

    public async destroy(sid: string, cb = noop) {
        const params: DeleteItemCommandInput = {
            TableName: this.tableName,
            Key: {
                SessionId: {
                    S: sid,
                },
            },
        }

        const command = new DeleteItemCommand(params)

        try {
            await this.client.send(command)
            return cb()
        } catch (err) {
            return cb(`Error destroying session.\n${err}`)
        }
    }

    // public touch(sid: string, session: SessionData, cb = noop) {
    //     const params: UpdateItemCommandInput = {
    //         TableName: this.tableName,
    //         Key: {
    //             SessionId: {
    //                 S: sid,
    //             },
    //         },
    //     }
    // }

    // public all() { }

    // public clear() { }

    // public length() { }

    // public reap() { }

    // public getExpiresValue() { }
}
