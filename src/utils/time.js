const convertTimeToMilliSecond = (time) => {
    const splitedTime = time.split(':')
    return ((+splitedTime[0]) * 60 * 60 + (+splitedTime[1]) * 60 + (+splitedTime[2])) * 1000
}

const convertSecondToMilliSecond = (second) => {
    return second * 1000
}

export { convertTimeToMilliSecond, convertSecondToMilliSecond }