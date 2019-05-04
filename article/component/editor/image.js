// component/editor/image.js
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
  data: {},
  attached() {
    if (!this.data.value) {
      this.change();
    }
  },
  methods: {
    change() {
      wx.cloud.init();
      wx.chooseImage({
        success: chooseResult => {
          // 将图片上传至云存储空间
          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: 'my-photo.png',
            // 指定要上传的文件的小程序临时文件路径
            filePath: chooseResult.tempFilePaths[0],
            // 成功回调
            success: res => {
              this.triggerEvent('change', res.fileID)
              this.setData({
                src: res.fileID,
              })
            },
          })
        },
      })
    },
  }
})
