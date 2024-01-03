import ILoyaltyCard from "../interfaces/LoyaltyCard";
import ILoyaltyProgram from "../interfaces/LoyaltyProgram";
import IMerchant from "../interfaces/Merchant";
import IUser from "../interfaces/User";

import format from "pg-format"
import db from "../connection";

export default async function seed ({ loyaltyPrograms, loyaltyCards, users, merchants }: { loyaltyPrograms: ILoyaltyProgram[], loyaltyCards: ILoyaltyCard[], users: IUser[], merchants: IMerchant[] }) {
  //Delete
  await db.query(`DROP TABLE IF EXISTS loyalty_cards;`);
  await db.query(`DROP TABLE IF EXISTS loyalty_programs;`);
  await db.query(`DROP TABLE IF EXISTS merchants;`);
  await db.query(`DROP TABLE IF EXISTS users;`);

  console.log("DELETED");

  //Create
  await db.query(`
    CREATE TABLE users (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL        
      );`
  );
  await db.query(`
      CREATE TABLE merchants (
        id VARCHAR PRIMARY KEY,
        user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
        company_name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        address VARCHAR NOT NULL,
        phone_no VARCHAR NOT NULL,
        logo_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
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

  console.log("CREATED");

  //Seed  
  const insertUsersQueryStr = format(
    'INSERT INTO users ( id, name ) VALUES %L;',
    users.map(({ id, name }) => [id, name])
  );
  const insertMerchantsQueryStr = format(
    'INSERT INTO merchants ( id, user_id, company_name, description, address, phone_no, logo_url ) VALUES %L;',
    merchants.map(({ id, user_id, company_name, description, address, phone_no, logo_url }) => {
      return [id, user_id, company_name, description, address, phone_no, logo_url];
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

  await db.query(insertUsersQueryStr);
  await db.query(insertMerchantsQueryStr);
  await db.query(insertLoyaltyProgramsQueryStr);
  await db.query(insertLoyaltyCardsQueryStr);

  console.log("SEEDED");
};