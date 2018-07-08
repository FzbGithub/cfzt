App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  getLocationInfo: function(cb) {
      let that = this;
      if (this.globalData.locationInfo) {
          typeof cb === 'function' && cb(this.globalData.locationInfo);
      } else {
          wx.getLocation({
              success: function(res) {
                  that.globalData.locationInfo= res;
                  typeof cb === 'function' && cb(that.globalData.locationInfo);
              },
              fail: function() {
                  wx.showModal({
                      title: '温馨提示',
                      content: '获取地理位置失败，请重新登陆微信',
                      showCancel: false,
                      success: function() {
                          that.globalData.ifCloseApp = true;
                          typeof cb === 'function' && cb(that.globalData.locationInfo);
                          /* wx.reLaunch({
                              url: '../../pages/index/index',
                          }) */
                      }
                  })
              }
          })
      }

  },
  globalData: {
      ifCloseApp: false,
      locationInfo: null,
      getSystemInfo: wx.getSystemInfoSync()
  }

})
