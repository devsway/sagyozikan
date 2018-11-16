function Log() {
    this.startUp = 'localhost bootlog'//起動時
    this.shutdown = ': SHUTDOWN_TIME:'//終了時
    this.reg_startUp = new RegExp('.*' + this.startUp + '.*$', 'i')
    this.reg_shutdown = new RegExp('.*' + this.shutdown + '.*$', 'i')
    this.log_start = [];
    this.log_end = [];
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

/**
 * todo いい感じoutputするやーつ
 */
Log.prototype.put = function () {
    console.log("--------起動時間--------");
    this.log_start.forEach(function (data) {
        console.log(data);
    });
    console.log("--------終了時間--------");
    this.log_end.forEach(function (data) {
        console.log(data);
    });
}

module.exports = Log;
