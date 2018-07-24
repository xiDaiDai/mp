// pages/android.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist: [],
    result: '',
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    error: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const url = `https://gank.io/api/data/iOS/${this.data.month}/${this.data.date}`;
    try{
      let data = await this.mRequest(url);
      console.log(data)
    }catch(e){
      console.log('catch');
      console.log(e);
    }
   
    
  },

  mRequest: function (url, params, resolve, reject){
    self = this;
  try{

    return new Promise(function (resolve, reject) {
      wx.request({
        url: url, //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          if (res.data.error) {
            self.setData({ error: res.data.error });
            reject&&reject();
          } else {
            self.setData({ 'result': res.data.results });
            // resolve && resolve({data:res.data.results});
            resolve(res.data.results)
            console.log("resolve")
          }

        }
      }) 
    })
  }catch(e){
    console.log('catch', e);
  }
  
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

  }
})