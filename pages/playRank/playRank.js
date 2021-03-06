// pages/playRank/playRank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screen_rate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        var screen_rpx = res.windowHeight * (750 / res.windowWidth);
        var screen_rate = screen_rpx / 1206;
        var get_screenWidth = res.screenWidth;
        _this.setData({
          screen_rate: screen_rate
        })
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

  },
  select_level: function (e) {
    var get_level_id = e.currentTarget.id;
    switch (get_level_id) {
      case "0":
        console.log("很简单");
        wx.navigateTo({
          url: '../first/first',
        })
        break;
      case "1":
        console.log("略显麻烦");
        wx.navigateTo({
          url: '../second/second',
        })
        break;
      case "2":
        console.log("有点变态");
        wx.navigateTo({
          url: '../last/last',
        })
        break;
    }
  }
})