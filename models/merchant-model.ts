const db = require('../db/connection');

export const allMerchants = () => {
    return db.query(`SELECT * FROM merchant_info;`)
    .then((data: any) => {
        return data.rows;
    })
};
export const specificMerchant = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT * FROM merchant_info
        WHERE merchant_id = $1
        `, [params.merchant_id])
    .then((data: any) => {
        return data.rows
    })
};
// export const addMerchantInfo = (req: any) => {
//     const { body, params } = req
//     return db.query(`
//     UPDATE merchant_info
//     SET 
//     WHERE merchant_id = $2
//     `, [body, params.merchant_id])
//     .then((data: any) => {
//     return data.rows
// })
// };