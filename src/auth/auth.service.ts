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
import { jwtDecode } from "jwt-decode";

const EXPIRE_TIME = 20 * 1000;
const ACCESS_TIME = '4h'
const REFRESH_TIME = '14d'

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService,
                private mailerService: MailerService,
                @InjectModel(Code) private codeRepository: typeof Code,
                @InjectModel(User) private userRepository: typeof User) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async createCode(dto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({where: {email: dto.email}})
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.CONFLICT)
        }
        const codeCandidate = await this.codeRepository.findOne({where: {email: dto.email}})
        if (codeCandidate) {
            await codeCandidate.destroy()
        }
        const codeNumber = await this.sendConfirmLetter(dto.email)
        const codeR = await this.codeRepository.create({
            email: dto.email,
            password: dto.password,
            code: codeNumber
        })
        return true
    }

    async registration(userDto: CreateUserDto) {
        const codeObj = await this.codeRepository.findOne({
            where: {
                email: userDto.email
            }
        })
        const candidate = await this.userService.getOneByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.CONFLICT)
        }
        console.log(codeObj.code, userDto.code)
        if (codeObj.code !== userDto.code) {
            throw new HttpException('Введён неправильный код', 403)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        await this.codeRepository.destroy({where: {email: userDto.email}})
        const user = await this.userService.create({...userDto, password: hashPassword})
        return await this.generateToken(user)
    }


    async isValidationToken(accessToken: string, refreshToken: string) {
        let res: any = {isValid: false}
        try {
            await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.jwtRefreshTokenKey,
            })
            res = {...res, refreshToken: refreshToken}
        } catch {
            return res
        }
        try {
            await this.jwtService.verifyAsync(accessToken, {
                secret: process.env.jwtSecretKey,
            })
        } catch {
            const decode: any = jwtDecode(accessToken)
            const userInfo = decode.user
            const payload = {user: userInfo}
            accessToken = await this.jwtService.signAsync({...payload, type: "act"}, {
                expiresIn: ACCESS_TIME,
                secret: process.env.jwtSecretKey,
            })
        }

        res.isValid = true
        res = {...res, accessToken: accessToken}

        return res
    }

    private async generateToken(user: User) {
        const {password, ...userInfo} = user.dataValues
        const payload = {user: userInfo}
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync({...payload, type: "act"}, {
                    expiresIn: ACCESS_TIME,
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync({...payload, type: "rct"}, {
                    expiresIn: REFRESH_TIME,
                    secret: process.env.jwtRefreshTokenKey,
                }),
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            },
        };
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
