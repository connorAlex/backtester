import { describe, assert, expect, it, beforeAll, afterAll} from 'vitest';
import { getAggregate } from '../loaders/polygon';
import { request } from '../utils';
import { formatResponse } from '../backtst/utils';

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

describe("Load in market JSON Data", () => {
    it("Parse JSON to DataFrame", async () => {
        const res = await request(getAggregate(aggregateRequest));
        const data = await formatResponse(res);
        expect(await data.toArray()[0]["open"]).toEqual(130.465);
    })
})
    