import { item } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class ItemEntity implements item {
    id: number;
    catalog_id: number;
    name: string;
    article: string;
    price: Decimal;
    hidden: boolean;
    //catalog: Prisma.catalogCreateNestedOneWithoutItemInput;
    //item_characteristic?: Prisma.item_characteristicCreateNestedManyWithoutItemInput;
}
