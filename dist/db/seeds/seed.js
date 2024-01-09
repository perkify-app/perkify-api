"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_format_1 = __importDefault(require("pg-format"));
const connection_1 = __importDefault(require("../connection"));
function seed({ merchantCategories, loyaltyPrograms, loyaltyCards, users, merchants }) {
    return __awaiter(this, void 0, void 0, function* () {
        //Delete
        yield connection_1.default.query(`DROP TABLE IF EXISTS loyalty_cards;`);
        yield connection_1.default.query(`DROP TABLE IF EXISTS loyalty_programs;`);
        yield connection_1.default.query(`DROP TABLE IF EXISTS users;`);
        yield connection_1.default.query(`DROP TABLE IF EXISTS merchants;`);
        yield connection_1.default.query(`DROP TABLE IF EXISTS merchant_categories;`);
        //Create
        yield connection_1.default.query(`
      CREATE TABLE merchant_categories (
        id SERIAL PRIMARY KEY,        
        name VARCHAR NOT NULL
      );`);
        yield connection_1.default.query(`
      CREATE TABLE merchants (
        id VARCHAR PRIMARY KEY,        
        company_name VARCHAR NOT NULL,
        description TEXT NOT NULL,
        address VARCHAR NOT NULL,
        lat_long VARCHAR,
        phone_no VARCHAR,
        merchant_category_id INTEGER REFERENCES merchant_categories(id) ON DELETE SET NULL,
        logo_url VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
      );`);
        yield connection_1.default.query(`
    CREATE TABLE users (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        merchant_id VARCHAR REFERENCES merchants(id) ON DELETE SET NULL
      );`);
        yield connection_1.default.query(`
      CREATE TABLE loyalty_programs (
        id SERIAL PRIMARY KEY,
        merchant_id VARCHAR NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
        name VARCHAR NOT NULL,
        required_points INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
        yield connection_1.default.query(`
      CREATE TABLE loyalty_cards (
        id SERIAL PRIMARY KEY,
        loyalty_program_id INTEGER NOT NULL REFERENCES loyalty_programs(id) ON DELETE CASCADE,
        user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        points INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
        yield connection_1.default.query(`
        ALTER TABLE loyalty_cards ADD CONSTRAINT unq_loyalty_cards UNIQUE ( loyalty_program_id, user_id )`);
        //Seed
        const insertMerchantCategoriesQueryStr = (0, pg_format_1.default)('INSERT INTO merchant_categories ( id, name ) VALUES %L;', merchantCategories.map(({ id, name }) => [id, name]));
        const insertUsersQueryStr = (0, pg_format_1.default)('INSERT INTO users ( id, name, merchant_id ) VALUES %L;', users.map(({ id, name, merchant_id }) => [id, name, merchant_id]));
        const insertMerchantsQueryStr = (0, pg_format_1.default)('INSERT INTO merchants ( id, merchant_category_id, company_name, description, address, phone_no, logo_url, lat_long ) VALUES %L;', merchants.map(({ id, merchant_category_id, company_name, description, address, phone_no, logo_url, lat_long }) => {
            return [id, merchant_category_id, company_name, description, address, phone_no, logo_url, lat_long];
        }));
        const insertLoyaltyProgramsQueryStr = (0, pg_format_1.default)('INSERT INTO loyalty_programs (merchant_id, name, required_points) VALUES %L;', loyaltyPrograms.map(({ merchant_id, name, required_points }) => [merchant_id, name, required_points]));
        const insertLoyaltyCardsQueryStr = (0, pg_format_1.default)('INSERT INTO loyalty_cards (loyalty_program_id, user_id, points) VALUES %L;', loyaltyCards.map(({ loyalty_program_id, user_id, points }) => [loyalty_program_id, user_id, points]));
        yield connection_1.default.query(insertMerchantCategoriesQueryStr);
        yield connection_1.default.query(insertMerchantsQueryStr);
        yield connection_1.default.query(insertUsersQueryStr);
        yield connection_1.default.query(insertLoyaltyProgramsQueryStr);
        yield connection_1.default.query(insertLoyaltyCardsQueryStr);
    });
}
exports.default = seed;
;
