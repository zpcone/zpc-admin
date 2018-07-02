<template>
  <section>
    <div class="iphone">
      <div class="iphone-top">
        <span class="camera"></span>
        <span class="sensor"></span>
        <span class="speaker"></span>
      </div>
      <div class="top-bar"></div>
      <div class="iphone-screen" style="background: #fff;">
        <!-- 状态栏 -->
        <div style="position: fixed;width: 100%;">
          <div class="status-bar">
            <div class="status-left">
              <span class="signal"></span>中国移动
            </div>
            <!--<span class="lock"></span>-->
            <!--<span class="tatus-time">15:45</span>-->
            <div class="battery">
             90%
              <div>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <p style="font-size: 18px;font-weight: bold;margin: 20px 10px;margin-top:40px;line-height: 30px;word-break: break-all;">【{{value}}】这里是测试内容，退订回复TD</p>
      </div>
      <div class="buttons">
        <span class="on-off"></span>
        <span class="sleep"></span>
        <span class="up"></span>
        <span class="down"></span>
      </div>
      <div class="bottom-bar"></div>
      <div class="iphone-bottom">
        <span></span>
      </div>
    </div>
  </section>
</template>

<script>
  export default{
    props:{
      value:{
        type:String,
        default:''
      }
    },
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
.iphone {
  box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #999, 0 0 30px 0px rgba(0, 0, 0, 0.7);
  border: 5px solid #d9dbdc;
  background: #f8f8f8;
  padding: 15px;
  border-radius: 50px;
  // height: 877px;
  height: 877px;
  // width: 423px;
  width: 423px;
  position: relative;
  -webkit-transform: scale(0.6);
          transform: scale(0.6);
}
.iphone-top {
  padding: 5px 110px 40px;
  position: relative;
}
.iphone-top .speaker {
  display: block;
  width: 70px;
  height: 6px;
  margin: 0 auto;
  border-radius: 6px;
  background: #292728;
}
.iphone-top .camera {
  display: block;
  margin: 0 auto;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-bottom: 13px;
  background: #333;
}
.iphone-top .sensor {
  display: block;
  width: 15px;
  height: 15px;
  float: left;
  background: #333;
  margin-top: -5px;
  border-radius: 50%;
}

.top-bar, .bottom-bar {
  display: block;
  width: 423px;
  height: 15px;
  border-left: 5px solid #BBB;
  border-right: 5px solid #BBB;
  position: absolute;
  left: -5px;
}

.top-bar {
  top: 65px;
}

.bottom-bar {
  bottom: 65px;
}

.iphone-screen {
  background: #eee;
  border: 1px solid #fff;
  height: 677px;
  width: 375px;
  margin: 0 auto;
  border: 2px solid rgba(0, 0, 0, 0.9);
  border-radius: 3px;
  overflow: hidden;
}
.iphone-screen img {
  width: 100%;
}

.buttons .on-off, .buttons .up, .buttons .down, .buttons .sleep {
  display: block;
  background: #CCC;
  position: absolute;
  border-radius: 2px 0px 0px 2px;
}
.buttons .on-off {
  height: 40px;
  width: 3px;
  top: 100px;
  left: -8px;
}
.buttons .up, .buttons .down, .buttons .sleep {
  height: 60px;
  width: 5px;
  left: -10px;
}
.buttons .up {
  top: 170px;
}
.buttons .down {
  top: 250px;
}
.buttons .sleep {
  left: auto;
  right: -10px;
  top: 170px;
  border-radius: 0px 2px 2px 0px;
}

.iphone-bottom {
  padding: 10px 0 0;
}
.iphone-bottom span {
  display: block;
  margin: 0 auto;
  width: 68px;
  height: 68px;
  background: #ccc;
  border-radius: 50%;
  background: -webkit-linear-gradient(315deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
  background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
  position: relative;
}
.iphone-bottom span:after {
  content: "";
  display: block;
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: 4px;
  top: 4px;
}
/*锁屏界面*/

.status-bar{position: absolute; top:0;left: 0; width: 100%;height: 40px; z-index: 2;padding:.1rem;box-sizing: border-box; }
.status-left{ font-size:12px; letter-spacing: 1px; color: #333; display: inline-block;}
.signal {
  margin-right:44px;
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
  box-shadow:10px 0 0 0 #333,20px 0 0 0 #333,30px 0 0 0 #333,40px 0 0 0 #333;
  vertical-align: 0px;
}
.lock{position: absolute;top:10px; left:50%;transform: translateX(-50%); display: inline-block; width: 7px; height: 6px;background:#333; }
.lock:after {
    position: absolute;
    top:-5px;
    left:-5px;
    border:1px solid #333;
    border-bottom: none;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50% 50% 0 0;
}
.battery{font-size: 14px; color: #333; position: absolute;top:3px; right: 50px;}
.battery > div{ display: inline-block;padding:1px;box-sizing: border-box; width: 30px; height: 14px;border:1px solid #333; border-radius:2px; }
.battery > div span:nth-child(1){display: block; background: #333; width: 90%; height: 100%;}
.battery > div span:nth-child(2){position: absolute;top:4px;border-radius: 0 3px 3px 0; left:100%; background: #333; height: 7px; width: 4px;}



</style>
