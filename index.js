const exec = require('child_process').exec
//todo:これからAugとかにする。。//
//引数なかったら今月
const d = new Date()
const month = d.getMonth()
const MonthCode = formatToMouthName(month)

const last_command = process.argv[2]

exec('cat /var/log/system.log', {maxBuffer: 11024 * 11024}, (err, data, stderr) => {

    if (err) console.log(err)

    const log = new Logs()
    log.add(data)
    log.put()

})

function Logs() {
    this.startUp = 'localhost bootlog'//起動時
    this.shutdown = ': SHUTDOWN_TIME:'//終了時
    this.reg_startUp = new RegExp('.*' + this.startUp + '.*$', 'i')
    this.reg_shutdown = new RegExp('.*' + this.shutdown + '.*$', 'i')

    this.log_start = [];
    this.log_end = [];
}

Logs.prototype.add = function (data) {
    data.split(/\r\n|\r|\n/).forEach(function (str) {
        if (str.match(this.reg_startUp)) {
            this.log_start.push(str)
        } else if (str.match(this.reg_shutdown)) {
            this.log_end.push(str)
        }
    }, this)
}

/**
 * todo いい感じoutputするやーつ
 */
Logs.prototype.put = function () {
    console.log("--------起動時間--------");
    this.log_start.forEach(function (data) {
        console.log(data);
    });
    console.log("--------終了時間--------");
    this.log_end.forEach(function (data) {
        console.log(data);
    });
}

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