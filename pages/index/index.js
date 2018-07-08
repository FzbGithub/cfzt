const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCloseApp: app.globalData.ifCloseApp,
        location: null
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})