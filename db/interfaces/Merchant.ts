export default interface IMerchant {
    id: string;
    company_name: string;
    description: string;
    address: string;
    phone_no?: string;
    logo_url?: string;
    merchant_category_id?: number;
    lat_long?: string;
}