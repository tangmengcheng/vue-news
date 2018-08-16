export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(3 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function setTime(item) {
    let date1 = new Date(item).getTime() / (1000 * 60)
    let date2 = new Date(Date()).getTime() / (1000 * 60)
    let _time = ''
    if (date2 - date1 < 1) {
      _time = '刚刚'
    } else if ((date2 - date1) >= 1 && date2 - date1 < 60) {
      _time = parseInt((date2 - date1)) + '分钟'
    } else if (((date2 - date1) / 60) >= 1 && ((date2 - date1) / 60) < 24) {
      _time = parseInt((date2 - date1) / 60) + '小时前'
    } else if (((date2 - date1) / 60 / 24) >= 1 && ((date2 - date1) / 60 / 24) < 31) {
      _time = parseInt((date2 - date1) / 60 / 24) + '天前'
    } else if (((date2 - date1) / 60 / 24 / 30) >= 1 && ((date2 - date1) / 60 / 24 / 30) < 13) {
      _time = parseInt(((date2 - date1) / 60 / 24 / 30)) + '月前'
    } else if (((date2 - date1) / 60 / 24 / 30 / 12) >= 1) {
      _time = parseInt((date2 - date1) / 60 / 24 / 30 / 12) + '年前'
    }
    return _time
}
