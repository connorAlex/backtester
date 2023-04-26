import { request } from "../utils";
import { getAggregate } from "../loaders/polygon";
import * as dataForge from 'data-forge';
import 'data-forge-fs';
import 'data-forge-indicators';


const formatResponse = async (res: any)=> {
        
    return new dataForge.DataFrame(res.results)
        .renameSeries({
            t: "time",
            c: "close",
            h: "high",
            l: "low",
            n: "transactions",
            o: "open",
            v: "volume",
            vw: "volume weighted avg price"
        })
        .transformSeries({
            "time": value => new Date(value).toUTCString()
        })
        .setIndex("time")

    
}

const computePercentage = (num: number): number => {
    return (num / 100)
}

export {
    formatResponse,
    computePercentage,
}