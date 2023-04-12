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