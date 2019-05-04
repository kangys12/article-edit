// component/editor/video.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value:String
  },
  /**
   * 组件的初始数据
   */
  data: {
    show:false,
  }, 
  attached(){
    if (!this.data.value) {
      this.upload();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //视频上传
    upload(){
      let albums=[];
      if(this.data.value!==''){
        this.data.value=''
      }
      wx.chooseVideo({
        //调取照相机或选择视频
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: (res) =>{
          this.triggerEvent('change', res.tempFilePath)
          this.setData({
            value: res.tempFilePath,
          })
        }
      })
    },
  }
})
