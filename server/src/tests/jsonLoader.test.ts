import { describe, assert, expect, it, beforeAll, afterAll} from 'vitest';
import { getAggregate } from '../loaders/polygon';
import { request } from '../utils';
import * as dataForge from "data-forge";
import "data-forge-fs";
import "data-forge-indicators"

//let jsonSeries = dataForge.readFileSync("sample_agg.json").parseJSON();
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
        //console.log(res);
        // const data = new dataForge.DataFrame(await res);
        // console.log(await data);
    })
})
    