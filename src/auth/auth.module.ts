import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getMailConfig } from "../configs/mail.config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../user/user.model";
import { Code } from "./code.model";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
          secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
          signOptions: {
            expiresIn: '24h'
          }
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
        SequelizeModule.forFeature([User, Code])
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
