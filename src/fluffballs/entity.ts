import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, MinLength, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'

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
    @MinLength(3)
    @Column('text')
    city: string

    @Column('text', { nullable: true })
    @MinLength(8)
    @IsString()
    @Exclude({ toPlainOnly: true })
    password: string

    async setPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10)
        this.password = hash
    }

    checkPassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password)
    }
}

