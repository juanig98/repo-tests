export const dateToString = function (date: Date): string {
    return `${date.getFullYear().toString()}-${((date.getMonth() + 1).toString()).padStart(2, '0')}-${(date.getDate().toString()).padStart(2, '0')}`
}

export const getNextDay = function (date: Date, toString?: boolean): Date | string {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1)
    return (toString) ? dateToString(nextDay) : nextDay;
}

export const getBeforeDay = function (date: Date, toString?: boolean): Date | string {
    const beforeDay = new Date(date);
    beforeDay.setDate(date.getDate() - 1)
    return (toString) ? dateToString(beforeDay) : beforeDay;
}

export const getLastMinuteBeforeDay = function (date: Date, toString?: boolean): Date | string {
    const lastMinuteBeforeDay = new Date(getBeforeDay(new Date(date)))
    lastMinuteBeforeDay.setHours(20, 59, 59);
    return (toString) ? dateToString(lastMinuteBeforeDay) : lastMinuteBeforeDay;
}

export const getFirstMinuteNexDay = function (date: Date, toString?: boolean): Date | string {
    const lastMinuteBeforeDay = new Date(getNextDay(new Date(date)))
    lastMinuteBeforeDay.setHours(-3, 0, 0);
    return (toString) ? dateToString(lastMinuteBeforeDay) : lastMinuteBeforeDay;
}

export const getOneMonthAgo = function (date: Date, toString?: boolean): Date | string {
    const oneMonthAgo = new Date(date)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return (toString) ? dateToString(oneMonthAgo) : oneMonthAgo;
}
