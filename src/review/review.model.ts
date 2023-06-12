import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";

interface ReviewCreationAttrs {
    text: string;
    starts: number;
    userId: number;
    creatorId: number;
}

@Table({tableName: 'reviews'})
export class Review extends  Model<Review, ReviewCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: true})
    text: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    stars: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Creator)
    creator: Creator;
}