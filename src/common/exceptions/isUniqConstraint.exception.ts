import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { IsUniqConstraintInput } from './isUniq.exception';

@ValidatorConstraint({ name: 'IsUnique', async: true })
@Injectable()
export class IsUniqConstraint implements ValidatorConstraintInterface {
    constructor(private readonly prisma: PrismaService) {}

    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const { tableName, column }: IsUniqConstraintInput = args.constraints[0];
        const iIsExistData = await this.prisma[tableName].count({ where: { [column]: value } });

        return iIsExistData === 0;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Такая запись уже есть';
    }
}
