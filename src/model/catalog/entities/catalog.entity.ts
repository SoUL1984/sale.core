import { Prisma, catalog } from '@prisma/client';

export class CatalogEntity implements catalog {
    id: number;
    name: string;
    hidden: boolean;
    item?: Prisma.itemCreateNestedManyWithoutCatalogInput;
}
