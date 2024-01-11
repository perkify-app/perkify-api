import express from 'express';
import cors from 'cors';

import getEndpointsInfo from './controllers/api-controller';
import { deleteUser, getUser, getUserLoyaltyCard, getUserLoyaltyCards, postUserLoyaltyCard } from './controllers/users-controller';
import { deleteLoyaltyCard, getLoyaltyCard, getLoyaltyCards, patchLoyaltyCard, redeemLoyaltyCard } from './controllers/loyalty-card-controller';
import { getMerchant, getMerchants, patchMerchant, getMerchantLoyaltyPrograms, getMerchantLoyaltyProgram, postMerchantLoyaltyProgram, deleteMerchantLoyaltyProgram } from './controllers/merchant-controller';
import { getLoyaltyPrograms, getLoyaltyProgram, postLoyaltyProgram, deleteLoyaltyProgram } from './controllers/loyalty-programs-controller';

import { fourOhFourHandler, apiErrorHandler, errorHandler, sqlErrorHandler } from './errors-handler';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", getEndpointsInfo);

app.get("/api/users/:user_id", getUser);
app.delete("/api/users/:user_id", deleteUser);

app.get("/api/users/:user_id/loyalty_cards", getUserLoyaltyCards);
app.get("/api/users/:user_id/loyalty_cards/:loyalty_card_id", getUserLoyaltyCard);
app.post("/api/users/:user_id/loyalty_cards", postUserLoyaltyCard);

app.get("/api/merchants", getMerchants);
app.get("/api/merchants/:merchant_id", getMerchant);
app.patch("/api/merchants/:merchant_id", patchMerchant);

app.post("/api/merchants/:merchant_id/loyalty_programs", postMerchantLoyaltyProgram);
app.get("/api/merchants/:merchant_id/loyalty_programs", getMerchantLoyaltyPrograms);
app.get("/api/merchants/:merchant_id/loyalty_programs/:loyalty_program_id", getMerchantLoyaltyProgram);
app.delete("/api/merchants/:merchant_id/loyalty_programs/:loyalty_program_id", deleteMerchantLoyaltyProgram);

app.get("/api/loyalty_cards", getLoyaltyCards);                         //Admin only??
app.get("/api/loyalty_cards/:loyalty_card_id", getLoyaltyCard);         //Admin only??
app.patch("/api/loyalty_cards/:loyalty_card_id", patchLoyaltyCard);     //Merchant only??
app.delete("/api/loyalty_cards/:loyalty_card_id", deleteLoyaltyCard);   //Merchant only??
app.get("/api/loyalty_cards/:loyalty_card_id/redeem", redeemLoyaltyCard); //TODO - To be changed

app.post("/api/loyalty_programs", postLoyaltyProgram);
app.get("/api/loyalty_programs", getLoyaltyPrograms);
app.get("/api/loyalty_programs/:loyalty_program_id", getLoyaltyProgram);
app.delete("/api/loyalty_programs/:loyalty_program_id", deleteLoyaltyProgram);

app.use(apiErrorHandler);
app.use(sqlErrorHandler);
app.use(errorHandler);

app.all('*', fourOhFourHandler);

export default app;