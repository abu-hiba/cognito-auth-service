export type SignUpParams = {
    username: string
    password: string
    email: string
}

export type ConfirmParams = {
    username: string
    confirmationCode: string
}

export type ResendConfirmParams = {
    username: string
}

export type SignInParams = {
    username: string
    password: string
}
  