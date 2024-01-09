import db from "../db/connection";

export const allMerchants = () => {
    return db.query(`
    SELECT m.*, mc.name category FROM merchants m
    INNER JOIN merchant_categories mc ON mc.id = m.merchant_category_id;
    `)
    .then((data: any) => {
        return data.rows;
    })
};
export const specificMerchant = (req: any) => {
    const { params } = req
        return db.query(`
        SELECT m.*, mc.name category FROM merchants m
        INNER JOIN merchant_categories mc ON mc.id = m.merchant_category_id   
        WHERE m.id = $1;
        `, [params.id])
    .then((data: any) => {
        return data.rows[0]
    })
};
export const addMerchantInfo = (req: any) => {
    const { body, params } = req
    const queryValues = []
    let queryStr = 'UPDATE merchants'
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
        if (body.phone_no) {
            queryValues.push(body.phone_no)
            if (queryValues.length > 1) {
                queryStr += `, phone_no = $${queryValues.length}`
            } else {
                queryStr += ` phone_no = $${queryValues.length}`
            }
        }
        if (body.category) {
            queryValues.push(body.category)
            if (queryValues.length > 1) {
                queryStr += `, category = $${queryValues.length}`
            } else {
                queryStr += ` category = $${queryValues.length}`
            }
        }
    }
    queryValues.push(params.id)
    queryStr += ` WHERE id = $${queryValues.length}`
    return db.query(queryStr, queryValues)
    .then((data: any) => {
    return data.rows
})
};