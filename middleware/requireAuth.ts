import { Request, Response, NextFunction } from 'express';
import { UserContext } from './jwtHeaderAuth';
import ApiError from '../classes/ApiError';

interface AuthRequest extends Request {
    user: UserContext
}

export default function requireAuth(...roles: string[]): any;
export default function requireAuth(callback: (req: AuthRequest) => boolean): any;
export default function requireAuth(...args: any) {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw new ApiError(401, "Unauthorised");

            switch (typeof args[0]) {
                case "function":
                    const isValid = args[0](req);
                    if (!isValid) throw new ApiError(403, "Not allowed");
                    break;
                default:
                    const requiredRoles = args as string[];
                    if (requiredRoles.length && !requiredRoles.some(role => req.user.roles.includes(role))) {
                        throw new ApiError(403, "Role not allowed");
                    }
                    break;
            }
            next();
        }
        catch (err) {
            next(err)
        }
    }
    //4724af6d-bbfa-4422-9889-60a938f4f8d1

    //expired token:
    //eyJhbGciOiJIUzI1NiIsImtpZCI6IjFYYjZuelUzZE9Tamo0ajYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA0NzIxNTI0LCJpYXQiOjE3MDQ3MTc5MjQsImlzcyI6Imh0dHBzOi8vZ3RpbHNocXB3aHpldGhyaGV6am4uc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImUyMzAyMmE0LTgwZWUtNGJkOC1hMzBkLTljZDhiMTE5ZDI1MSIsImVtYWlsIjoiYUBhLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsicm9sZXMiOlsibWVyY2hhbnQiXX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MDQ3MTc5MjR9XSwic2Vzc2lvbl9pZCI6ImNhZWExMDc0LTcyMzYtNDk5MC05OWQxLWUyYzljNDZlNGEwOCJ9.AyFVfmlq1SllMgTMf2ePkFXqZZ5nOsbG4BnQB0l8ntI
}