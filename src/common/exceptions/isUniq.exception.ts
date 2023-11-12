import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqConstraint } from './isUniqConstraint.exception';

export type IsUniqConstraintInput = {
    tableName: string;
    column: string;
};

export function IsUniq(options: IsUniqConstraintInput, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isUniq',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqConstraint,
        });
    };
}
