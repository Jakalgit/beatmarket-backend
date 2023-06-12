import { IsNumber, Min } from "class-validator";

export class CreateConfirmationDto {

    @IsNumber({}, {message: "userId должно быть числом"})
    readonly userId: number;

    @IsNumber({}, {message: "creatorId должно быть числом"})
    readonly creatorId: number;

    @IsNumber({}, {message: "trackId должно быть числом"})
    readonly trackId: number;

    @IsNumber({}, {message: "reserve должно быть числом"})
    @Min(0)
    readonly reserve: number;

    @IsNumber({}, {message: "licenseId должно быть числом"})
    readonly licenseId: number;
}