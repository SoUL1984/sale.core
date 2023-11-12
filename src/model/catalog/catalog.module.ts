import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [CatalogController],
    providers: [CatalogService],
})
export class CatalogModule {}
