//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    detail:{}
  },
  onLoad(options){
     console.log(options);
    let { index } = options;
    let {date}=options;
    wx.getStorage({
      key: 'records',
      success:(res)=> {
        console.log(res)
        let record = res.data[index];
        if (record.create_time == date){
          console.log(record)
          this.setData({
            detail: record
          })
        }
       
        }
    })
  }

})
