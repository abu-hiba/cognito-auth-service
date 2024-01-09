interface UserProperties {
    email: string;
    password: string;
};

export class User {
    constructor(private properties: UserProperties) { }

    setEmail(email: string) {
        this.properties.email = email;
    }

    setPassword(password: string) {
        this.properties.password = password;
    }

    getEmail() {
        return this.properties.email;
    }

    getPassword() {
        return this.properties.password;
    }
}

