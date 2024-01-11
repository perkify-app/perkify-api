import cors from 'cors';
import express from 'express';
import getEndpointsInfo from './controllers/api-controller';
import { deleteUser, getUser, getUserLoyaltyCard, getUserLoyaltyCards, patchUser, postUserLoyaltyCard } from './controllers/users-controller';
import { deleteLoyaltyCard, getLoyaltyCard, getLoyaltyCards, patchLoyaltyCard, redeemLoyaltyCard } from './controllers/loyalty-card-controller';
import { getMerchant, getMerchants, patchMerchant, getMerchantLoyaltyPrograms, getMerchantLoyaltyProgram, postMerchantLoyaltyProgram, deleteMerchantLoyaltyProgram } from './controllers/merchant-controller';
import { getLoyaltyPrograms, getLoyaltyProgram, postLoyaltyProgram, deleteLoyaltyProgram } from './controllers/loyalty-programs-controller';
import { patchAdminUser } from './controllers/admin-controller';
import { fourOhFourHandler, apiErrorHandler, errorHandler, sqlErrorHandler } from './errors-handler';
import jwtHeaderAuth from './middleware/jwtHeaderAuth';
import requireAuth from './middleware/requireAuth';


const app = express();
app.use(cors());
app.use(express.json());
app.use(jwtHeaderAuth());

//Testing - TODO - Remove
import db from './db/connection';
require('dotenv').config({ path: `${__dirname}/.env.config` });
const Login = (email: string, password: string, name: string, merchant_id?: string) => {
    return async (req: any, res: any) => {
        const supabase = require('@supabase/supabase-js').createClient(process.env.SUPABASE_URL, process.env.PUBLIC_ANON_KEY);
        const { data } = await supabase.auth.signInWithPassword({ email, password });

        await db.query(`
            INSERT INTO users (id, name, merchant_id)
            VALUES ($1, $2, $3)
            ON CONFLICT (id) DO UPDATE
            SET name = $2,
            merchant_id = $3`, [data.user.id, name, merchant_id]
        );
        res.send(data.session.access_token);
    }
}
app.get("/login/user", Login("b@b.com", "123456", "Mr User"));
app.get("/login/merchant", Login("a@a.com", "1234", "Mr Merchant", "M2"));
app.get("/login/admin", Login("admin@admin.com", "123456", "Mr Admin"));
//


const ownUserOrAdmin = ({ user, params }: any) => user.roles.includes("admin") || user.id === params.user_id;
const ownMerchantOrAdmin = ({ user, params }: any) => user.roles.includes("admin") || user.merchant_id === params.merchant_id;


app.get("/api", getEndpointsInfo);

app.patch("/api/admin/users/:user_id", requireAuth("admin"), patchAdminUser);

app.get("/api/users/:user_id", requireAuth(ownUserOrAdmin), getUser);
app.patch("/api/users/:user_id", requireAuth(ownUserOrAdmin), patchUser);
app.delete("/api/users/:user_id", requireAuth(ownUserOrAdmin), deleteUser);

app.get("/api/users/:user_id/loyalty_cards", requireAuth(ownUserOrAdmin), getUserLoyaltyCards);
app.post("/api/users/:user_id/loyalty_cards", requireAuth(ownUserOrAdmin), postUserLoyaltyCard);
app.get("/api/users/:user_id/loyalty_cards/:loyalty_card_id", requireAuth(ownUserOrAdmin), getUserLoyaltyCard);

app.get("/api/merchants", requireAuth("user"), getMerchants);
app.get("/api/merchants/:merchant_id", requireAuth(ownMerchantOrAdmin), getMerchant);
app.patch("/api/merchants/:merchant_id", requireAuth(ownMerchantOrAdmin), patchMerchant);

app.post("/api/merchants/:merchant_id/loyalty_programs", requireAuth(ownMerchantOrAdmin), postMerchantLoyaltyProgram);
app.get("/api/merchants/:merchant_id/loyalty_programs", requireAuth(ownMerchantOrAdmin), getMerchantLoyaltyPrograms);
app.get("/api/merchants/:merchant_id/loyalty_programs/:loyalty_program_id", requireAuth(ownMerchantOrAdmin), getMerchantLoyaltyProgram);
app.delete("/api/merchants/:merchant_id/loyalty_programs/:loyalty_program_id", requireAuth(ownMerchantOrAdmin), deleteMerchantLoyaltyProgram);

app.get("/api/loyalty_cards", requireAuth("admin"), getLoyaltyCards);
app.get("/api/loyalty_cards/:loyalty_card_id", requireAuth("admin"), getLoyaltyCard);
app.patch("/api/loyalty_cards/:loyalty_card_id", requireAuth("admin"), patchLoyaltyCard);
app.delete("/api/loyalty_cards/:loyalty_card_id", requireAuth("admin"), deleteLoyaltyCard);
app.get("/api/loyalty_cards/:loyalty_card_id/redeem", redeemLoyaltyCard); //TODO - To be changed

app.get("/api/loyalty_programs", requireAuth("admin", "merchant"), getLoyaltyPrograms);
app.post("/api/loyalty_programs", requireAuth("admin"), postLoyaltyProgram);
app.get("/api/loyalty_programs/:loyalty_program_id", requireAuth("admin"), getLoyaltyProgram);
app.delete("/api/loyalty_programs/:loyalty_program_id", requireAuth("admin"), deleteLoyaltyProgram);

app.use(apiErrorHandler);
app.use(sqlErrorHandler);
app.use(errorHandler);

app.all('*', fourOhFourHandler);

export default app;