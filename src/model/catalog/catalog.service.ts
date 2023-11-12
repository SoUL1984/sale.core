import { Injectable } from '@nestjs/common';
import { catalog, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class CatalogService {
    constructor(private readonly prisma: PrismaService) {}

    async findMany({
        where,
        orderBy,
        page,
        limit,
    }: {
        where?: Prisma.catalogWhereInput;
        orderBy?: Prisma.catalogOrderByWithRelationInput;
        page?: number;
        limit?: number;
    }): Promise<{ list_catalog: catalog[]; count: number }> {
        const skip = page > 0 ? limit * (page - 1) : 0;
        const [nCount, aCatalog] = await Promise.all([
            this.prisma.catalog.count({ where }),
            this.prisma.catalog.findMany({
                where,
                orderBy,
                take: limit,
                skip,
            }),
        ]);

        return { list_catalog: aCatalog || [], count: nCount || 0 };
    }

    async one(id: Prisma.catalogWhereUniqueInput): Promise<catalog | null> {
        return this.prisma.catalog.findUnique({
            where: id,
        });
    }

    async create(data: Prisma.catalogCreateInput): Promise<catalog> {
        return this.prisma.catalog.create({
            data,
        });
    }

    async update(params: { where: Prisma.catalogWhereUniqueInput; data: Prisma.catalogUpdateInput }): Promise<boolean> {
        const { where, data } = params;
        const vCatalog = await this.prisma.catalog.update({
            data,
            where,
        });

        let isUpdate = false;
        if (vCatalog) {
            isUpdate = true;
        }

        return isUpdate;
    }

    async delete(where: Prisma.catalogWhereUniqueInput): Promise<boolean> {
        const vCatalog = await this.prisma.catalog.delete({
            where,
        });

        let isDelete = false;
        if (vCatalog) {
            isDelete = true;
        }

        return isDelete;
    }
}
