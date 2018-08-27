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
    product_arr: [
      {
        src: "../../images/bg/20.png",
        width: "220rpx",
        height: "110rpx",
        id: "1"
      }, {
        src: "../../images/bg/17.png",
        width: "220rpx",
        height: "110rpx",
        id: "2"
      }, {
        src: "../../images/bg/19.png",
        width: "220rpx",
        height: "110rpx",
        id: "3"
      }, {
        src: "../../images/bg/18.png",
        width: "220rpx",
        height: "110rpx",
        id: "4"
      }, {
        src: "../../images/bg/19.png",
        width: "220rpx",
        height: "110rpx",
        id: "5"
      }, {
        src: "../../images/bg/17.png",
        width: "220rpx",
        height: "110rpx",
        id: "6"
      }, {
        src: "../../images/bg/18.png",
        width: "220rpx",
        height: "110rpx",
        id: "7"
      }],
    get_index_1: false, // 是不是第一个对象的判断
    move_box_arr: [], // 移动对象的 集合
    move_id: 0,// 移动对象初始化的 ID 用于Id的 区别
    get_rate: "", // 比例值
    move_x: "", // 过度 X 值
    move_y: "",// 过度 Y 值
    now_use_id: "", // 用户 在 滑动区域 用的是哪个id 用于 end事件中 判断 修改 X Y 属性
    user_click_state: true,
    next_btn: true, // next 隐藏
    next_btn_number: "",
    end_init: false
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
    // push 对象 的 ID ；
    var get_click_id = e.currentTarget.id;
    //  移动集合 里面对象的 Id ；
    var get_move_id = this.data.move_id;
    var get_index_1 = this.data.get_index_1;
    var get_rate = this.data.get_rate;
    // var get_index = Number(e.currentTarget.id) - 1;
    var get_arr = this.data.product_arr;
    var get_push_box = this.data.move_box_arr;
    if (!get_index_1 && get_click_id == 1) {
      var get_index = Number(e.currentTarget.id) - 1;
      var obj_id = get_move_id + 1;
      get_arr[get_index].id = obj_id;
      get_arr[get_index].x = 150; // 初始化 坐标 X轴
      get_arr[get_index].y = 150; // 初始化 坐标 Y轴
      get_arr[get_index].width = 350 * get_rate + "px"; // 显示 图片 的 宽度
      get_arr[get_index].height = 150 * get_rate + "px"; //  显示 图片 的 高度
      if (get_push_box < 1) {
        get_push_box.push(get_arr[get_index]);
      }
      this.setData({
        move_box_arr: get_push_box,
        move_id: obj_id
      })
    } else {
      var get_index = Number(e.currentTarget.id) - 2;
      // 桌子 腿 已经 搞好了 现在 开始搞 桌子面了
      if (this.data.user_click_state) {
        if (get_index_1) {
          var obj_id = get_move_id + 1;
          get_arr[get_index].id = obj_id;
          get_arr[get_index].x = 150; // 初始化 坐标 X轴
          get_arr[get_index].y = 150; // 初始化 坐标 Y轴
          get_arr[get_index].width = 350 * get_rate + "px"; // 显示 图片 的 宽度
          get_arr[get_index].height = 150 * get_rate + "px"; //  显示 图片 的 高度
          get_arr[get_index].close_flag = false;
          get_arr[get_index].move_flag = false;
          if (this.data.end_init == false) {
            if (get_push_box.length < 3) {
              get_push_box.push(get_arr[get_index]);
            }
          } else {
            if (this.data.next_btn_number > 2) {
              this.setData({
                user_click_state: false
              })
            }
            get_push_box.push(get_arr[get_index]);
          }
          this.setData({
            move_box_arr: get_push_box,
            move_id: obj_id,
          })
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
        wx.showModal({
          title: '友情提醒',
          content: '组合柜归属完毕，劳烦请剔除一个',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        });
      }
    }
  },
  change: function (e) {
    // 获取 凳子腿的 背景 数据
    var get_bottom = this.data.fixed_view_botom;
    var get_rate = this.data.get_rate; // 获取产品的 比例值
    var get_move_id = e.target.id;
    // 获取 移动集合
    var get_move_arr = this.data.move_box_arr;
    //  定义 移动中的 元素对象的ID 是哪个
    this.setData({
      now_use_id: get_move_id
    })
    //  移动中 X Y 轴的 坐标 变化
    var move_x = e.detail.x;
    var move_y = e.detail.y;
    // 过度的 全局的 移动坐标
    this.setData({
      move_x: move_x,
      move_y: move_y
    })
    var base_x = 280 * get_rate;
    var end_x = 500 * get_rate;
    var base_y = 300 * get_rate;
    var obj_src = "../../images/bg/20.png";
    // 判断的 X 为 350 Y值为 730 
    //  先判断 是不是凳的 架子部分 
    if (get_move_id == 1 && !this.data.get_index_1) {
      //  判断 移动中的 X 和 Y 轴 的 坐标 
      if (move_x > base_x && move_x < end_x && move_y > 700 * get_rate && move_y < 800 * get_rate) {
        get_bottom[0].src = obj_src;
        this.setData({
          fixed_view_botom: get_bottom
        })
      } else {
        get_bottom[0].src = "../../images/product/6.png";
        this.setData({
          fixed_view_botom: get_bottom
        })
      }
    } else {
      //  这是 已经安装好桌子腿 后的页面加载
      //   接下来 根据 坐标 开始 判断 
      // 给一个标识  显示第一个 事件触发
      this.setData({
        end_init: true
      })
      if (move_x !== base_x) {
        this.setData({
          next_btn: true
        })
      }
      // ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    }
  },
  end: function (e) {
    //  获取移动事件中的 移动ID
    var get_now_use_id = this.data.now_use_id;
    // 获取 凳子腿的 背景 数据
    var get_bottom = this.data.fixed_view_botom;
    // 获取 移动中的 数据 
    var get_move_arr = this.data.move_box_arr;
    // 获取 底部滑动区域的 shuju
    var get_slider_arr = this.data.product_arr;
    var get_rate = this.data.get_rate; // 获取产品的 比例值
    var get_move_id = e.currentTarget.id;
    var move_x = this.data.move_x;
    var move_y = this.data.move_y;
    var base_x = 280 * get_rate;
    var end_x = 500 * get_rate;
    var base_y = 300 * get_rate;
    var obj_src = "../../images/bg/20.png";
    // 判断的 X 为 350 Y值为 730 
    //  先判断 是不是凳的 架子部分 
    if (get_move_id == 1 && !this.data.get_index_1) {
      //  判断 移动中的 X 和 Y 轴 的 坐标 
      if (move_x > base_x && move_x < end_x && move_y > 700 * get_rate && move_y < 800 * get_rate) {
        get_bottom[0].src = obj_src;
        get_move_arr.splice(0, 1);
        get_slider_arr.splice(0, 1);
        this.setData({
          fixed_view_botom: get_bottom,
          move_box_arr: get_move_arr,
          product_arr: get_slider_arr,
          get_index_1: true
        });
      } else {
        get_bottom[0].src = "../../images/product/6.png";
        this.setData({
          fixed_view_botom: get_bottom
        })
      }
    } else {
      //  获取 移动这个对象的 目标的src
      var now_use_id = this.data.now_use_id;
      console.log(now_use_id)
      //   接下来 根据 坐标 开始 判断 
      if (move_x > base_x && move_x < end_x) {
        // 第一个默认 灰色格子 的坐标
        if (move_y > base_y && move_y < 400 * get_rate) {
          var get_now_move_id = Number(now_use_id) - 2;
          get_move_arr[get_now_move_id].x = 350 * get_rate;
          get_move_arr[get_now_move_id].y = 300 * get_rate;
        } else if (move_y > 400 * get_rate && move_y < 550 * get_rate) {
          // 第二个默认 灰色格子 的坐标
          var get_now_move_id = Number(now_use_id) - 2;
          get_move_arr[get_now_move_id].x = 350 * get_rate;
          get_move_arr[get_now_move_id].y = 450 * get_rate;
        } else if (move_y > 550 * get_rate && move_y < 650 * get_rate) {
          // 第三个默认 灰色格子 的坐标
          //  获取 查询 这是第几个 
          var get_now_move_id = Number(now_use_id) - 2;
          get_move_arr[get_now_move_id].x = 350 * get_rate;
          get_move_arr[get_now_move_id].y = 600 * get_rate;
        }
        this.setData({
          move_box_arr: get_move_arr
        })
      } else {
        for (var i = 0; i < get_move_arr.length; i++) {
          if (get_move_arr[i].id == get_now_use_id) {
            //  说明 在 循环里面找到了 移动的元素
            get_move_arr[i].x = move_x;
            get_move_arr[i].y = move_y;
          }
        }
      }
      this.setData({
        move_box_arr: get_move_arr
      });
      // 如果 已经是 4个 图片 ok了
      //  根据 所有的 盒子数量  减去 隐藏的数量
      var get_move_arr_len = this.data.move_box_arr.length;
      var get_moves = this.data.move_box_arr;
      var count = 0;
      for (var i = 0; i < get_move_arr_len; i++) {
        if (get_moves[i].move_flag) {
          count++
        }
      }
      this.setData({
        next_btn_number: get_move_arr_len - count
      })
      if (this.data.next_btn_number > 2) {
        this.setData({
          user_click_state: false
        })
      }
    }
  },
  // 筛选 判断 
  user_get_success: function () {
    // 如果 已经是 4个 图片 ok了 

  },
  // close Icon 的 选中
  user_select: function (e) {
    // 获取 选中的 ID 
    var get_now_id = e.currentTarget.id;
    var get_move_arr = this.data.move_box_arr;
    var select_id = Number(get_now_id) - 2;
    //  显示 选中 移动 的 close 按钮
    for (var i = 0; i < get_move_arr.length; i++) {
      if (i === select_id) {
        get_move_arr[i].close_flag = false;
      } else {
        get_move_arr[i].close_flag = true;
      }
    }
    this.setData({
      move_box_arr: get_move_arr
    })
  },
  close_move_select: function (e) {
    var get_now_id = e.currentTarget.id;
    var get_move_arr = this.data.move_box_arr;
    var select_id = Number(get_now_id) - 2;
    get_move_arr[select_id].move_flag = true
    //  显示 选中 移动 的 close 按钮
    // get_move_arr.splice(select_id,1)
    // get_move_arr[select_id].flag = true;
    this.setData({
      move_box_arr: get_move_arr,
      user_click_state: true
    })
  },
  next: function () {
    wx.navigateTo({
      url: '../lastMove/lastMove',
    })
  },
  next_hidden: function (str) {
    if (this.data.next_btn_number > 2) {
      this.setData({
        next_btn: str
      })
    } else {
      this.setData({
        next_btn: true
      })
    }
  }

})