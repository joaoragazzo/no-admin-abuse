export interface ReviewCreationDTO {
    rating: number,
    text: string,
    anonymous: boolean
    tags: string[]
}