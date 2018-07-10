const amapFile = require('../pages/common/lib/amap-wx.js');
const myAmapFun = new amapFile.AMapWX({ key: "ee74e707186a855bcbe58d0f6dc6b532" });
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const getLocationName = (longitude,latitude, cb) =>{
  if(longitude && latitude) {
    myAmapFun.getRegeo({
      location: longitude + ',' + latitude,
      success: function (res) {
       return typeof cb === 'function' && cb(res);
      },
      fail: function() {
       return console.log("经纬度地址逆解析失败");
      }
    });
  }
  
}
module.exports = {
    formatTime: formatTime,
    getLocationName: getLocationName
}
