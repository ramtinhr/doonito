const moment = require('moment-jalaali')


const dayOfWeek = (date) => {

    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true })
    return moment(date).format('dddd')

}

export { dayOfWeek }