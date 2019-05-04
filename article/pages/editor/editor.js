//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // record:[],
    // records: []
  },
  onLoad(){
    //  wx.setStorage({
    //   key: 'records',
    // })

  },
  //提交并跳转主页面
  formSubmit(e) {

    let upload=this.selectComponent('#myeditor').submit()
    console.log(upload)
    upload.forEach((item,index)=>{
      console.log(item);
      var time = new Date();
      var random = time.getTime();
      switch (item.type){
        case "2" :
          wx.cloud.init()
          // 将图片上传至云存储空间
          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: 'update_image'+random,
            // 指定要上传的文件的小程序临时文件路径
            filePath: item.value,
            // 成功回调
            success: res => {
              console.log('上传成功', res)
            },
          })
        break;
        case "3":
          wx.cloud.init()
          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: 'update_video' + random,
            // 指定要上传的文件的小程序临时文件路径
            filePath: item.value,
            // 成功回调
            success: res => {
              console.log('上传成功', res)
            },
          })
        break;
      }
    })
   
    wx.getStorage({
      key: 'records',
      success(res) {
        console.log(res.data)
        function add0(m) { return m < 10 ? '0' + m : m }
        let records = res.data || []
        var time = new Date();
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        var date = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
        records.push({
          // id: guid,
          content : e.detail.value,
          createt_time: date,
          updateDate: 22,
        })
        wx.setStorage({
          key: 'records',
          data: records,

        })
      }
    })
    wx.navigateTo({
      url: '/pages/index/index', 
    })
  },
  methods:{
    
  }
  
})