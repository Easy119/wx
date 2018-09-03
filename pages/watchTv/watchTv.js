// pages/move/move.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixed_view: [{
      src: "../../images/product/5.png",
      id: 1
    }, {
      src: "../../images/product/5.png",
      id: 2
    }, {
      src: "../../images/product/5.png",
      id: 3
    }],
    fixed_view_botom: [{
      src: "../../images/product/6.png",
      id: 4
    }, {
      src: "../../images/product/6.png",
      id: 5
    }],
    product_arr: [{
      src: "../../images/bg/20.png",
      width: "220rpx",
      height: "110rpx",
      id: "first"
    },
    {
      src: "../../images/bg/17.png",
      width: "220rpx",
      height: "110rpx",
      id: 0
    }, {
      src: "../../images/bg/19.png",
      width: "220rpx",
      height: "110rpx",
      id: 1
    }, {
      src: "../../images/bg/18.png",
      width: "220rpx",
      height: "110rpx",
      id: 2
    }, {
      src: "../../images/bg/19.png",
      width: "220rpx",
      height: "110rpx",
      id: 3
    }, {
      src: "../../images/bg/17.png",
      width: "220rpx",
      height: "110rpx",
      id: 4
    }, {
      src: "../../images/bg/18.png",
      width: "220rpx",
      height: "110rpx",
      id: 5
    }
    ],
    fixed_view_first: true,
    get_rate: "",
    move_arr: [],
    count_id: 0,
    next_btn: true,
    next_count: 0,
    get_img: true
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
  push_img_move: function (e) {
    var get_id = e.currentTarget.id;
    var get_rate = this.data.get_rate;
    var get_first_flag = this.data.fixed_view_first;
    var move_arr = this.data.move_arr;
    var count_id = this.data.count_id;
    var get_arr = this.data.product_arr;
    // 说明这是第一个
    if (get_first_flag) {
      if (get_id == "first") {
        var get_obj_data = get_arr[0];
        get_obj_data.id = get_id;
        get_obj_data.flag = false;
        get_obj_data.x = 150;
        get_obj_data.y = 150;
        get_obj_data.width = 305 * get_rate + "px"; // 显示 图片 的 宽度
        get_obj_data.height = 85 * get_rate + "px"; //  显示 图片 的 高度
        move_arr.push(get_obj_data);
        get_arr.splice(0, 1);
        this.setData({
          move_arr: move_arr,
          product_arr: get_arr
        });
      } else {
        wx.showModal({
          title: '友情提醒',
          content: '劳烦先选个支撑的桌腿吧',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      }
    } else {
      var get_obj_data = get_arr[get_id];
      get_obj_data.id = count_id;
      get_obj_data.flag = false;
      get_obj_data.id = count_id;
      get_obj_data.x = 150;
      get_obj_data.y = 150;
      get_obj_data.width = 216 * get_rate + "px"; // 显示 图片 的 宽度
      get_obj_data.height = 110 * get_rate + "px"; //  显示 图片 的 高度
      var show_mark = this.limit();
      if (!show_mark) {
        move_arr.push(get_obj_data);
        this.setData({
          move_arr: move_arr,
          count_id: count_id + 1
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '超过l',
        })
      }
    }
  },
  change: function (e) {
    var get_rate = this.data.get_rate;
    var get_id = e.currentTarget.id;
    var base_x = 280 * get_rate;
    var end_x = 500 * get_rate;
    var base_y = 300 * get_rate;
    var move_x = e.detail.x;
    var move_y = e.detail.y;
    this.setData({
      move_x: move_x,
      move_y: move_y
    });
    var get_move_arr = this.data.move_arr;
    var get_bottom = this.data.fixed_view_botom;
    if (get_id == "first") {
      //  判断 移动中的 X 和 Y 轴 的 坐标 
      if (move_x > 70 * get_rate && move_x < 375 * get_rate && move_y > 700 * get_rate && move_y < 785 * get_rate) {
        get_bottom[0].src = "../../images/bg/20.png";
        this.setData({
          fixed_view_botom: get_bottom
        })
      } else if (move_x > 375 * get_rate && move_x < 680 * get_rate && move_y > 700 * get_rate && move_y < 785 * get_rate) {
        get_bottom[1].src = "../../images/bg/20.png";
        this.setData({
          fixed_view_botom: get_bottom
        })
      } else {
        this.setData({
          fixed_view_botom: get_bottom
        })
      }
    }

  },
  end: function (e) {
    var get_rate = this.data.get_rate;
    var get_id = e.currentTarget.id;
    var base_x = 50 * get_rate;
    var end_x = 500 * get_rate;
    var base_y = 300 * get_rate;
    var move_x = this.data.move_x;
    var move_y = this.data.move_y;
    var get_bottom = this.data.fixed_view_botom;
    var get_move_arr = this.data.move_arr;
    // 查找一个 图片的 src  目标是  “../../images/bg/17.png”
    if (get_id == "first") {
      if (move_x > 70 * get_rate && move_x < 375 * get_rate && move_y > 700 * get_rate && move_y < 785 * get_rate) {
        get_bottom[0].src = "../../images/bg/20.png";
        get_move_arr.splice(0, 1);
        this.setData({
          fixed_view_botom: get_bottom,
          move_arr: get_move_arr,
          fixed_view_first: false
        })
      } else if (move_x > 375 * get_rate && move_x < 680 * get_rate && move_y > 700 * get_rate && move_y < 785 * get_rate) {
        get_bottom[1].src = "../../images/bg/20.png";
        get_move_arr.splice(0, 1);
        this.setData({
          fixed_view_botom: get_bottom,
          move_arr: get_move_arr,
          fixed_view_first: false
        })
      } else {
        get_bottom[0].src = "../../images/product/6.png";
        this.setData({
          fixed_view_botom: get_bottom
        })
      }
    } else {
      var obj_src = get_move_arr[get_id].src;
      var next_count = this.data.next_count;
      if (move_y > 600 * get_rate && move_y < 710 * get_rate) {
        if (obj_src !== "../../images/bg/17.png") {
          // 第一个默认 灰色格子 的坐标
          if (move_x > 50* get_rate && move_x < 266 * get_rate) {
            get_move_arr[get_id].x = 50 * get_rate;
            get_move_arr[get_id].y = 600 * get_rate;
            this.next_flag();
          } else if (move_x > 266 * get_rate && move_x < 482 * get_rate) {
            // 第二个默认 灰色格子 的坐标
            get_move_arr[get_id].x = 266 * get_rate;
            get_move_arr[get_id].y = 600 * get_rate;
            this.next_flag();
          } else if (move_y > 482 * get_rate && move_y < 700 * get_rate) {
            // 第三个默认 灰色格子 的坐标
            get_move_arr[get_id].x = 482 * get_rate;
            get_move_arr[get_id].y = 600 * get_rate;
            this.next_flag();
          }
          this.setData({
            move_arr: get_move_arr
          })
        } else {
          get_move_arr[get_id].x = 350 * get_rate;
          get_move_arr[get_id].y = 300 * get_rate;
          this.next_flag();
          this.setData({
            move_arr: get_move_arr
          });
        }
      } else {
        var result = this.limit() ? true : false;
        get_move_arr[get_id].x = move_x;
        get_move_arr[get_id].y = move_y;
        this.setData({
          move_arr: get_move_arr,
          next_btn: result
        })
      }
    }
  },
  deal_img: function (e) {
    var get_page_x = e.touches[0].pageX;
    var get_page_y = e.touches[0].pageY;
    var get_id = e.currentTarget.id;
    var get_move_arr = this.data.move_arr;
    if (get_id !== "first") {
      var get_list_number = this.felx_fun(get_page_x, get_page_y);
      this.setData({
        close_id: get_id,
        move_x: get_move_arr[get_id].x,
        move_y: get_move_arr[get_id].y,
        get_list_number: get_list_number
      });
    }
  },
  delect_img: function (e) {
    var get_arr = this.data.move_arr;
    var get_id = e.currentTarget.id;
    get_arr[get_id].flag = true;
    this.next_flag()
    this.setData({
      move_arr: get_arr,
      close_id: get_id
    });
  },
  // 判断 选择了 几个 
  limit: function () {
    var get_move_arr = this.data.move_arr;
    var flag_flase_count = 0;
    var flag_true_count = 0;
    if (get_move_arr.length === 0) {
      return false
    } else {
      for (var i = 0; i < get_move_arr.length; i++) {
        if (get_move_arr[i].flag === false) {
          flag_flase_count += 1
        }
      }
    }
    if (flag_flase_count > 2) {
      return true
    } else {
      return false
    }
  },
  next_flag: function () {
    var result = this.limit() ? false : true;
    this.setData({
      next_btn: result
    })
  },
  felx_fun: function (get_page_x, get_page_y) {
    var get_rate = this.data.get_rate;
    var base_x = 350 * get_rate;
    var end_x = 700 * get_rate;
    var base_y = 300 * get_rate;
    if (get_page_x > base_x && get_page_x < end_x) {
      // 第一个默认 灰色格子 的坐标
      if (get_page_y > base_y && get_page_y < 450 * get_rate) {
        return "1"
      } else if (get_page_y > 450 * get_rate && get_page_y < 600 * get_rate) {
        // 第二个默认 灰色格子 的坐标
        return "2"
      } else if (get_page_y > 600 * get_rate && get_page_y < 750 * get_rate) {
        // 第三个默认 灰色格子 的坐标
        //  获取 查询 这是第几个 
        return "3"
      }
    } else {
      return "none"
    }
  },
  test: function (e) {
    console.log(e)
  },
  get_img: function () {
    this.setData({
      get_img: false
    })
    var get_rate = this.data.get_rate;
    var get_arr = this.data.move_arr;
    var get_img_arr = [];
    get_img_arr.push({
      src: "../../images/bg/bg_2.jpg",
      x: 0,
      y: 0,
    }, {
        src: "../../images/bg/20.png",
        width: "220rpx",
        height: "110rpx",
        id: 0,
        x: 70 * get_rate,
        y: 710 * get_rate
      }, {
        src: "../../images/bg/20.png",
        width: "220rpx",
        height: "110rpx",
        id: 1,
        x: 375 * get_rate,
        y: 710 * get_rate
      })
    for (var i = 0; i < get_arr.length; i++) {
      if (get_arr[i].flag === false) {
        get_img_arr.push(get_arr[i])
      }
    }
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.clearRect(0, 0, 1000, 1000);
    for (var i = 0; i < get_img_arr.length; i++) {
      if (get_img_arr[i].src == "../../images/bg/bg_2.jpg") {
        console.log("ASDF")
        ctx.drawImage(get_img_arr[i].src, get_img_arr[i].x, get_img_arr[i].y, (750 * get_rate), (1206 * get_rate))
      } else if (get_img_arr[i].src == "../../images/bg/20.png"){
        ctx.drawImage(get_img_arr[i].src, get_img_arr[i].x, get_img_arr[i].y, ( 305* get_rate), (85 * get_rate))
      }else{
        ctx.drawImage(get_img_arr[i].src, get_img_arr[i].x, get_img_arr[i].y, (216 * get_rate), (110 * get_rate))
      }
    }
    ctx.draw(false, function (res) {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          // console.log(res)
          // if (res.tempFilePath) {
          //   wx.previewImage({
          //     urls: [res.tempFilePath],// 需要预览的图片http链接列表
          //     success: function (res) {
          //       console.log(res)
          //     }
          //   })
          // }
        },
        complete: function (res) {
          console.log(res)
        }
      })
    });
  },
  close_img: function () {
    console.log("close_img")
    this.setData({
      get_img: true
    })
  },
  bindgetuserinfo: function (res) {
    console.log(res)
  }
})