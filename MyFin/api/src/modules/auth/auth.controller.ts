/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger'; 
import { AuthService } from './auth.service';
import { LoginDTO } from './LoginDTO';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
        const { username, password } = loginDTO;

        const valid = await this.authService.validate(username, password);

        if (!valid) throw new UnauthorizedException();

        return await this.authService.generateToken(username);
    }

    @Post('validate')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse()
    async validate() { }

}
