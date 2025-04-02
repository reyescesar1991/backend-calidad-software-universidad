export interface IJwtPayloadType {

    userId : string;
    role?: string;
    iat : number;
    exp : number;
}