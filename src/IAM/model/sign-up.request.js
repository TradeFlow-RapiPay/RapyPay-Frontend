export class SignUpRequest {
    constructor(username, email, birthdate, objective,password) {
        this.username = username;
        this.email = email;
        this.birthdate = birthdate;
        this.objective = objective;
        this.password = password;
    }
}