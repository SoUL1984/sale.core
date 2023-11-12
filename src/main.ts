import { NestFactory } from '@nestjs/core';
//import { ValidationPipe } from './common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/sale');
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Median')
        .setDescription('The Median API description')
        .setVersion('0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document);
    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true,
            whitelist: true,
            exceptionFactory: (errors) => {
                const messages = errors[0].constraints;
                const message = Object.values(messages)[0];
                const response = { message, statusCode: HttpStatus.BAD_REQUEST };
                throw new HttpException(response, HttpStatus.BAD_REQUEST);
            },
        }),
    );

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(3001);
}
bootstrap();
