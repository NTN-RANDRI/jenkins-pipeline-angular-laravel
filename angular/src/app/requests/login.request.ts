export class LoginRequest {

    public constructor(
        private email: string,
        private password: string,
    ) {}

    public toJson(): JSON {
        return <JSON><unknown> {
            'email': this.email,
            'password': this.password,
        }
    }

}