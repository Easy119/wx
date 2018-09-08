//app.js
App({
  data: {
    product_arr: [{
      src: "../../images/bg/0.png",
      width: "180rpx",
      height: "110rpx",
      id: "0"
    }, {
      src: "../../images/bg/1.png",
      width: "180rpx",
      height: "90rpx",
      id: "1"
    }, {
      src: "../../images/bg/2.png",
      width: "90rpx",
      height: "90rpx",
      id: "2"
    }, {
      src: "../../images/bg/3.png",
      width: "180rpx",
      height: "90rpx",
      id: "3"
    }, {
      src: "../../images/bg/4.png",
      width: "180rpx",
      height: "90rpx",
      id: "4"
    }, {
      src: "../../images/bg/5.png",
      width: "180rpx",
      height: "90rpx",
      id: "5"
    }, {
      src: "../../images/bg/6.png",
      width: "90rpx",
      height: "90rpx",
      id: "6"
    }, {
      src: "../../images/bg/7.jpg",
      id: "7",
      width: "180rpx",
      height: "90rpx",
    }, {
      src: "../../images/bg/8.jpg",
      id: "8",
      width: "180rpx",
      height: "90rpx",
    }, {
      src: "../../images/bg/9.jpg",
      id: "9",
      width: "90rpx",
      height: "180rpx",
    }, {
      src: "../../images/bg/10.jpg",
      width: "90rpx",
      height: "180rpx",
      id: "10"
    }],
    music: ["http://activity.ziinlife.com/wx/music/bg.mp3", "http://activity.ziinlife.com/wx/music/click.mp3", "http://activity.ziinlife.com/wx/music/right.mp3","http://activity.ziinlife.com/wx/music/end_move.mp3"]
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})