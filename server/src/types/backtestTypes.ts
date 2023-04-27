
type strategyType = {
    exitRule: (enterPosition: any, args: any) => any;
    entryRule: () => any;
    stopLoss: () => any;
}

