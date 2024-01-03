export default interface ILoyaltyCard {
    loyalty_program_id: number,
    user_id: string,
    points: number,
    created_at: Date,
}