import config from '../config/index';
const base_url = "https://api.polygon.io/v2"

const getAggregate = (obj: userAggregateRequest): URL => {
    let url = base_url +`/aggs/ticker/${obj.stocksTicker}/range/${obj.multiplier}/${obj.timespan}/${obj.from}/${obj.to}?`;
    url += obj.adjusted? `adjusted=${obj.adjusted}` : '';
    url += obj.sort? `&sort=${obj.sort}`: '';
    url += obj.limit? `&limit=${obj.limit}` : '';
    url += `&apiKey=${config.poly_key}`;

    const apiRequestURL = new URL(url);
    return apiRequestURL;
}


export {
    getAggregate,
}