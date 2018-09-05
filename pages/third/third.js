// pages/move/move.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixed_view: [{
      src: "../../images/product/2.png",
      id: 1
    }, {
      src: "../../images/product/5.png",
      id: 2
    }, {
      src: "../../images/product/3.png",
      id: 3
    }],
    fixed_view_botom: [{
      src: "../../images/product/6.png",
      id: 4
    }],
    product_arr: [{
      src: "../../images/bg/20.png",
      width: "220rpx",
      height: "110rpx",
      id: "0"
    }, {
      src: "../../images/bg/17.png",
      width: "220rpx",
      height: "110rpx",
      id: "1"
    }, {
      src: "../../images/bg/19.png",
      width: "220rpx",
      height: "110rpx",
      id: "2"
    }, {
      src: "../../images/bg/18.png",
      width: "220rpx",
      height: "110rpx",
      id: "3"
    }, {
      src: "../../images/bg/19.png",
      width: "220rpx",
      height: "110rpx",
      id: "4"
    }, {
      src: "../../images/bg/17.png",
      width: "220rpx",
      height: "110rpx",
      id: "5"
    }, {
      src: "../../images/bg/18.png",
      width: "220rpx",
      height: "110rpx",
      id: "6"
    }],
    get_first_flag: false, // 是不是第一个对象的判断
    move_box_arr: [], // 移动对象的 集合
    move_id: 0, // 移动对象初始化的 ID 用于Id的 区别
    get_rate: "", // 比例值
    move_x: "", // 过度 X 值
    move_y: "", // 过度 Y 值
    close_id: "",
    len: false,
    right_arr: ["../../images/bg/19.png", "../../images/bg/18.png", "../../images/bg/17.png"],
    next_flag: true,
    before_width:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        var get_screenWidth = res.screenWidth;
        _this.setData({
          get_rate: get_screenWidth / 750
        })
      }
    })
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
  push_img_move: function (e) {
    var get_id = e.currentTarget.id;
    var get_fixed_arr = this.data.product_arr;
    // 获取正确的摆放的数量
    var right_arr_len = this.data.right_arr;
    // 得到单位换算比例
    var get_rate = this.data.get_rate;
    // 得到关于凳子腿的数组
    var get_bottom_arr = this.data.fixed_view_botom;
    // 得到移动的数组
    var get_move_arr = this.data.move_box_arr;
    if (this.data.get_first_flag === false) {
      if (get_id == "0") {
        var get_src = get_fixed_arr[0].src;
        get_bottom_arr[0].src = get_src;
        this.setData({
          fixed_view_botom: get_bottom_arr,
          get_first_flag: true
        })
      } else {
        wx.showModal({
          title: '友情提示',
          content: '劳烦赋予我一条修长的大腿',
        })
      }
    } else {
      if (get_id != "0") {
        // 判断能不能进行下一个 选择
        if (this.data.next_flag) {
          var move_id = this.data.move_id;
          get_fixed_arr[get_id].x = 100 * get_rate;
          get_fixed_arr[get_id].y = 200 * get_rate;
          get_fixed_arr[get_id].width = 400 * get_rate + "px";
          get_fixed_arr[get_id].height = 200 * get_rate + "px";
          get_fixed_arr[get_id].id = move_id;
          if (get_move_arr.length < right_arr_len.length) {
            get_move_arr.splice(move_id, 1, get_fixed_arr[get_id]);
          } else {
            wx.showModal({
              title: '友情提示',
              content: '该组合柜的数量已经饱和，请调整寻找答案',
            })
          }
          // get_move_arr.push(get_fixed_arr[get_id])
          this.setData({
            move_box_arr: get_move_arr,
            move_id: Number(move_id) + 1,
            next_flag: false
          })
        } else {
          wx.showModal({
            title: '友情提示',
            content: '劳烦把散落的柜子放回原处',
          })
        }
      } else {
        console.log("很执着的选择大长腿");
      }
    }
  },
  change: function (e) {
    //  移动中 X Y 轴的 坐标 变化
    var move_x = e.detail.x;
    var move_y = e.detail.y;
    // 过度的 全局的 移动坐标
    this.setData({
      move_x: move_x,
      move_y: move_y
    })
  },
  end: function (e) {
    console.log(e)
    var get_id = e.currentTarget.id;
    var move_x = this.data.move_x;
    var move_y = this.data.move_y;
    var get_rate = this.data.get_rate;
    var get_move_arr = this.data.move_box_arr;
    if (move_x > 100 * get_rate && move_x < 550 * get_rate) {
      switch (get_id) {
        case "0":
          var get_width = get_move_arr[get_id].width;
          var get_width_num = get_width.substr(0, get_width.indexOf("px"));
          console.log(get_width_num)
          get_move_arr[get_id].x = 150 * get_rate;
          get_move_arr[get_id].y = 600 * get_rate;
          break;
        case "1":
          get_move_arr[get_id].x = 150 * get_rate;
          get_move_arr[get_id].y = 400 * get_rate;
          break;
        case "2":
          get_move_arr[get_id].x = 150 * get_rate;
          get_move_arr[get_id].y = 200 * get_rate;
          break;
        default:
          get_move_arr[get_id].x = move_x;
          get_move_arr[get_id].y = move_y;
          break;
      }
      this.setData({
        move_box_arr: get_move_arr,
        next_flag: true,
        close_id: get_move_arr.length - 1
        // close_id: get_id
      })
    } else {
      get_move_arr[get_id].x = move_x;
      get_move_arr[get_id].y = move_y;
      this.setData({
        move_box_arr: get_move_arr,
        next_flag: false
      })
    }
  },

  // close Icon 的 选中
  user_select: function (e) {
    var get_id = e.currentTarget.id;
    var get_rate = this.data.get_rate;
    var get_move_arr = this.data.move_box_arr;
    if (this.data.close_id != get_id) {
      wx.showModal({
        title: '友情提示',
        content: '请搬掉上面的柜子，再操作',
      })
    }
    // 设置close_id ;
    if (get_move_arr.length < 4) {
      this.setData({
        close_id: get_move_arr.length - 1,
      })
    }
  },
  close_move_select: function (e) {
    var get_id = e.currentTarget.id;
    var get_move_arr = this.data.move_box_arr;
    get_move_arr.splice(get_id, 1)
    this.setData({
      move_box_arr: get_move_arr,
      move_id: get_id,
      next_flag: true
    })
  },
  // 排列顺序的 判断
  list_order: function (arr) {
    var get_right_arr = this.data.right_arr;
    var count = 0;
    for (var i = 0; i < get_right_arr.length; i++) {
      var src = get_right_arr[i];
      if (src == arr[i].src) {
        count++
      }
    }
    return count
  },
  next: function () {
    var get_move_box_arr = this.data.move_box_arr;
    var get_order_num = this.list_order(get_move_box_arr);
    if (get_move_box_arr.length == "3") {
      console.log(this.data.next_flag)
      if (this.data.next_flag === false) {
        wx.showModal({
          title: '友情提示',
          content: '劳烦把散落的柜子放回原处',
        })
      } else {
        if (get_order_num == "3") {
          // 说明顺序正确
          wx.showModal({
            title: '友情提示',
            content: '恭喜您，找到答案',
          })
        } else {
          // 顺序错误
          wx.showModal({
            title: '友情提示',
            content: '答案错误，答案在墙上',
          })
        }
      }
    } else {
      wx.showModal({
        title: '友情提示',
        content: '游戏尚未完成，请继续',
      })
    }
  }
})