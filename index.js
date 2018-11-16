const Log = require('./Log')
const exec = require('child_process').exec

//todo:これからAugとかにする。。//
//引数なかったら今月
const d = new Date()
const month = d.getMonth()
const MonthCode = formatToMouthName(month)

const last_command = process.argv[2]

exec('cat /var/log/system.log', {maxBuffer: 11024 * 11024}, (err, data, stderr) => {
    if (err) console.log(err)
    const log = new Log()
    log.add(data)
    log.put()

})

/**
 *
 * @param monthNum
 * @returns {string}
 */
function formatToMouthName(monthNum) {
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec",
    ]
    return monthNames[monthNum]
}