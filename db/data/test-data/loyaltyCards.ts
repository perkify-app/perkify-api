import ILoyaltyCard from "../../interfaces/LoyaltyCard";

export default [
  {
    loyalty_program_id: 1,
    user_id: "U1",
    points: 0,
    created_at: new Date(1586179020000),
  },
  {
    loyalty_program_id: 2,
    user_id: "U2",
    points: 1,
    created_at: new Date(1604113380000),
  },
  {
    loyalty_program_id: 3,
    user_id: "U3",
    points: 2,
    created_at: new Date(1583025180000),
  }
] as ILoyaltyCard[];