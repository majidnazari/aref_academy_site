interface PaginatorInfo {
    count: number;
    currentPage: number;
    firstItem: number;
    hasMorePages: Boolean;
    lastItem: number;
    lastPage: number;
    perPage: number;
    total: number;
}

export default PaginatorInfo;