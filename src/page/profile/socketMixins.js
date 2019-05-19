import io from  'socket.io-client'

export default {
    data(){
        return {
            path: "ws://127.0.0.1:3001",
            socket: null,
        }
    },
    beforeDestroy() {
        this.socket.onclose = this.close();
      },
    mounted(){
        this.init()
    },
    methods:{
     //websocket
     init() {
        if (typeof WebSocket === undefined) {
          alert("您的浏览器不支持socket!");
        } else {
          // 实例化socket
          this.socket = io(this.path);
          // 监听socket连接
          this.socket.onopen = this.open;
          // 监听socket错误信息
          this.socket.onerror = this.error;
          // 监听socket消息
          this.socket.onmessage = this.getMessage;
        }
      },
      open() {
        console.log("连接成功！");
        // this.socket.send("are you ok?");
      },
      error() {
        console.log("连接失败！");
      },
      getMessage(msg) {
        console.log(msg);
      },
      firstAuditSend(obj){
          this.socket.emit('send',obj)
      },
      send() {
        this.socket.emit('send','are you ok?')
      },
      close: function() {
        console.log("socket已经关闭");
      },
    }
}