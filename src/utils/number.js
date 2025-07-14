const numberFormat = (num) => {
    if (typeof num === 'undefined' || num == null) {
        return num
    }

    if (/,/g.test(num)) {
        num = num.replace(/,/g, '')
    }

    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + ',')
}

export { numberFormat }