export class PaginationDto {
  skip?: number;
  limit?: number;
  orderBy?: "ASC" | "DESC";
}
