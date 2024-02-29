import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../user/user.model";
import * as bcrypt from "bcryptjs";
import { MailerService } from "@nestjs-modules/mailer";
import * as path from "path";
import { InjectModel } from "@nestjs/sequelize";
import { Code } from "./code.model";
import jwtDecode from "jwt-decode";

@Injectable()
export class AuthUserService {

    constructor(private userService: UserService,
                private jwtService: JwtService,
                private mailerService: MailerService,
                @InjectModel(Code) private codeRepository: typeof Code,
                @InjectModel(User) private userRepository: typeof User) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registrationData(dto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({where: {email: dto.email}})
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.CONFLICT)
        }
        const codeCandidate = await this.codeRepository.findOne({where: {email: dto.email}})
        if (codeCandidate) {
            await codeCandidate.destroy()
        }
        const codeNumber = await this.sendConfirmLetter(dto.email)
        return await this.codeRepository.create({
            email: dto.email,
            password: dto.password,
            code: codeNumber
        })
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getOneByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.CONFLICT)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        await this.codeRepository.destroy({where: {email: userDto.email}})
        const user = await this.userService.create({...userDto, password: hashPassword})
        return await this.generateToken(user)
    }


    async isValidationToken(token) {
        try {
            const data = jwtDecode(token)
        } catch (e) {
            return "Access denied"
        }
        return "Access is allowed"
    }

    async checkEmailCode(code: number) {

    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, identifier: user.identifier}
        return {
            token: this.jwtService.sign(payload, {expiresIn: "24h"})
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getOneByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Неправильный E-Mail или пароль'})
    }

    private async sendConfirmLetter(email: string) {
        const code = Math.round(Math.random() * 899999 + 100000)
        await this.mailerService
            .sendMail({
                to: email,
                subject: 'Подтверждение регистрации',
                template: path.join(__dirname, '/../templates', 'confirmReg'),
                context: {
                    code
                },
            })
            .catch((e) => {
                throw new HttpException(
                    `Ошибка работы почты: ${JSON.stringify(e)}`,
                    HttpStatus.UNPROCESSABLE_ENTITY,
                );
            });
        return code
    }
}
