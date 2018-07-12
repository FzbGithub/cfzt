const app = getApp();
const utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCloseApp: app.globalData.ifCloseApp,
        activeCarType: false,
        location: null,
        controlChangeMapView: false,
        locationName: {
            country: '',
            province: '',
            city: '',
            citycode: '',
            district: '',
            name: ''
        },
        mapHeight: app.globalData.getSystemInfo.windowHeight,
        controls: [{
            id: 0,
            iconPath: '/images/icon_nav_bar.png',
            position: {
                width: 36,
                height: 36,
                left: app.globalData.getSystemInfo.windowWidth - 50,
                top: app.globalData.getSystemInfo.windowHeight / 2
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
        this.initUiBaseData();

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
    // 获取当前的地理位置以及逆解析地理位置
    initUiBaseData(cb) {
        let that = this;
        app.getLocationInfo(function (locationInfo) {
            if (locationInfo) {
                that.setData({
                    location: locationInfo
                });
                utils.getLocationName(locationInfo.longitude, locationInfo.latitude, function (res) {
                    if (res) {
                        that.setData({
                            locationName: {
                                country: res[0].regeocodeData.addressComponent.country,
                                province: res[0].regeocodeData.addressComponent.province,
                                city: res[0].regeocodeData.addressComponent.city,
                                citycode: res[0].regeocodeData.addressComponent.citycode,
                                district: res[0].regeocodeData.addressComponent.district,
                                name: res[0].name
                            }
                        });
                        wx.setNavigationBarTitle({
                            title: 'Fy出行（' + res[0].regeocodeData.addressComponent.province + '-' + res[0].regeocodeData.addressComponent.city + ')',
                        });
                        typeof cb === 'function' && cb(res);
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
    // 由拖曳地图改变当前视野
    changeMapView(cb) {
        let that = this;
        this.mapCtx = wx.createMapContext('appMap', this);
        this.setData({
            locationName: {}
        });
        this.data.locationName.name = '正在获取上车位置...';
        this.mapCtx.getCenterLocation({
            success: function (res) {
                utils.getLocationName(res.longitude, res.latitude, function (res) {
                    if (res) {
                        that.setData({
                            locationName: {
                                country: res[0].regeocodeData.addressComponent.country,
                                province: res[0].regeocodeData.addressComponent.province,
                                city: res[0].regeocodeData.addressComponent.city,
                                citycode: res[0].regeocodeData.addressComponent.citycode,
                                district: res[0].regeocodeData.addressComponent.district,
                                name: res[0].name
                            }
                        });
                        wx.setNavigationBarTitle({
                            title: 'Fy出行（' + res[0].regeocodeData.addressComponent.province + '-' + res[0].regeocodeData.addressComponent.city + ')',
                        })
                        typeof cb==='function' && cb(res);
                    }
                })
            }
        });
    },
    // 点击controltap
    controlTap(e) {
        let mapCtx = wx.createMapContext('appMap', this);
        mapCtx.moveToLocation();
    },
    // 视野发生改变时
    regionChange(e) {
        this.changeMapView();
    },
    // 切换不同的车类型
    selectActiveCar() {
        this.setData({
            activeCarType: false
        })
    },
    selectActiveOtherCar() {
        this.setData({
            activeCarType: true
        })
    }
})