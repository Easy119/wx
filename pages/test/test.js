// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [{
      src: "../../images/product/1.png",
      id: 0
    },
    {
      src: "../../images/product/2.png",
      id: 1
    },
    {
      src: "../../images/product/3.png",
      id: 2
    },
    {
      src: "../../images/product/4.png",
      id: 3
    },
    {
      src: "../../images/product/5.png",
      id: 4
    }
    ],
    move_arr: [],
    count_id: 0,
    // close_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 选择照片
  select_img: function (e) {
    var count_id = this.data.count_id;
    var get_arr = this.data.listData;
    var get_id = e.currentTarget.id;
    var get_obj_data = get_arr[get_id];
    get_obj_data.id = count_id;
    get_obj_data.flag = false
    var move_arr = this.data.move_arr;
    var show_mark = this.limit();
    console.log(show_mark)
    if (!show_mark) {
      move_arr.push(get_obj_data);
      this.setData({
        move_arr: move_arr,
        count_id: count_id + 1
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '超过l',
      })
    }
  },
  deal_img: function (e) {
    var get_id = e.currentTarget.id;
    this.setData({
      close_id: get_id
    });
  },
  delect_img: function (e) {
    var get_arr = this.data.move_arr;
    var get_id = e.currentTarget.id;
    get_arr[get_id].flag = true;
    this.setData({
      move_arr: get_arr,
      close_id: get_id
    });
    // this.limit()
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
  }

})