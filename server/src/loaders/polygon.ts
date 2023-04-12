import config from '../config/index';
const aggregate = "https://api.polygon.io/v2/aggs"

const getAggregate = (obj: userAggregateRequest): String => {
    let url = aggregate +`/ticker/${obj.stocksTicker}/range/${obj.multiplier}/${obj.timespan}/${obj.from}/${obj.to}?`;

    if (obj.adjusted) {
        url += `adjusted=${obj.adjusted}`;
    }
    if (obj.sort){
        url += `&sort=${obj.sort}`;
    }
    if (obj.limit) { 
        url += `&limit=${obj.limit}`;
    }

    url += `&apiKey=${config.poly_key}`;

    return url;
}

export {
    getAggregate,
}