export class SignInResponse {
    constructor(userId, username, role, token) {
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.token = token;
    }
}