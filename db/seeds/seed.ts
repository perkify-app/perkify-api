import ILoyaltyCard from "../interfaces/LoyaltyCard";
import ILoyaltyProgram from "../interfaces/LoyaltyProgram";
import IMerchant from "../interfaces/Merchant";
import IUser from "../interfaces/User";
import IMerchantCategory from "../interfaces/MerchantCategory";

import format from "pg-format"
import db from "../connection";

export default async function seed({ merchantCategories, loyaltyPrograms, loyaltyCards, users, merchants }: { merchantCategories: IMerchantCategory[], loyaltyPrograms: ILoyaltyProgram[], loyaltyCards: ILoyaltyCard[], users: IUser[], merchants: IMerchant[] }) {
    //Delete
    await db.query(`DROP TABLE IF EXISTS loyalty_cards;`);
    await db.query(`DROP TABLE IF EXISTS loyalty_programs;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
    await db.query(`DROP TABLE IF EXISTS merchants;`);
    await db.query(`DROP TABLE IF EXISTS merchant_categories;`);

    //Create
    await db.query(`
      CREATE TABLE merchant_categories (
        id SERIAL PRIMARY KEY,        
        name VARCHAR NOT NULL
      );`
    );
    await db.query(`
      CREATE TABLE merchants (
        id VARCHAR PRIMARY KEY,        
        company_name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        address VARCHAR NOT NULL,
        phone_no VARCHAR,
        merchant_category_id INTEGER REFERENCES merchant_categories(id) ON DELETE SET NULL,
        logo_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
      );`
    );
    await db.query(`
    CREATE TABLE users (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        merchant_id VARCHAR REFERENCES merchants(id) ON DELETE SET NULL
      );`
    );
    await db.query(`
      CREATE TABLE loyalty_programs (
        id SERIAL PRIMARY KEY,
        merchant_id VARCHAR NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
        name VARCHAR NOT NULL,
        required_points INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`
    );
    await db.query(`
      CREATE TABLE loyalty_cards (
        id SERIAL PRIMARY KEY,
        loyalty_program_id INTEGER NOT NULL REFERENCES loyalty_programs(id) ON DELETE CASCADE,
        user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        points INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );`
    );
    await db.query(`
        ALTER TABLE loyalty_cards ADD CONSTRAINT unq_loyalty_cards UNIQUE ( loyalty_program_id, user_id )`
    );

    //Seed
    const insertMerchantCategoriesQueryStr = format(
        'INSERT INTO merchant_categories ( id, name ) VALUES %L;',
        merchantCategories.map(({ id, name }) => [id, name])
    );
    const insertUsersQueryStr = format(
        'INSERT INTO users ( id, name, merchant_id ) VALUES %L;',
        users.map(({ id, name, merchant_id }) => [id, name, merchant_id])
    );
    const insertMerchantsQueryStr = format(
        'INSERT INTO merchants ( id, merchant_category_id, company_name, description, address, phone_no, logo_url ) VALUES %L;',
        merchants.map(({ id, merchant_category_id, company_name, description, address, phone_no, logo_url }) => {
            return [id, merchant_category_id, company_name, description, address, phone_no, logo_url];
        })
    );
    const insertLoyaltyProgramsQueryStr = format(
        'INSERT INTO loyalty_programs (merchant_id, name, required_points) VALUES %L;',
        loyaltyPrograms.map(({ merchant_id, name, required_points }) => [merchant_id, name, required_points])
    );
    const insertLoyaltyCardsQueryStr = format(
        'INSERT INTO loyalty_cards (loyalty_program_id, user_id, points) VALUES %L;',
        loyaltyCards.map(({ loyalty_program_id, user_id, points }) => [loyalty_program_id, user_id, points])
    );

    await db.query(insertMerchantCategoriesQueryStr);
    await db.query(insertMerchantsQueryStr);
    await db.query(insertUsersQueryStr);
    await db.query(insertLoyaltyProgramsQueryStr);
    await db.query(insertLoyaltyCardsQueryStr);
};