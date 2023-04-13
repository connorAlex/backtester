interface userAggregateRequest {
    stocksTicker: String,
    multiplier: number,
    timespan: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year',
    from: String,
    to: String,
    adjusted?: boolean,
    sort?: "asc" | "desc",
    limit?: number,
}

interface aggregateResponse {
    ticker: String,
    queryCount: number,
    resultsCount: number,
    adjusted: boolean,
    results: Array<Object>,
    status: String,
    request_id: String,
    count: number
}