import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength, IsEmail } from 'class-validator'

@Entity()
export class Fluffball extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @MinLength(2)
    @Column('text')
    firstName: string

    @IsString()
    @MinLength(2)
    @Column('text')
    lastName: string


    @IsString()
    @Length(2, 50)
    @Column('text')
    @IsEmail()
    email: string

    @IsString()
    @Length(3)
    @Column('text')
    city: string
}
