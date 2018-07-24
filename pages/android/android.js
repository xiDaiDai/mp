// pages/android.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist: [],
    result: '',
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    error: false,
    pageIndex:0,
    pageSize:10,
    loadingMore:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    const url = `https://gank.io/api/data/Android/${this.data.pageSize}/${this.data.pageIndex}`;
    console.log(url);
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if (res.data.error) {
          this.setData({ error: res.data.error });
        } else {
          this.setData({ 'result': res.data.results });

        }
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        
       

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
    console.log("pulldownrefresh");
    this.onLoad();
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ loadingMore:true});
    this.setData({pageIndex:++this.data.pageIndex})
    console.log("onReachBottom");
    const url = `https://gank.io/api/data/Android/${this.data.pageSize}/${this.data.pageIndex}`;
    console.log(url);
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        this.setData({ loadingMore: false });
        if (res.data.error) {
          this.setData({ error: res.data.error });
        } else {
          let result = this.data.result.concat(res.data.results)
          this.setData({ 'result': result });

        }
      }
    })
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})