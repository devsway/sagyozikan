const exec = require('child_process').exec;
//todo:これからAugとかにする。。//
//引数なかったら今月
const d = new Date();
const month = d.getMonth();
const MonthCode = formatToMouthName(month);

REMouthCode = new RegExp(MonthCode + '.+', 'i');
//if (data.match(/Aug.+/i) === null) {

const last_command = process.argv[2];

exec('last ' + last_command, (err, data, stderr) => {
  if (err) {
    console.log(err);
  }
  const dataArr = data.split(/\r\n|\r|\n/);
  // dataArr.forEach(function (element) {
  //   console.log(element);
  // })
  const result = dataArr.filter(kongetudake)
  const result2 = [];
  result.forEach(function (data) {
    if (data.match(REMouthCode) === null) {
      return true;
    }
    result2.push(data.match(REMouthCode)[0])
  })
  //反対にする
  result2.reverse();
  console.log("日付だけ");
  //todo:同一日付はいい感じにする。
  //おそらく日付別に管理するくらいが良い気がする。。
  result2.forEach(function (data) {
    //console.log(data);
  })
  result2.forEach(function (data) {
    console.log(data);
  })
  //じかんだけくれ
  console.log("時間だけ");
  const kiriage = last_command === 'shutdown';
  result2.forEach(function (data) {
    //todo:同一日付はいい感じにする。
    //おそらく日付別に管理するくらいが良い気がする。。
    console.log(
      kiriage ? round_time(data.match(/\d\d:\d\d/)[0]) : round_time_up(data.match(/\d\d:\d\d/)[0])
    );
  })
});

function kongetudake(zenbu) {
  //todo : 月の情報だけをget正規表現で抜き出す
  let aaa = zenbu.match(REMouthCode);
  return aaa !== null;
}

/**
 * 日付だけ取り出す
 * @param zenbu
 * @returns {boolean}
 */
function hidukedakeToridasu(zenbu) {
  //todo : 月の情報だけをget正規表現で抜き出す
  let aaa = zenbu.match(REMouthCode);
  return aaa !== null;
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
  ];
  return monthNames[monthNum];
}