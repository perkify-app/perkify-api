import ApiError from '../classes/ApiError';
import db from '../db/connection'
import ILoyaltyProgram from '../db/interfaces/LoyaltyProgram';


export interface ILoyaltyProgramParams {
    merchant_id?: string
}

export const getAllLoyaltyPrograms = async ({ merchant_id }: ILoyaltyProgramParams) => {
    const values: any[] = [];
    const whereStatement = merchant_id && values.push(merchant_id) ? "WHERE merchant_id = $1" : "";

    const data = await db.query(`SELECT * FROM loyalty_programs ${whereStatement}`, values);
    return data.rows;
};

export const getLoyaltyProgramById = async (loyalty_program_id: number, merchant_id?: string) => {
    const values: any[] = [loyalty_program_id];

    const whereStatement = `WHERE id = $1 ${merchant_id && values.push(merchant_id) ? `AND merchant_id = $${values.length}` : ""}`;

    const data = await db.query(`SELECT * FROM loyalty_programs ${whereStatement}`, values);

    if (!data.rowCount) throw new ApiError(404, "Loyalty program not found");
    return data.rows[0];
};

export const createLoyaltyProgram = async ({ merchant_id, name, required_points }: ILoyaltyProgram) => {
    const data = await db.query(`
        INSERT INTO loyalty_programs(merchant_id, name, required_points)
        VALUES ($1, $2, $3)
        RETURNING *`, [merchant_id, name, required_points]);

    return data.rows;
};

export const removeLoyaltyProgram = async (loyalty_program_id: number, merchant_id?: string) => {
    const values: any[] = [loyalty_program_id];

    const whereStatement = `WHERE id = $1 ${merchant_id && values.push(merchant_id) ? `AND merchant_id = $${values.length}` : ""}`;
    await db.query(`DELETE FROM loyalty_programs ${whereStatement}`, values);
};
