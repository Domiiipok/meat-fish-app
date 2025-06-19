import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authTelegram(body: {
        initData: string;
    }): Promise<{
        message: string;
    }>;
}
