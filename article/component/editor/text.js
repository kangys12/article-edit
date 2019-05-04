// component/editor/text.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    change(event) {
      console.log(event.detail.value);
      const myEventDetail = event.detail.value // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('change', myEventDetail, { bubbles: true })
      this.setData({
        value: event.detail.value
      })
    }
  }
})
