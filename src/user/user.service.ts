import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { Block } from "./block.model";
import { CreateBlockDto } from "./dto/create-block.dto";
import { ChangeEmailDto } from "./dto/change-email.dto";
import { ChangePhoneDto } from "./dto/change-phone.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { ChangeImageDto } from "./dto/change-image.dto";


@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @InjectModel(Block) private blockRepository: typeof Block) {
    }

    async create(dto: CreateUserDto) {
        const rand = Date.now() +  Math.floor(Math.random() * 10000)
        const name = rand + "-market-user"
        const identifier = "id-" + rand
        return await this.userRepository.create({ ...dto, name, identifier });
    }

    async getOneById(id: number) {
        return await this.userRepository.findOne({where: {id}})
    }

    async getOneByIdentifier (identifier: string) {
        return await this.userRepository.findOne({where: {identifier}})
    }

    async getAll() {
        return await this.userRepository.findAll()
    }

    async delete() {

    }

    async block(dto: CreateBlockDto) {
        const block = await this.blockRepository.findOne({where: {userId: dto.userId}})
        const user = await this.userRepository.findByPk(dto.userId)
        if (block) {
            throw new HttpException('Пользователь уже заблокирован', HttpStatus.BAD_REQUEST)
        }
        if (user) {
            await user.$set('block', block.id)
            return dto
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    async unBlock(userId: number) {
        const block = await this.blockRepository.findOne({where: {userId}})
        const user = await this.userRepository.findByPk(userId)
        if (!block) {
            throw new HttpException('Пользователь уже разблокирован', HttpStatus.BAD_REQUEST)
        }
        if (user) {
            await user.$remove('block', block.id)
            await block.destroy()
            return user
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    async changeEmail(dto: ChangeEmailDto) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.email = dto.email
        await user.save()
        return user
    }

    async changePhone(dto: ChangePhoneDto) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.phone = dto.phone
        await user.save()
        return user
    }

    async changePassword(dto: ChangePasswordDto) {
        /*
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.password = dto.password
        await user.save()
        return user
         */
    }

    async changeImage(dto: ChangeImageDto) {
        const user = await this.userRepository.findByPk(dto.id)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.image = dto.image
        await user.save()
        return user
    }

    async changeIdentifier() {

    }
}
