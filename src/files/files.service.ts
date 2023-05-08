import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path"
import * as fs from "fs"
import * as uuid from "uuid"

export enum TypeFile {
    AUDIO = "audio",
    IMAGE = "image",
    ARCHIVE = "archive"
}

@Injectable()
export class FilesService {

    async createImageFile(file): Promise<string> {
        try {
            const extname = file.originalname.split('.').pop()
            switch (extname) {
                case "jpg":
                case "png":
                case "jpeg":
                    break
                default:
                    throw new HttpException('Неверный формат изображения: доступные форматы .jpg, .jpeg, .png', HttpStatus.FORBIDDEN)
            }
            const fileName = uuid.v4() + '.' + extname
            const filePath = path.resolve(__dirname, '..', 'static', 'image')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createAudioFile(file): Promise<string> {
        try {
            const extname = file.originalname.split('.').pop()
            switch (extname) {
                case "mp3":
                case "ogg":
                    break
                default:
                    throw new HttpException('Неверный формат аудио: доступные форматы .mp3, .ogg', HttpStatus.FORBIDDEN)
            }
            const fileName = uuid.v4() + '.' + extname
            const filePath = path.resolve(__dirname, '..', 'static', 'audio')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createArchiveFile(file): Promise<string> {
        try {
            const extname = file.originalname.split('.').pop()
            switch (extname) {
                case "zip":
                case "rar":
                case "7z":
                    break
                default:
                    throw new HttpException('Неверный формат архива: доступные форматы .zip, .rar, .7z', HttpStatus.FORBIDDEN)
            }
            const fileName = uuid.v4() + '.' + extname
            const filePath = path.resolve(__dirname, '..', 'static', 'archive')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeFile(name: string, type: TypeFile) {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', type)
            fs.unlinkSync(path.join(filePath, name))
            return name
        } catch (e) {
            throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
