export default class ApiError extends Error {
    constructor(status:number, message?:string){
        super(message);
        this.status = status;
    }
    status: number;
}