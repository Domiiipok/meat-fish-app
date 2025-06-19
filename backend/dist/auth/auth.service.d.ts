import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    verifyTelegram(initData: string): Promise<void>;
}
