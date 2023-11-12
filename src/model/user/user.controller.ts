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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { mCalcPagination, PaginationInterface } from 'src/common/helpers/PaginationH';
import { user } from '@prisma/client';

// http://localhost:3001/api/user
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // http://localhost:3001/api/user
    @Post()
    async create(@Body() createUserData: CreateUserDto): Promise<user> {
        const vUser = await this.userService.create(createUserData);
        return vUser;
    }

    // http://localhost:3001/api/user
    @Get()
    async findMany(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<{ list_user: user[]; pagination: PaginationInterface }> {
        const vUserWithPagination = await this.userService.findMany({ page, limit });
        const vPagination = mCalcPagination(page, vUserWithPagination.count, limit);

        return { list_user: vUserWithPagination.list_user, pagination: vPagination };
    }

    // http://localhost:3001/api/user/1
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<boolean> {
        return await this.findOne(+id);
    }

    // http://localhost:3001/api/user/1
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<boolean> {
        const idUser = +id;
        const vUser = await this.userService.one({ id: idUser });

        if (!vUser) {
            throw new NotFoundException('User not found');
        }

        return await this.userService.update({ where: { id: idUser }, data: updateUserDto });
    }

    // http://localhost:3001/api/user/1
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<boolean> {
        const idUser = Number(id);
        const vUser = await this.userService.one({ id: idUser });

        if (!vUser) {
            throw new NotFoundException('User not found');
        }

        return await this.userService.delete({ id: +id });
    }
}
