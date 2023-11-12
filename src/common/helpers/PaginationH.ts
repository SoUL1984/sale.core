// export interface PaginationInterface<T> {
//     data: T[];
//     pagination: {
//         total: number;
//         countPage: number;
//         currentPage: number;
//         limit: number;
//         prev: number | null;
//         next: number | null;
//     };
// }

// export type PaginateOptions = { page?: number | string; limit?: number | string };
// export type PaginateFunction = <T, K>(
//     model: any,
//     args?: K,
//     options?: PaginateOptions,
// ) => Promise<PaginationInterface<T>>;

// export const paginator = (defaultOptions?: PaginateOptions): PaginateFunction => {
//     return async (model, args: any = { where: undefined }, options) => {
//         const page = Number(options?.page || defaultOptions?.page) || 1;
//         const limit = Number(options?.limit || defaultOptions?.limit) || 10;

//         const skip = page > 0 ? limit * (page - 1) : 0;
//         const [total, data] = await Promise.all([
//             model.count({ where: args.where }),
//             model.findMany({
//                 ...args,
//                 take: limit,
//                 skip,
//             }),
//         ]);
//         const lastPage = Math.ceil(total / limit);

//         return {
//             data,
//             pagination: {
//                 total,
//                 countPage: lastPage,
//                 currentPage: page,
//                 limit,
//                 prev: page > 1 ? page - 1 : null,
//                 next: page < lastPage ? page + 1 : null,
//             },
//         };
//     };
// };

/**
 * Интерфейс для пагинации
 */

export interface PaginationInterface {
    curr_page: number; // Текущая страница
    total: number; // Всего товаров
    page_total: number; // Всего страниц
    page_limit: number; // Всего количество на странице
    prev: number | null;
    next: number | null;
}

/**
 * Создание информации о пагинации с расчетом количества страниц
 */
export function mCalcPagination(curr_page: number, total: number, page_limit: number): PaginationInterface {
    return {
        curr_page,
        total,
        page_total: Math.ceil(total / page_limit),
        page_limit,
        prev: curr_page > 1 ? curr_page - 1 : null,
        next: curr_page < total ? curr_page + 1 : null,
    };
}
