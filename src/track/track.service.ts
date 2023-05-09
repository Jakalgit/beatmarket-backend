import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Track } from "./track.model";
import { CreateTrackDto } from "./dto/create-track.dto";
import { FilesService, TypeFile } from "../files/files.service";
import { ChangeNameDto } from "../dto/change-name.dto";
import { ChangeBpmDto } from "./dto/change-bpm.dto";
import { CreateArchiveLicenseDto } from "./dto/create-archive-license.dto";
import { ArchiveLicense } from "./archive-license.model";
import {License} from "../license/license.model";

@Injectable()
export class TrackService {

    constructor(@InjectModel(Track) private trackRepository: typeof Track,
                @InjectModel(ArchiveLicense) private archiveRepository: typeof ArchiveLicense,
                @InjectModel(License) private licenseRepository: typeof License,
                private fileService: FilesService) {
    }

    async create(dto: CreateTrackDto, image, audio) {
        // тут должна быть проверка на существование создателя, его блокировку и существования такого же трека у создателя
        const imagePath = await this.fileService.createImageFile(image)
        const audioPath = await this.fileService.createAudioFile(audio)
        return await this.trackRepository.create({
            ...dto,
            bpm: Number(dto.bpm),
            audio: audioPath,
            image: imagePath,
            purchases: 0,
            listens: 0
        })
    }

    async delete(id: number) {
        const track = await this.trackRepository.findByPk(id)
        if (!track) {
            throw new HttpException('Произведение не найдено', HttpStatus.NOT_FOUND)
        }
        await this.fileService.removeFile(track.image, TypeFile.IMAGE)
        await this.fileService.removeFile(track.audio, TypeFile.AUDIO)
        await track.destroy()
        return track
    }

    // метод для тестирования, возможны изменения
    async addArchiveLicense(dto: CreateArchiveLicenseDto, archiveFile) {
        const track = await this.trackRepository.findByPk(dto.trackId)
        if (!track) {
            throw new HttpException('Произведение не найдено', HttpStatus.NOT_FOUND)
        }
        const archiveName = await this.fileService.createArchiveFile(archiveFile)
        const archiveLicense = await this.archiveRepository.create({...dto, path: archiveName})
        await track.$add('license', [archiveLicense.id])
        return archiveLicense
    }

    // метод для тестирования, возможны изменения
    async removeArchiveLicense(id: number) {
        const archiveLicense = await this.archiveRepository.findByPk(id)
        if (!archiveLicense) {
            throw new HttpException('Архив лицензии не найден', HttpStatus.NOT_FOUND)
        }
        await this.fileService.removeFile(archiveLicense.path, TypeFile.ARCHIVE)
        await archiveLicense.destroy()
        return archiveLicense
    }

    async getAllLicenseByTrackId(id: number) {
        const archives = await this.archiveRepository.findAll({where: {trackId: id}})
        let licensesResponse = []
        for (let i = 0; i < archives.length; i++) {
            const license = await this.licenseRepository.findByPk(archives[i].licenseId)
            licensesResponse.push(license)
        }
        return licensesResponse
    }

    async getOneById(id: number) {
        return await this.trackRepository.findByPk(id)
    }

    async getAll() {
        return await this.trackRepository.findAll()
    }

    async getAllOnPage(options: string) {

    }

    async changeName(dto: ChangeNameDto) {
        const track = await this.trackRepository.findByPk(dto.id)
        if (!track) {
            throw new HttpException('Произведение не найдено', HttpStatus.NOT_FOUND)
        }
        track.name = dto.name
        await track.save()
        return track
    }

    async changeBpm(dto: ChangeBpmDto) {
        const track = await this.trackRepository.findByPk(dto.id)
        if (!track) {
            throw new HttpException('Произведение не найдено', HttpStatus.NOT_FOUND)
        }
        track.bpm = dto.bpm
        await track.save()
        return track
    }

    async changeImage(id: number, file) {
        const track = await this.trackRepository.findByPk(id)
        if (!track) {
            throw new HttpException('Произведение не найдено', HttpStatus.NOT_FOUND)
        }
        const imageFile = await this.fileService.createImageFile(file)
        await this.fileService.removeFile(track.image, TypeFile.IMAGE)
        track.image = imageFile
        await track.save()
        return imageFile
    }

    async changeAudio(id: number, file) {
        const track = await this.trackRepository.findByPk(id)
        if (!track) {
            throw new HttpException('Произведение не найдено', HttpStatus.NOT_FOUND)
        }
        const audioFile = await this.fileService.createImageFile(file)
        await this.fileService.removeFile(track.audio, TypeFile.AUDIO)
        track.audio = audioFile
        await track.save()
        return audioFile
    }
}
