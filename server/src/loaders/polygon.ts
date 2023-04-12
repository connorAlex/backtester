import config from '../config/index';
const aggregate = "https://api.polygon.io/v2/aggs"

const getAggregate = (obj: userAggregateRequest): String => {
    let url = aggregate +`/ticker/${obj.stocksTicker}/range/${obj.multiplier}/${obj.timespan}/${obj.from}/${obj.to}?`;
    url += obj.adjusted? `adjusted=${obj.adjusted}` : '';
    url += obj.sort? `&sort=${obj.sort}`: '';
    url += obj.limit? `&limit=${obj.limit}` : '';
    url += `&apiKey=${config.poly_key}`;

    return url;
}

export {
    getAggregate,
}