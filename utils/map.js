import util from './util.js';
const amapFile = require('../pages/common/lib/amap-wx.js');
const myAmapFun = new amapFile.AMapWX({ key: "ee74e707186a855bcbe58d0f6dc6b532" });
export default class Map {
  getLocationInfo() {
    let that= this;
    debugger;
    return new Promise(function(resolve, reject) {
      that.location().then(function(val) {
        myAmapFun.getRegeo({
          location: val.longitude + ',' + val.latitude,
          success: function(res) {
            resolve(res)
          },
          fail: function(fail) {
            reject(fail);
          }
        })
      },function(error) {
        // 用户拒绝授权
        wx.showModal({
          title: '',
          content: '自动定位需要授权地理定位选项',
          confirmText: '去授权',
          success: function(res) {
            if(res.confirm) {
              wx.openSetting({
                success: function() {
                  that.getlocationInfo()
                }
              })
            }
          }
        })
      })
    })
  }
  location() {
    return new Promise(function(resolve, reject) {
      wx.getLocation({
        altitude: true,
        success: function(res) {
          console.log(res);
          resolve(res)
        },
        fail: function(fail) {
          reject(fail)
        }
      })
    })
  }
}