
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { JWTPayload } from './jwt.payload';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validate(username: string, password: string): Promise<boolean> {
        const usuario = await this.userService.findByUsername(username);
        if (!username || !password) return false;
        return await this.userService.checkPassword(usuario, password);
    }

    async generateToken(name: string): Promise<{ token: string }> {
        const user = await this.userService.findByUsername(name);
        const payload: JWTPayload = { id: user.id, username: user.username };
        return { token: this.jwtService.sign(payload), };
    }
}
