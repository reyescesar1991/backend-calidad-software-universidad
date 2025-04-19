export type FilterOptions<T extends string> = {

    [K in T]? : unknown;
}