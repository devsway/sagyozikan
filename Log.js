function Log() {
    this.startUp = ': BOOT_TIME'//起動時
    this.shutdown = ': SHUTDOWN_TIME:'//終了時
    this.reg_startUp = new RegExp('.*' + this.startUp + '.*$', 'i')
    this.reg_shutdown = new RegExp('.*' + this.shutdown + '.*$', 'i')
    this.log_start = [];
    this.log_end = [];
    this.delimiter = '__///__';
}

Log.prototype.add = function (data) {
    data.split(/\r\n|\r|\n/).forEach(function (str) {
        if (str.match(this.reg_startUp)) {
            this.log_start.push(str)
        } else if (str.match(this.reg_shutdown)) {
            this.log_end.push(str)
        }
    }, this)
}

Log.prototype.put = function () {
    console.log("--------起動時間--------");
    this.log_start.forEach(function (data) {
        console.log(round_time_up(data.match(/\d\d:\d\d/)[0]) + this.delimiter + data);
    }, this);
    console.log("--------終了時間--------");
    this.log_end.forEach(function (data) {
        console.log(round_time(data.match(/\d\d:\d\d/)[0]) + this.delimiter + data);
    }, this);
}

/**
 *
 * @param time
 * @returns {string}
 */
function round_time(time) {
    const nanzi = time.match(/^\d\d/);
    let nanpun = time.match(/:\d\d/)[0].match(/\d\d/)[0];
    nanpun = (nanpun / 30 >= 1) ? '30' : '00';
    return nanzi + ':' + nanpun;
}

/**
 *
 * @param time
 * @returns {string}
 */
function round_time_up(time) {
    let nanzi = time.match(/^\d\d/);
    let nanpun = time.match(/:\d\d/)[0].match(/\d\d/)[0];
    if (nanpun === '00') {//10:00の場合は唯一変えない
        //nop
    } else if (nanpun / 30 > 1) {
        nanpun = '00';
        nanzi++;
    } else {
        nanpun = '30';
    }
    return nanzi + ':' + nanpun;
}

module.exports = Log;
