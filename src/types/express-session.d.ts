import "express-session"

/**
 * Extends the SessionData interface to include types for custom properties\
 * on req.session object
 */
declare module 'express-session' {
    export interface SessionData {
      userName: string
      refreshToken: string
      accessToken: string
    }
}
