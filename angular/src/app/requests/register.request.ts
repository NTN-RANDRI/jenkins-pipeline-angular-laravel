export class RegisterRequest {

    public constructor(
        private nom: string,
        private prenom: string,
        private email: string,
        private password: string,
    ) { }

    public static fromFormGroup(registerForm: any): RegisterRequest {
        return new RegisterRequest(
            registerForm.nom,
            registerForm.prenom,
            registerForm.email,
            registerForm.password
        );
    }

    public toJson(): JSON {
        return <JSON><unknown>{
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            password: this.password,
        };
    }

}
