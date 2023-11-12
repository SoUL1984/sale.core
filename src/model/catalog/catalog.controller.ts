import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Get,
    Query,
    DefaultValuePipe,
    ParseIntPipe,
    NotFoundException,
} from '@nestjs/common';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { CatalogService } from './catalog.service';
import { catalog } from '@prisma/client';
import { mCalcPagination, PaginationInterface } from 'src/common/helpers/PaginationH';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Post()
    async create(@Body() createCatalogData: CreateCatalogDto): Promise<catalog> {
        const vCatalog = await this.catalogService.create(createCatalogData);
        return vCatalog;
    }

    @Get('/')
    async findMany(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<{ list_catalog: catalog[]; pagination: PaginationInterface }> {
        const vCatalogWithPagination = await this.catalogService.findMany({ page, limit });
        const vPagination = mCalcPagination(page, vCatalogWithPagination.count, limit);

        return { list_catalog: vCatalogWithPagination.list_catalog, pagination: vPagination };
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateCatalogDto: UpdateCatalogDto): Promise<boolean> {
        const idCatalog = Number(id);
        const vCatalog = await this.catalogService.one({ id: idCatalog });

        if (!vCatalog) {
            throw new NotFoundException('Catalog not found');
        }

        return await this.catalogService.update({ where: { id: Number(id) }, data: updateCatalogDto });
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<boolean> {
        const idCatalog = Number(id);
        const vCatalog = await this.catalogService.one({ id: idCatalog });

        if (!vCatalog) {
            throw new NotFoundException('Catalog not found');
        }

        return await this.catalogService.delete({ id: Number(id) });
    }
}
