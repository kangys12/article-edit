// component/editor/title.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
  },
  //组件销毁时缓存
  detached(){
    return wx.setStorage({
      key: 'title_cache',
      data: this.data.value,
      success: function (res) {
        console.log('异步保存成功')
      }
    })

  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
   change(event){
      const myEventDetail = event.detail.value // detail对象，提供给事件监听函数
      this.triggerEvent('change', myEventDetail)
    },
  }
})
