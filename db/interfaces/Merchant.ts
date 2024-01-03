export default interface IMerchant {
    id: string;
    user_id: string;
    company_name: string;
    description: string;
    address: string;
    phone_no: string;
    logo_url?:string;
}