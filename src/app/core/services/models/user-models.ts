
export interface IUser{
    user: string;
    password: string;
    mail: string;
    tlf:string;
    token?: string;
    rol?: string;
    numeroPedido:[];
    address?: string;
    cp?: string;
    provincia?: string;
    data?:{
        theme: string,
        language: string,
        user?: string;
    }
}




