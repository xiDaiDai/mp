//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    date:new Date().toLocaleDateString(),
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  bindDateTap:function(event){
    let targetUrl = '';
    switch (event.target.dataset.type){
      case 'android':
        targetUrl = '../android/android';
        break;
      case 'ios':
        targetUrl = '../ios/ios';
        break;
      case 'welfare':
        targetUrl = '../welfare/welfare';
        break;
    }
    
    wx.navigateTo({
      url: targetUrl
    })
  },
  scan:function(){
    wx.scanCode({
      success:res => {
        console.log('ok');
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
