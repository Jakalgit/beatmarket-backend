import { IsNumber } from "class-validator";

export class CreateArchiveLicenseDto {

    @IsNumber({}, {message: "licenseId должно быть числом"})
    readonly licenseId: number;

    @IsNumber({}, {message: "trackId должно быть числом"})
    readonly trackId: number;
}