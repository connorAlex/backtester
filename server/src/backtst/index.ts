import { backtest, analyze, IAnalysis } from "grademark";
import * as dataForge from "data-forge";
import "data-forge-fs";
import "data-forge-indicators"
import { formatResponse, computePercentage } from "./utils";
import { getAggregate } from "../loaders/polygon";
import { request } from "../utils";

// user submits request
// SMA built from user data
// return SMA analysis for front end view

// function takes a request from the user.
// would return the backtester analysis


const sampleRequest: userAggregateRequest = {
    stocksTicker: "AAPL",
    multiplier: 1,
    timespan: 'day',
    from: '2022-01-09',
    to: '2023-01-09',
    adjusted: true,
    sort: "asc",
    limit: 120,
    movingAverageDays: 30
}

const eRule = (enterPosition: any, args: any) => {
    //is CLOSING PRICE smaller than the AVERAGE? (i.e. undervalued)
    if (args.bar.close < args.bar.sma) {
        // If so, enter a position.
        enterPosition();
    }
}

const myExit = (exitPosition: any, args: any) => {
    if (args.bar.close > args.bar.sma) {
        exitPosition();
    }
}

const stopLoss = (args: any, percent: number) => {
    return args.entryPrice * (percent / 100)
}


const createStrategy = (entry: any, exit: any, stop: any) => {
    let strategy: strategy = {
        entryRule: entry,
        exitRule: exit,
        stopLoss: stop

    }
    return strategy
}


const getData = async (req: userAggregateRequest) => {
    const response = await request(getAggregate(req));
    let jsonSeries = formatResponse(await response);

    return await jsonSeries;
}

const buildAnalysis = async (request: userAggregateRequest): Promise<IAnalysis> => {
    const days = request.movingAverageDays? request.movingAverageDays: 0;
    const strategy = createStrategy(
        eRule,
        myExit,
        stopLoss
    );

    let inputSeries = await getData(request);

    // Moving Average calculation
    let movingAverage = inputSeries
        .deflate(bar => bar.close)
        .sma(days)

    //Integrate MA into data, indexed on date
    inputSeries = await inputSeries
        .skip(days)
        .withSeries("sma", await movingAverage)
        .bake();

    const trades = backtest(strategy, await inputSeries);
    const analysis = analyze(10000, await trades);

    return (await analysis);

}

const printData = async (tradeData: Promise<IAnalysis>) => {
    console.table(await tradeData); 
}

printData(buildAnalysis(sampleRequest));