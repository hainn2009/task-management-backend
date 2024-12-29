import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
        {
            message:
                'Passwords must contain at least 1 upper case letter, 1 lower case letter and one number OR special charracter',
        },
    )
    password: string;
}
