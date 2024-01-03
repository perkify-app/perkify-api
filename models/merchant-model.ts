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
export const addMerchantInfo = (req: any) => {
    const { body, params } = req
    const queryValues = []
    let queryStr = 'UPDATE merchant_info'
    if (body) {
        queryStr += ` SET`
        if (body.company_name) {
            queryValues.push(body.company_name)
            if (queryValues.length > 1) {
                queryStr += `, company_name = $${queryValues.length}`
            } else {
                queryStr += ` company_name = $${queryValues.length}`
            }
        }
        if (body.logo_url) {
            queryValues.push(body.logo_url)
            if (queryValues.length > 1) {
                queryStr += `, logo_url = $${queryValues.length}`
            } else {
                queryStr += ` logo_url = $${queryValues.length}`
            }
        }
        if (body.description) {
            queryValues.push(body.description)
            if (queryValues.length > 1) {
                queryStr += `, description = $${queryValues.length}`
            } else {
                queryStr += ` description = $${queryValues.length}`
            }
        }
        if (body.address) {
            queryValues.push(body.address)
            if (queryValues.length > 1) {
                queryStr += `, address = $${queryValues.length}`
            } else {
                queryStr += ` address = $${queryValues.length}`
            }
        }
        if (body.phone_number) {
            queryValues.push(body.phone_number)
            if (queryValues.length > 1) {
                queryStr += `, phone_number = $${queryValues.length}`
            } else {
                queryStr += ` phone_number = $${queryValues.length}`
            }
        }
    }
    queryValues.push(params.merchant_id)
    queryStr += ` WHERE merchant_id = $${queryValues.length}`
    return db.query(queryStr, queryValues)
    .then((data: any) => {
    return data.rows
})
};