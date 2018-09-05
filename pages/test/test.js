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
      src: "../../images/bg/15.png",
      width: "220rpx",
      height: "110rpx",
      id: "0"
    }, {
      src: "../../images/bg/16.png",
      width: "220rpx",
      height: "110rpx",
      id: "1"
    }, {
      src: "../../images/bg/17.png",
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
      src: "../../images/bg/21.png",
      width: "110rpx",
      height: "110rpx",
      id: "5"
    }, {
      src: "../../images/bg/22.png",
      width: "110rpx",
      height: "110rpx",
      id: "6"
    }, {
      src: "../../images/bg/23.png",
      width: "55rpx",
      height: "110rpx",
      id: "7"
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
    new_obj_arr: [],
    before_width: ""

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
          get_rate: get_screenWidth / 750,
          bit: 200 * (get_screenWidth / 750)
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
          if (get_fixed_arr[get_id].src == "../../images/bg/21.png" || get_fixed_arr[get_id].src == "../../images/bg/22.png") {
            get_fixed_arr[get_id].width = 200 * get_rate + "px";
            get_fixed_arr[get_id].height = 200 * get_rate + "px";
          } else if (get_fixed_arr[get_id].src == "../../images/bg/23.png") {
            get_fixed_arr[get_id].width = 200 * get_rate + "px";
            get_fixed_arr[get_id].height = 400 * get_rate + "px";
          } else {
            get_fixed_arr[get_id].width = 400 * get_rate + "px";
            get_fixed_arr[get_id].height = 200 * get_rate + "px";
          }
          get_fixed_arr[get_id].id = move_id;
          if (get_move_arr.length < 15) {
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
    var get_id = e.currentTarget.id;
    var move_x = this.data.move_x;
    var move_y = this.data.move_y;
    var get_rate = this.data.get_rate;
    var get_move_arr = this.data.move_box_arr;
    var get_width_num, get_height_num;
    if (move_x > 0 * get_rate && move_x < 620 * get_rate) {
      var get_long_num = 400 * get_rate;
      var get_samll_num = 200 * get_rate;
      switch (get_id) {
        case "0":
          get_width_num = this.GET_Width(get_move_arr[get_id].width);
          get_height_num = this.GET_Height(get_move_arr[get_id].height);
          if (Number(get_height_num) > Number(get_width_num)) {
            console.log(get_height_num - get_width_num)
            // get_move_arr[get_id].x = 50 * get_rate;
            // get_move_arr[get_id].y = 400 * get_rate;
            wx.showModal({
              title: '友情提示',
              content: '根据剪影走一波',
            })
          } else {
            console.log(get_height_num - get_width_num)
            get_move_arr[get_id].x = 50 * get_rate;
            get_move_arr[get_id].y = 600 * get_rate;
          }
          break;
        case "1":
          get_width_num = this.GET_Width(get_move_arr[get_id].width);
          get_height_num = this.GET_Width(get_move_arr[get_id].height);
          var before_width = this.GET_Width(get_move_arr[get_id - 1].width);
          if (before_width == get_long_num) { // 第一个 宽是 200 那么接下来 那个必然是宽为100
            if (get_width_num == get_samll_num) {
              if (get_height_num == get_samll_num) {
                get_move_arr[get_id].x = 450 * get_rate;
                get_move_arr[get_id].y = 600 * get_rate;
              } else if (get_height_num == get_long_num) {
                get_move_arr[get_id].x = 450 * get_rate;
                get_move_arr[get_id].y = 400 * get_rate;
              }
            } else if (get_width_num == get_long_num) { // 小格子 这是  说明 最下面已经ok了 
              get_move_arr[get_id].x = 50 * get_rate;
              get_move_arr[get_id].y = 400 * get_rate;
              this.setData({
                first_flag: true
              })
            }
          } else {
            //  之前的宽为100 的 元素
            if (get_height_num == get_samll_num) {
              get_move_arr[get_id].x = 250 * get_rate;
              get_move_arr[get_id].y = 600 * get_rate;
            } else {
              get_move_arr[get_id].x = 250 * get_rate;
              get_move_arr[get_id].y = 400 * get_rate;
            }
          }
          break;
        case "2":
          get_width_num = this.GET_Width(get_move_arr[get_id].width);
          console.log(get_width_num)
          get_height_num = this.GET_Width(get_move_arr[get_id].height);
          var before_width = this.GET_Width(get_move_arr[get_id - 1].width);
          if (before_width == get_long_num) { // 第一个 宽是 200 那么接下来 那个必然是宽为100
            if (get_width_num == get_samll_num) {
              if (get_height_num == get_samll_num) {
                get_move_arr[get_id].x = 450 * get_rate;
                get_move_arr[get_id].y = 600 * get_rate;
              } else {
                get_move_arr[get_id].x = 450 * get_rate;
                get_move_arr[get_id].y = 400 * get_rate;
              }
            } else {
              get_move_arr[get_id].x = 50 * get_rate;
              get_move_arr[get_id].y = 200 * get_rate;
            }
          } else {
            // 上一个的 宽 是 100 
            var before_height = this.GET_Width(get_move_arr[get_id - 1].height);
            if (before_height == get_long_num) { // 之前的是 竖的 说明 行成了 _l 的 样式 
              if (get_width_num == get_samll_num) {
                if (get_height_num == get_samll_num) {
                  get_move_arr[get_id].x = 50 * get_rate;
                  get_move_arr[get_id].y = 400 * get_rate;
                } else if (get_height_num == get_long_num) {
                  get_move_arr[get_id].x = 50 * get_rate;
                  get_move_arr[get_id].y = 200 * get_rate;
                }
              } else {
                get_move_arr[get_id].x = 50 * get_rate;
                get_move_arr[get_id].y = 400 * get_rate;
              }

            } else {
              //  说明已经形成 -- 最下面的一层已经铺满
              get_move_arr[get_id].x = 50 * get_rate;
              get_move_arr[get_id].y = 400 * get_rate;
            }
          }
          break;
        case "3":
          get_width_num = this.GET_Width(get_move_arr[get_id].width);
          get_height_num = this.GET_Height(get_move_arr[get_id].height);
          var before_width = this.GET_Width(get_move_arr[get_id - 1].width);
          var before_height = this.GET_Height(get_move_arr[get_id - 1].height);
          if (before_width == get_long_num) { // 如果上一层 是 200 也就是最宽 不在乎 2种情况 1.左侧都是 长条 2.最下面填满
            // 如果 左侧三列 排满 就是要排满右侧
            if (get_width_num == get_samll_num) {
              if (get_height_num == get_samll_num) {
                // 说明是 小格子 只能放在 最右下 情况一 右侧差一个 竖条的的最值
                get_move_arr[get_id].x = 450 * get_rate;
                get_move_arr[get_id].y = 600 * get_rate;
              } else { // 先就差最后一个   情况二   右上的小格子了
                get_move_arr[get_id].x = 450 * get_rate;
                get_move_arr[get_id].y = 400 * get_rate;
              }
            } else if (get_width_num == get_long_num) {
              // 显然 已经不能在满足 继续摆满长条了 所以要提示了 情况三  依旧 还是 左侧已经 ok 了  这是赢给个提醒 不让 进行 长条的 选择 这个步骤 应该放在case 2 的时间提醒
            }
          } else { // 之前的 不是长条 可能是 方格 和竖条 
            if (before_height == get_samll_num) { // 如果之前的是 方格
              if (get_width_num == get_samll_num) { // 如果是 
                if (get_height_num == get_samll_num) {  // 情况四   最下面两层已经ok   差两步+++++++++++++++++
                  get_move_arr[get_id].x = 450 * get_rate;
                  get_move_arr[get_id].y = 400 * get_rate;
                } else {  // 情况五  这个情况很特殊 需要 两步 最左 和 最右两个 
                  get_move_arr[get_id].x = 450 * get_rate;
                  get_move_arr[get_id].y = 200 * get_rate;
                }
              } else { // 情况6 二层中间差小方格 右上 差选房子  提醒 只能选小方格了 
                get_move_arr[get_id].x = 50 * get_rate;
                get_move_arr[get_id].y = 200 * get_rate;
              }
            } else { // 如果 之前是竖格
              if (get_width_num == get_samll_num) { // 如果是 
                if (get_height_num == get_samll_num) {  // 情况7   最后一条 右上的最长条 应该给用户提醒 接下来 只能 选择长条了 
                  get_move_arr[get_id].x = 50 * get_rate;
                  get_move_arr[get_id].y = 200 * get_rate;
                } else {  // 情况8   差最右上的 小格子了 这是 应该给用户提醒 接下来 只能 选择小格子了 
                  get_move_arr[get_id].x = 250 * get_rate;
                  get_move_arr[get_id].y = 200 * get_rate;
                }
              } else {
                //  情况9 差右上的小格子 
                get_move_arr[get_id].x = 50 * get_rate;
                get_move_arr[get_id].y = 200 * get_rate;
              }
            }
          }
          break;
        case "4":
          get_width_num = this.GET_Width(get_move_arr[get_id].width);
          get_height_num = this.GET_Height(get_move_arr[get_id].height);
          var before_width = this.GET_Width(get_move_arr[get_id - 1].width);
          var before_height = this.GET_Height(get_move_arr[get_id - 1].height);
          if (before_width == get_long_num) {
            //  这个只能是小格子 而已 位置 唯一 呼应情况 6 8  完成ok
            if (get_width_num == get_samll_num && get_height_num == get_samll_num) {
              get_move_arr[get_id].x = 450 * get_rate;
              get_move_arr[get_id].y = 200 * get_rate;
              this.setData({
                success_flag: true
              });
            } else {
              get_move_arr[get_id].x = 150 * get_rate;
              get_move_arr[get_id].y = 150 * get_rate;
            }
          } else {
            if (before_height == get_samll_num) { // 呼应情况四 七
              if (get_width_num == get_long_num) {
                get_move_arr[get_id].x = 50 * get_rate;
                get_move_arr[get_id].y = 200 * get_rate;
              } else {
                if (get_height_num == get_samll_num) {
                  get_move_arr[get_id].x = 450 * get_rate;
                  get_move_arr[get_id].y = 400 * get_rate;
                } else {
                  get_move_arr[get_id].x = 450 * get_rate;
                  get_move_arr[get_id].y = 200 * get_rate;
                }
              }
            } else { // 
              if (get_height_num == get_samll_num) {
                get_move_arr[get_id].x = 50 * get_rate;
                get_move_arr[get_id].y = 200 * get_rate;
              } else {
                wx.showModal({
                  title: '友情提示',
                  content: '换个柜子吧，这个已经无法布局了',
                })
              }
            }
          }
          break;
      }
      this.setData({
        move_box_arr: get_move_arr,
        next_flag: true
      })
    } else {
    }
  },
  // 得到宽度
  GET_Width: function (str) {
    var get_width = str;
    var get_width_num = get_width.substr(0, get_width.indexOf("px"));
    return get_width_num
  },
  GET_Height: function (str) {
    var get_height = str;
    var get_height_num = get_height.substr(0, get_height.indexOf("px"));
    return get_height_num
  },
  // close Icon 的 选中
  user_select: function (e) {
    var get_id = e.currentTarget.id;
    var get_rate = this.data.get_rate;
    var get_move_arr = this.data.move_box_arr;
    // if (this.data.close_id != get_id) {
    //   wx.showModal({
    //     title: '友情提示',
    //     content: '请搬掉上面的柜子，再操作',
    //   })
    // }
    // 设置close_id ;
    // if (get_move_arr.length < 4) {
    //   this.setData({
    //     close_id: get_move_arr.length - 1,
    //   })
    // }
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
    // if (get_move_box_arr.length == "3") {
    //   console.log(this.data.next_flag)
    //   if (this.data.next_flag === false) {
    //     wx.showModal({
    //       title: '友情提示',
    //       content: '劳烦把散落的柜子放回原处',
    //     })
    //   } else {
    //     if (get_order_num == "3") {
    //       // 说明顺序正确
    //       wx.showModal({
    //         title: '友情提示',
    //         content: '恭喜您，找到答案',
    //       })
    //     } else {
    //       // 顺序错误
    //       wx.showModal({
    //         title: '友情提示',
    //         content: '答案错误，答案在墙上',
    //       })
    //     }
    //   }
    // } else {
    //   wx.showModal({
    //     title: '友情提示',
    //     content: '游戏尚未完成，请继续',
    //   })
    // }
  },
  show_detail: function (e) {
    console.log(e)
  }
})