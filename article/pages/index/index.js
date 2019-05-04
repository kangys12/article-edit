// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[]
  },
  onLoad:function (options) {
    console.log(options)
    // this.setData({
    //   arr: app.records
    // }) 
    wx.getStorage({
      key: 'records',
      success:(res)=>{
        console.log(res)
        
        this.setData({
            arr: res.data
          })
      
       
        // let records = res.data || []
        }

      })
    console.log(this.data.arr);
    
    // let tmp = app.globalData.put_data;//解析得到集合
    // // this.data.list=put_data
    //   console.log(tmp[0]);
    // var tmpArr = this.data.arr;
    // tmpArr.push(6);
    // wx.setStorage({
    //   key: 'record',
    //   data: tmpArr,
    //   success:(res)=>{
    //     console.log(114)
    //     this.setData({
    //       arr: tmpArr
    //     })
    //   }
    // })
    // console.log(this.data.arr)
    
    /*
    this.setData({
      arr: tmpArr
    })  
    
    console.log(this.data.arr);
    */
  },
  //跳转编辑页面
  detail(e){
    console.log(e)
    let { date } = e.target.dataset;
    let { index } = e.target.dataset;

    console.log(date);

    wx.navigateTo({
      url: '../detail/detail?detail='+ date+'&'+'index='+index ,
    })
  }
  
})