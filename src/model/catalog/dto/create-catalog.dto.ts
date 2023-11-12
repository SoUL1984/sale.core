import { IsBoolean, IsNotEmpty, Length, IsString } from 'class-validator';
import { IsUniq } from 'src/common/exceptions/isUniq.exception';

export class CreateCatalogDto {
    @IsUniq({ tableName: 'catalog', column: 'name' })
    @Length(3, 200)
    @IsString({ message: 'Должно быть строкой' })
    @IsNotEmpty()
    readonly name: string;

    @IsBoolean()
    readonly hidden: boolean = false;
}
