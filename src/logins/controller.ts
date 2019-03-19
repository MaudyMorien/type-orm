import { JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import { IsString, Length, MinLength, IsEmail } from 'class-validator'
import { Fluffball } from '../fluffballs/entity'
import { sign } from '../jwt'

class AuthenticatePayload {
    @IsString()
    email: string

    @IsString()
    password: string
}

@JsonController()
export default class LoginController {

    @Post('/logins')
    async authenticate(
        @Body() { email, password }: AuthenticatePayload    
    ) { 
        const fluffball = await Fluffball.findOne({ where: { email } })
        // if user exists
        if (!fluffball) throw new BadRequestError('A user with this email does not exist')
        // if password is correct
        if (!await fluffball.checkPassword(password)) throw new BadRequestError('The password is incorrect')
        // send back a jwt token
        const jwt = sign( { id: fluffball.id! } )
        return { jwt }
    }
}
