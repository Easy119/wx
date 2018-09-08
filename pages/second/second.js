// pages/move/move.js
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    fixed_view_botom: [{
      src: "",
      id: 4
    }],
    product_arr: [],
    get_first_flag: false, // 是不是第一个对象的判断
    move_box_arr: [], // 移动对象的 集合
    move_id: 0, // 移动对象初始化的 ID 用于Id的 区别
    get_rate: "", // 比例值
    move_x: "", // 过度 X 值
    move_y: "", // 过度 Y 值
    close_id: "",
    len: false,
    right_arr: ["../../images/bg/1.png", "../../images/bg/5.png", "../../images/bg/3.png", "../../images/bg/9.jpg", "../../images/bg/6.png"],
    next_flag: true,
    before_width: "",
    show_leg: true,
    more_item_flag: "",
    get_img: true,
    success_flag: true
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
          get_rate: get_screenWidth / 750,
          screen_rate: screen_rate,
          top_num: 800 * screen_rate
        })
      }
    });
    var productes = getApp().data.product_arr;
    var musices = getApp().data.music;
    this.setData({
      product_arr: productes,
      music: musices
    })
  },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
  onReady: function () {
    this.bg_music = wx.createAudioContext('bg_music');
    this.error = wx.createAudioContext('error');
    this.click = wx.createAudioContext('click');
    this.move_end = wx.createAudioContext('move_end');
    this.right = wx.createAudioContext('right');
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
    // 点击的音效
    this.click.play();
    var get_id = e.currentTarget.id;
    var get_fixed_arr = this.data.product_arr;
    // 获取正确的摆放的数量
    var right_arr_len = this.data.right_arr;
    // 得到单位换算比例
    var get_rate = this.data.get_rate;
    var screen_rate = this.data.screen_rate;
    // 得到关于凳子腿的数组
    var get_bottom_arr = this.data.fixed_view_botom;
    // 得到移动的数组
    var get_move_arr = this.data.move_box_arr;
    if (this.data.get_first_flag === false) {
      if (get_id == "0") {
        var get_src = "../../images/bg/0_3.png";
        get_bottom_arr[0].src = get_src;
        this.setData({
          fixed_view_botom: get_bottom_arr,
          get_first_flag: true,
          show_leg: false
        })
      } else if (get_id == "4") {
        wx.showModal({
          title: '友情提示',
          content: '这个桌腿不合适呀！',
        })
      } else {
        wx.showModal({
          title: '友情提示',
          content: '请加上一个对应合适的柜腿呀！',
        })
      }
    } else {
      if (get_id != "0") {
        // 2 6 7 
        // 判断能不能进行下一个 选择
        if (this.data.next_flag) {
          if (get_id == "2" || get_id == "7") {
            this.setData({
              more_item_flag: get_id
            })
          } else if (get_id == "4") {
            wx.showModal({
              title: '友情提示',
              content: '这个桌腿不合适呀！',
            })
          } else if (get_id == "0") {
            var get_src = "../../images/bg/0_3.png";
            get_bottom_arr[0].src = get_src;
            this.setData({
              fixed_view_botom: get_bottom_arr
            })
          } else if (get_id == "2_1") {
            if (get_move_arr.length > "3") {
              var move_id = this.data.move_id;
              get_fixed_arr[2].x = 100 * get_rate;
              get_fixed_arr[2].y = 200 * get_rate * screen_rate;
              get_fixed_arr[2].width = 200 * get_rate + "px";
              get_fixed_arr[2].height = 200 * get_rate * screen_rate + "px";
              get_fixed_arr[2].id = move_id;
              get_fixed_arr[2].src = "../../images/bg/2_1_1.png";
              if (get_move_arr.length < right_arr_len.length) {
                get_move_arr.splice(move_id, 1, get_fixed_arr[2]);
              } else {
                wx.showModal({
                  title: '友情提示',
                  content: '空间已满啰,请验证您的答案',
                })
              }
              this.setData({
                move_box_arr: get_move_arr,
                move_id: Number(move_id) + 1,
                next_flag: false,
                more_item_flag: true
              })
            } else {
              wx.showModal({
                title: '友情提示',
                content: '现在还不适合摆放这个柜子',
              })
            }
          } else if (get_id == "2_2" || get_id == "6") {
            if (get_move_arr.length > "3") {
              var move_id = this.data.move_id;
              get_fixed_arr[6].x = 100 * get_rate;
              get_fixed_arr[6].y = 200 * get_rate * screen_rate;
              get_fixed_arr[6].width = 200 * get_rate + "px";
              get_fixed_arr[6].height = 200 * get_rate * screen_rate + "px";
              get_fixed_arr[6].id = move_id;
              get_fixed_arr[6].src = get_id == "2_2" ? "../../images/bg/2_2_1.png" : "../../images/bg/6.png";
              if (get_move_arr.length < right_arr_len.length) {
                get_move_arr.splice(move_id, 1, get_fixed_arr[6]);
              } else {
                wx.showModal({
                  title: '友情提示',
                  content: '空间已满啰,请验证您的答案',
                })
              }
              this.setData({
                move_box_arr: get_move_arr,
                move_id: Number(move_id) + 1,
                next_flag: false,
                more_item_flag: true
              })
            } else {
              wx.showModal({
                title: '友情提示',
                content: '现在还不适合摆放这个柜子',
              })
            }
          } else if (get_id == "7_1" || get_id == "7_3") {
            if (get_move_arr.length > "2" || get_move_arr.length == "2") {
              if (get_id == "7_1") {
                var move_id = this.data.move_id;
                get_fixed_arr[9].x = 100 * get_rate;
                get_fixed_arr[9].y = 200 * get_rate * screen_rate;
                get_fixed_arr[9].width = 200 * get_rate + "px";
                get_fixed_arr[9].height = 400 * get_rate * screen_rate + "px";
                get_fixed_arr[9].id = move_id;
                console.log(get_fixed_arr[9])
                if (get_move_arr.length < right_arr_len.length) {
                  get_move_arr.splice(move_id, 1, get_fixed_arr[9]);
                } else {
                  wx.showModal({
                    title: '友情提示',
                    content: '空间已满啰,请验证您的答案',
                  })
                }
                this.setData({
                  move_box_arr: get_move_arr,
                  move_id: Number(move_id) + 1,
                  next_flag: false,
                  more_item_flag: true
                })
              } else {
                var move_id = this.data.move_id;
                get_fixed_arr[10].x = 100 * get_rate;
                get_fixed_arr[10].y = 200 * get_rate * screen_rate;
                get_fixed_arr[10].width = 200 * get_rate + "px";
                get_fixed_arr[10].height = 400 * get_rate * screen_rate + "px";
                get_fixed_arr[10].id = move_id;
                if (get_move_arr.length < right_arr_len.length) {
                  get_move_arr.splice(move_id, 1, get_fixed_arr[10]);
                } else {
                  wx.showModal({
                    title: '友情提示',
                    content: '空间已满啰,请验证您的答案',
                  })
                }
                this.setData({
                  move_box_arr: get_move_arr,
                  move_id: Number(move_id) + 1,
                  next_flag: false,
                  more_item_flag: true
                })
              }
            } else {
              wx.showModal({
                title: '友情提示',
                content: '现在已经不适合摆放这个柜子',
              })
            }
          } else if (get_id == "7_2" || get_id == "7_4") {
            if (get_move_arr.length < 2) {
              if (get_id == "7_2") {
                var move_id = this.data.move_id;
                get_fixed_arr[8].x = 100 * get_rate;
                get_fixed_arr[8].y = 200 * get_rate * screen_rate;
                get_fixed_arr[8].width = 400 * get_rate + "px";
                get_fixed_arr[8].height = 200 * get_rate * screen_rate + "px";
                get_fixed_arr[8].id = move_id;
                if (get_move_arr.length < right_arr_len.length) {
                  get_move_arr.splice(move_id, 1, get_fixed_arr[8]);
                } else {
                  wx.showModal({
                    title: '友情提示',
                    content: '空间已满啰,请验证您的答案',
                  })
                }
                this.setData({
                  move_box_arr: get_move_arr,
                  move_id: Number(move_id) + 1,
                  next_flag: false,
                  more_item_flag: true
                })
              } else {
                var move_id = this.data.move_id;
                get_fixed_arr[7].x = 100 * get_rate;
                get_fixed_arr[7].y = 200 * get_rate * screen_rate;
                get_fixed_arr[7].width = 400 * get_rate + "px";
                get_fixed_arr[7].height = 200 * get_rate * screen_rate + "px";
                get_fixed_arr[7].id = move_id;
                if (get_move_arr.length < right_arr_len.length) {
                  get_move_arr.splice(move_id, 1, get_fixed_arr[7]);
                } else {
                  wx.showModal({
                    title: '友情提示',
                    content: '空间已满啰,请验证您的答案',
                  })
                }
                this.setData({
                  move_box_arr: get_move_arr,
                  move_id: Number(move_id) + 1,
                  next_flag: false,
                  more_item_flag: true
                })
              }
            } else {
              wx.showModal({
                title: '友情提示',
                content: '现在还不适合摆放这个柜子',
              })
            }
          } else if (get_id == "3") {
            if (get_move_arr.length == "2" || get_move_arr.length == "3") {
              var move_id = this.data.move_id;
              get_fixed_arr[3].x = 100 * get_rate;
              get_fixed_arr[3].y = 200 * get_rate * screen_rate;
              get_fixed_arr[3].width = 400 * get_rate + "px";
              get_fixed_arr[3].height = 200 * get_rate * screen_rate + "px";
              get_fixed_arr[3].id = move_id;
              if (get_move_arr.length < right_arr_len.length) {
                get_move_arr.splice(move_id, 1, get_fixed_arr[3]);
              } else {
                wx.showModal({
                  title: '友情提示',
                  content: '空间已满啰,请验证您的答案',
                })
              }
              this.setData({
                move_box_arr: get_move_arr,
                move_id: Number(move_id) + 1,
                next_flag: false,
                more_item_flag: true
              })
            } else {
              wx.showModal({
                title: '友情提示',
                content: '现在还不适合摆放这个柜子',
              })
            }
          } else {
            var move_id = this.data.move_id;
            get_fixed_arr[get_id].x = 100 * get_rate;
            get_fixed_arr[get_id].y = 200 * get_rate;
            get_fixed_arr[get_id].width = 400 * get_rate + "px";
            get_fixed_arr[get_id].height = 200 * get_rate * screen_rate + "px";
            get_fixed_arr[get_id].id = move_id;
            if (get_move_arr.length < 5) {
              get_move_arr.splice(move_id, 1, get_fixed_arr[get_id]);
              // if(get_move_arr.length < 2) {
              // 	get_move_arr.splice(move_id, 1, get_fixed_arr[get_id]);
              // } else {
              // 	wx.showModal({
              // 		title: '友情提示',
              // 		content: '为了快速找到答案，请您参考墙上提示',
              // 	})
              // }
              this.setData({
                move_box_arr: get_move_arr,
                move_id: Number(move_id) + 1,
                next_flag: false,
                more_item_flag: true
              })
            } else {
              wx.showModal({
                title: '友情提示',
                content: '空间已满啰,请验证您的答案',
              })
            }
          }
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
    console.log(get_id);
    var move_x = this.data.move_x;
    var move_y = this.data.move_y;
    var get_rate = this.data.get_rate;
    var screen_rate = this.data.screen_rate;
    var get_move_arr = this.data.move_box_arr;
    var get_width_num, get_height_num;
    if (move_x > -1 * get_rate && move_x < 620 * get_rate) {
      console.log(get_move_arr[get_id].src);
      console.log(get_move_arr[get_id]);
      console.log(get_id);
      var get_obj_src = get_move_arr[get_id].src;
      switch (get_obj_src) {
        case "../../images/bg/3.png":
          get_move_arr[get_id].x = 50 * get_rate;
          get_move_arr[get_id].y = 200 * get_rate * screen_rate;
          break;
        case "../../images/bg/2_1_1.png":
          get_move_arr[get_id].x = 450 * get_rate;
          get_move_arr[get_id].y = 200 * get_rate * screen_rate;
          break;
        case "../../images/bg/2_2_1.png":
          get_move_arr[get_id].x = 450 * get_rate;
          get_move_arr[get_id].y = 200 * get_rate * screen_rate;
          break;
        case "../../images/bg/6.png":
          get_move_arr[get_id].x = 450 * get_rate;
          get_move_arr[get_id].y = 200 * get_rate * screen_rate;
          break;
        case "../../images/bg/9.jpg":
          get_move_arr[get_id].x = 450 * get_rate;
          get_move_arr[get_id].y = 400 * get_rate * screen_rate;
          break;
        case "../../images/bg/10.jpg":
          get_move_arr[get_id].x = 450 * get_rate;
          get_move_arr[get_id].y = 400 * get_rate * screen_rate;
          break;
        default:
          switch (get_id) {
            case "0":
              get_move_arr[get_id].x = 50 * get_rate;
              get_move_arr[get_id].y = 600 * get_rate * screen_rate;
              break;
            case "1":
              get_move_arr[get_id].x = 50 * get_rate;
              get_move_arr[get_id].y = 400 * get_rate * screen_rate;
              break;
            default:
              get_move_arr[get_id].x = 50 * get_rate;
              get_move_arr[get_id].y = 200 * get_rate * screen_rate;
              break;
          }
          break;
      }
      // 吸附的音效
      this.move_end.play();
      this.setData({
        move_box_arr: get_move_arr,
        next_flag: true,
        close_id: get_move_arr.length - 1
      })
      // 查看 数量 判断 是不填满 格子；
      var get_move_arr_len = this.data.move_box_arr;
      this.success_len(get_move_arr_len)
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
    // 点击的音效
    this.click.play();
    var get_id = e.currentTarget.id;
    var get_rate = this.data.get_rate;
    var get_move_arr = this.data.move_box_arr;
    if (this.data.close_id != get_id) {
      wx.showModal({
        title: '友情提示',
        content: '请搬掉上面的柜子，再操作',
      })
    }
    if (get_move_arr.length < 6) {
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
    var get_success_len = get_move_arr;
    this.success_len(get_success_len)
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
    var get_order_num;
    if (get_move_box_arr.length == "5") {
      get_order_num = this.list_order(get_move_box_arr);
      console.log(this.data.next_flag)
      if (this.data.next_flag === false) {
        wx.showModal({
          title: '友情提示',
          content: '劳烦把散落的柜子放回原处',
        })
      } else {
        var _this = this;
        if (get_order_num == "5") {
          // 说明顺序正确
          wx.showModal({
            title: '友情提示',
            content: '恭喜你！成功解开了这组答案',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                _this.get_img();
              }
            }
          })
        } else {
          // 顺序错误
          var _this = this;
          var get_error_title = _this.error_title()
          wx.showModal({
            title: '友情提示',
            content: get_error_title,
            showCancel: false,
            confirmText: "修改答案",
            success: function (res) {
              console.log(res)
            }
          })
        }
      }
    } else {
      wx.showModal({
        title: '友情提示',
        content: '游戏尚未完成，请继续',
      })
    }
  },
  get_img: function (e) {
    wx.showLoading({
      title: "柜子加速组合中",
      mask: true,
      success: function () {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    })
    this.setData({
      get_img: false
    })
    var get_rate = this.data.get_rate;
    var get_height_rate = this.data.screen_rate;
    var get_arr = this.data.move_box_arr;
    var fixed_arr = this.data.fixed_view_botom;
    var get_img_arr = [];
    get_img_arr.push({
      src: "../../images/get_img/answer_2.jpg",
      x: 0,
      y: 0,
      width: 750 * get_rate * get_height_rate + "px",
      height: 1206 * get_rate * get_height_rate + "px"
    })

    const ctx = wx.createCanvasContext('myCanvas');
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.drawImage(get_img_arr[0].src, get_img_arr[0].x, get_img_arr[0].y, (750 * get_rate), (1206 * get_rate * get_height_rate))
    var _this = this;
    ctx.draw(true, function (res) {
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: function (path) {
            var getPath = path.tempFilePath;
            wx.saveImageToPhotosAlbum({
              filePath: getPath,
              success(data) {
                console.log(data)
                if (data.errMsg == "saveImageToPhotosAlbum:ok") {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000,
                    success: function (res) {
                      _this.setData({
                        get_img: false
                      })
                    }
                  })
                }
              },
              fail(data) {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      console.log("获取权限成功，再次点击图片保存到相册")
                    } else {
                      console.log("获取权限失败")
                    }
                  }
                })
              }
            })
          },
          complete: function (res) { }
        })
      }, 1000)
    });
  },
  close_img: function () {
    this.setData({
      get_img: false
    })
  },
  success_len: function (arr) {
    var get_move_arr_len = arr;
    if (get_move_arr_len.length == 5) {
      // 完成的音效
      this.right.play();
      this.setData({
        success_flag: false
      })
    } else {
      this.setData({
        success_flag: true
      })
    }
  },
  error_title: function () {
    var err_title_arr = ["答案就在你身边", "转一圈就能找到答案", "答案，或许正贴墙而放呢", "悄悄告诉你，正解就在附近"];
    var random = Math.floor(Math.random() * 10);
    var result = (random > 7) ? err_title_arr[0] : (random > 5) ? err_title_arr[1] : (random > 3) ? err_title_arr[2] : err_title_arr[3];
    return result
  }
})