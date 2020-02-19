export interface Question {
    name: string;
    phone?: string;
    email: string;
    message?: string;
    readonly broker?: string;
    readonly id?: string;
}
