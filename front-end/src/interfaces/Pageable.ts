export interface Pageable<T> {
    totalElements: number,
    totalPages: number,
    size: number,
    content: T[],
    number: number,
}