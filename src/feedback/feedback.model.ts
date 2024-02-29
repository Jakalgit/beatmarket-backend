import { Column, DataType, Model, Table } from "sequelize-typescript";

interface FeedbackCreationAttrs {
    text: string;
}

@Table({tableName: 'feedback'})
export class Feedback extends  Model<Feedback, FeedbackCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;
}