const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCloseApp: app.globalData.ifCloseApp,
    location: null,
    locationName: {
      country:'',
      province:'',
      city:'',
      citycode:'',
      district:''
    },
    mapHeight: app.globalData.getSystemInfo.windowHeight,
    controls: [{
      id: 0,
      iconPath: '/images/icon_nav_bar.png',
      position: {
        width: 36,
        height: 36,
        left: app.globalData.getSystemInfo.windowWidth - 50,
        top: app.globalData.getSystemInfo.windowHeight - 100
      },
      clickable: true
    }, {
      id: 1,
      iconPath: '/images/icon_location.png',
      position: {
        width: 18,
        height: 34,
        left: app.globalData.getSystemInfo.windowWidth / 2 - 9,
        top: app.globalData.getSystemInfo.windowHeight / 2 - 34
      },
      clickable: false
    }],
    markers: [],
    polyline: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.getLocationInfo(function (locationInfo) {
      if (locationInfo) {
        that.setData({
          location: locationInfo
        }); 
        utils.getLocationName(locationInfo.longitude, locationInfo.latitude,function(res) {
          if(res) {
            that.setData({
              locationName: {
                country: res[0].regeocodeData.addressComponent.country,
                province: res[0].regeocodeData.addressComponent.province,
                city: res[0].regeocodeData.addressComponent.city,
                citycode: res[0].regeocodeData.addressComponent.citycode,
                district: res[0].regeocodeData.addressComponent.district
              }
            });
            wx.setNavigationBarTitle({
              title: 'Fy出行（' + res[0].regeocodeData.addressComponent.province + '-' + res[0].regeocodeData.addressComponent.city+')',
            })
          }
        })
      } else {
        // 获取不到地理位置，退出小程序
        that.setData({
          isCloseApp: true
        });
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.ifCloseApp) {
      app.getLocationInfo(function (locationInfo) {
        if (locationInfo) {
          this.setData({
            location: locationInfo
          })
        } else {
          // 获取不到地理位置，退出小程序
          this.setData({
            isCloseApp: true
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 点击controltap
  controlTap(e) {
    this.mapCtx = wx.createMapContext('appMap', this);
    this.mapCtx.moveToLocation();
  },
  // 视野发生改变时
  regionChange(e) {
  }
})