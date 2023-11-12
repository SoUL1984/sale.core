import { Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
    userTable: Prisma.userDelegate;

    constructor(db: PrismaService) {
        this.userTable = db.user;
    }

    async findMany({
        where,
        orderBy,
        page,
        limit,
    }: {
        where?: Prisma.userWhereInput;
        orderBy?: Prisma.catalogOrderByWithRelationInput;
        page?: number;
        limit?: number;
    }): Promise<{ list_user: user[]; count: number }> {
        const skip = page > 0 ? limit * (page - 1) : 0;
        const [nCount, aUser] = await Promise.all([
            this.userTable.count({ where }),
            this.userTable.findMany({
                where,
                orderBy,
                take: limit,
                skip,
            }),
        ]);

        return { list_user: aUser || [], count: nCount || 0 };
    }

    async one(id: Prisma.userWhereUniqueInput): Promise<user | null> {
        return this.userTable.findUnique({
            where: id,
        });
    }

    async create(data: Prisma.userCreateInput): Promise<user> {
        return this.userTable.create({
            data,
        });
    }

    async update(params: { where: Prisma.userWhereUniqueInput; data: Prisma.userUpdateInput }): Promise<boolean> {
        const { where, data } = params;
        const vUser = await this.userTable.update({
            data,
            where,
        });

        let isUpdate = false;
        if (vUser) {
            isUpdate = true;
        }

        return isUpdate;
    }

    async delete(where: Prisma.userWhereUniqueInput): Promise<boolean> {
        const vUser = await this.userTable.delete({
            where,
        });

        let isDelete = false;
        if (vUser) {
            isDelete = true;
        }

        return isDelete;
    }
}
