interface userAggregateRequest {
    stocksTicker: String,
    multiplier: number,
    timespan: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year',
    from: String,
    to: String,
    adjusted?: boolean,
    sort?: "asc" | "desc",
    limit?: number,
    movingAverageDays?: number
}

interface aggregateResponse {
    ticker: String,
    queryCount: number,
    resultsCount: number,
    adjusted: boolean,
    results: Array<Results>,
    status: String,
    request_id: String,
    count: number,
}

type Results = {
    c: number,
    h: number,
    l: number,
    n?: number,
    o: number,
    t: number,
    v: number,
    vw?: number,
    otc?: boolean,
}