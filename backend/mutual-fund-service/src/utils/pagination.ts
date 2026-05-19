export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationResult {
  limit: number;
  offset: number;
  page: number;
}



export const getPagination = (
  query: PaginationQuery
): PaginationResult => {

  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
};