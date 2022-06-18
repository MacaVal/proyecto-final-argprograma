export class Login {
    id?: number;
    mail: string;
    password: string;
    persona_id: number;

    constructor(mail: string, password: string, persona_id: number) {
        this.mail = mail;
        this.password = password;
        this.persona_id = persona_id;
    }
}