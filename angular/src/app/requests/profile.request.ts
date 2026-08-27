export class ProfileRequest {

    public constructor(
        private nom: string,
        private prenom: string,
        private email: string,
    ) { }

    public toJson(): JSON {
        return <JSON><unknown>{
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
        };
    }

}

export class ProfilePasswordRequest {

    public constructor(
        private currentPassword: string,
        private newPassword: string,
    ) { }

    public toJson(): JSON {
        return <JSON><unknown>{
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
        };
    }

}
