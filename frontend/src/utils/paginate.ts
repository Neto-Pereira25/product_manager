export function paginate<T>(arry: T[], page: number, perPage: number): T[] {
    const start = (page - 1) * perPage;
    return arry.slice(start, start + perPage);
}