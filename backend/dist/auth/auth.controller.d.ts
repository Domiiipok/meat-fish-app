import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authByTelegram(initData: string): Promise<{
        ok: boolean;
        user: any;
    }>;
}
