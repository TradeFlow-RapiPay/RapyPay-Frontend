export class SignInResponse {
    constructor(userId, username, token) {
        this.userId = userId;
        this.username = username;
        this.token = token;
    }
}