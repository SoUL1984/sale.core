import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './model/catalog/catalog.module';
import { ItemModule } from './model/item/item.module';
import { ConfigModule } from '@nestjs/config';
import { IsUniqConstraint } from './common/exceptions/isUniqConstraint.exception';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
    imports: [
        CatalogModule,
        ItemModule,
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // PrismaModule.forRootAsync({
        //     isGlobal: true,
        //     useFactory: async (configService: ConfigService) => {
        //         return {
        //             prismaOptions: {
        //                 log: [configService.get('log')],
        //                 datasources: {
        //                     db: {
        //                         url: configService.get('DATABASE_URL'),
        //                     },
        //                 },
        //             },
        //             explicitConnect: configService.get('explicit'),
        //         };
        //     },
        //     inject: [ConfigService],
        // }),
    ],
    controllers: [AppController],
    providers: [AppService, IsUniqConstraint],
})
export class AppModule {}
