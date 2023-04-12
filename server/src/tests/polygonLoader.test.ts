import { describe, assert, expect, it, beforeAll, afterAll} from 'vitest';
import config from '../config';
import { getAggregate } from '../loaders/polygon';

const aggregateRequest: userAggregateRequest = {
    stocksTicker: "AAPL",
    multiplier: 1,
    timespan: 'day',
    from: '2023-01-09',
    to: '2023-01-09',
    adjusted: true,
    sort: "asc",
    limit: 120
}

describe("Dynamically build Polygon API requests", () => {
    it("build an aggregate api call", () => {
        const url = getAggregate(aggregateRequest);
        console.log(url);
        expect(url).toEqual("https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=" + config.poly_key)
    });
})