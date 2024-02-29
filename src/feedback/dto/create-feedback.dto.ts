import { Length } from "class-validator";

export class CreateFeedbackDto {

    @Length(20, 3000)
    readonly text: string;
}