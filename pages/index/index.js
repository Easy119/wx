//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    screen_rate: "",
    height_num: "",
    width_num: ""
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // };
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        var screen_rpx = res.windowHeight * (750 / res.windowWidth);
        var screen_rate = screen_rpx / 1206;
        var get_screenWidth = res.screenWidth;
        _this.setData({
          screen_rate: screen_rate,
          height_num: res.windowHeight,
          width_num: res.windowWidth
        })
      }
    });
    var musices = getApp().data.music;
    _this.setData({
      music: musices
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady: function () {
    const bg_music = wx.createInnerAudioContext();
    bg_music.src = "http://activity.ziinlife.com/wx/music/bg.mp3";
    bg_music.autoplay = true;
    bg_music.loop = true;
    this.click = wx.createAudioContext('click');
    // ++++++++++++++++
    // const backgroundAudioManager = wx.getBackgroundAudioManager()
    // backgroundAudioManager.title = '生活可以更懂你';
    // backgroundAudioManager.epname = 'ziinlife';
    // backgroundAudioManager.singer = '吱音';
    // backgroundAudioManager.src = "http://activity.ziinlife.com/wx/music/bg.mp3";
    // this.bg_music.play()
  },
  onShareAppMessage: function (e) {
    console.log(e)
  },
  play: function () {
    this.click.play();
    wx.navigateTo({
      url: '../playRank/playRank',
    })
  }
})
