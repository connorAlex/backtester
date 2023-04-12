import { backtest, analyze } from "grademark";
import * as dataForge from "data-forge";
import "data-forge-fs";
import "data-forge-indicators"
const DAYS = 30;
const INPUT_STRATEGY = {
    val1: 0,
    val2: 1,
    operator: ">"
}

//loading in sample_data.csv using data-forge
let inputSeries = dataForge.readFileSync("sample_data.csv")
    .parseCSV()
    .parseDates("date", "D/MM/YYYY")
    .parseFloats(["open", "high", "low", "close", "volume"])
    .setIndex("date")
    .renameSeries({ date: "time" });

//compute an indicator to use as a trading signal
// 30 day Moving Average
const movingAverage = inputSeries
    .deflate(bar => bar.close)
    .sma(DAYS);

// Integrate moving average into data, indexed on date
inputSeries = inputSeries.withSeries("sma", movingAverage).skip(DAYS);

// need to somehow build these rules from the frontend
// the params will always be the same

const eRule = (enterPosition: any, args: any) => {
    //is CLOSING PRICE smaller than the AVERAGE? (i.e. undervalued)

    if (args.bar.close < args.bar.sma) {
        // If so, enter a position.
        enterPosition();
    }
}

const buildConditional = () => {
    
}


const strategy = {
    entryRule: eRule,

    exitRule: (exitPosition: any, args: any) => {
        if (args.bar.close > args.bar.sma) {
            exitPosition();
        }
    },

    stopLoss: (args: any) => {
        // Stop on 2% loss
        return args.entryPrice * (5 / 100);
    }
}

const trades = backtest(strategy, inputSeries);

//JSON Format, ready to be exported out
export const analysis = analyze(10000, trades);

console.log(`The backtest conducted ${trades.length} trades!`);
console.table(analysis);