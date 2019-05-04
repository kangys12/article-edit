// component/editor/index.js
const SECOND=1000;
Component({
  /**
   * 组件的属性列表
   */
  behaviors: ['wx://form-field'],

  attached() {
    this.setData({
      val: 'custom-value'
    })
  },

  properties: {
    value: Array,
  },
  /**
   * 组件的初始数据
   */
  data: {
    list: ['标题', '内容', '图片', '视频'],
    array: ['播放', '替换视频', '替换图片']
  },
  created() {
    this.video=false;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //添加编辑框
    append(e) {
      let { type } = e.currentTarget.dataset;
      this.data.value.push({ type, value: "" })
      this.setData({
        value: this.data.value
      })
    },
    add_video(e) {
      wx.chooseVideo({
        //调取照相机或选择视频
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: (res) => {
          //console.log(res);
          this.data.value.push({ type: '3', value: res.tempFilePath })
          console.log(this.data.value);
          this.setData({
            value: this.data.value,
          })
        }
      })
    },
    add_image(index) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:(res)=>{
          // tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths[0];
          this.data.value.push({ type: '2', value: tempFilePaths })
              this.setData({
                value: this.data.value,
              })
        }
      })
    },
    change_image(index){
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths[0];
          this.data.value[index].type = '2'
          // this.data.value.push({ type: '2', value: tempFilePaths })
          this.data.value[index].value = tempFilePaths;

          this.setData({
            value: this.data.value,
          })
        }})
    },
    //替换视频
    change_video(index) {
      wx.chooseVideo({
        //调取照相机或选择视频
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: (res) => {
          // console.log(res);
          this.data.value[index].value = res.tempFilePath;
          // console.log(this.data.value)
          this.setData({
            value: this.data.value
          })
        }
      })
    },
    
    //点击替换
    choose_btn(e) {
      // console.log('picker发送选择改变，携带值为', e);
      let { index } = e.currentTarget.dataset;
      if (e.detail.value == '0') {
        this.videoContext = wx.createVideoContext('Video');
        this.videoContext.play();
      } else if (e.detail.value == '1'){
        this.change_video(index);
      } else if (e.detail.value == '2'){
       
        this.change_image(index);
        this.setData({
          value: this.data.value,
        })
      }
    },
    //删除
    delete(e) {
      let {index} = e.currentTarget.dataset;
      let value = this.data.value;
      value.splice(index, 1)
      this.setData({
        value: value
      })
    },
    //上移
    up(event) {
      let {index} = event.currentTarget.dataset;
      let value = this.data.value;
      if(index==0){return false;}
      //原生js交换
          /*let temp = value[index]
          value[index] = value[index-1]
          value[index - 1]=temp*/
      //ES6语法    
      [value[index - 1], value[index]] = [value[index], value[index - 1]];
      this.setData({
        value:value,
      })
    },
    //下移
    down(event) {
      let {index} = event.currentTarget.dataset
      let value = this.data.value;
      if ((index+1) == value.length) { return false;}
      [value[index], value[index + 1]] = [value[index + 1], value[index]];
      let value_item = value[index];
      this.setData({
        value: value,
      })
    },
    //封装缓存数据函数
    cache() {
      wx.setStorage({
        key: 'editor_cache',
        data: this.data.value,
        success: function (res) {
          console.log('成功进行缓存')
        }
      })
    },
    cache_stop() {
      clearTimeout(this.timer);
      //7秒后计时器进行缓存
      this.timer = setTimeout(() => {
        this.cache();
        console.log('停止输入7秒进行保存')
      }, 7 * SECOND)
    },
    //缓存数据方法
    change(e) {
      let { index } = e.currentTarget.dataset;
      let current = this.data.value[index];
      current.value = e.detail;
      this.setData({
        value: this.data.value
      })
      //间隔性10S进行数据缓存
      if (!this.status) {
        this.status = setInterval(() => {
          this.cache();
          console.log('每10秒保存一次');
          clearInterval(this.status);
          this.status = false;
        }, 10 * SECOND)
      }
      this.cache_stop();
    },
    
    submit(){
      return  this.data.value;
    }
   
   
  }
})



// value: [
//   {type: 3, value:'yyyyyyy'},
//   { type: 3, value: 'yyyyyyy' },
// ]