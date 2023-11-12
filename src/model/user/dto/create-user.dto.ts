import { IsBoolean, IsNotEmpty, Length, IsString, IsEmail } from 'class-validator';
import { IsUniq } from 'src/common/exceptions/isUniq.exception';

export class CreateUserDto {
    @IsUniq({ tableName: 'user', column: 'email' })
    @IsEmail()
    @Length(3, 100)
    @IsString({ message: 'Должно быть строкой' })
    @IsNotEmpty()
    readonly email: string;

    @Length(6, 50)
    @IsString({ message: 'Должно быть строкой' })
    @IsNotEmpty()
    readonly password: string;

    @IsBoolean()
    readonly active: boolean = true;
}
