<template>
  <div class="foot">
    <div class="footleft" @click="updatedetailshow">
      <img :src="playlist[playlistindex].al.picUrl" alt="" />
      <div>
        <p>{{ playlist[playlistindex].name }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="footright">
      <svg class="icon liebiao" aria-hidden="true" v-if="isbtnshow">
        <use xlink:href="#icon-bofang1" @click="play"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true" v-else>
        <use xlink:href="#icon-zanting1" @click="play"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" 
    :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistindex].id}.mp3 `"></audio>
    <van-popup v-model:show="detailshow" position="right" :style="{ height: '100%',width: '100%'}">
    <Musicdetail :musiclist="playlist[playlistindex]" :play="play" :isbtnshow="isbtnshow" :addduration="addduration"></Musicdetail>
    </van-popup>
  </div>
</template>
<script>
import { mapState, mapMutations} from "vuex";
import Musicdetail from "../item/Musicdetail.vue"
export default {
  data() {
    return {
      interVal:0
    }
  },
  computed: {
    ...mapState(["playlist", "playlistindex","isbtnshow",'detailshow']),
  },
  mounted() {
    console.log(this.$refs);
     this.$store.dispatch("getlyric",this.playlist[this.playlistindex].id);
  },
  updated(){
    this.$store.dispatch("getlyric",this.playlist[this.playlistindex].id);
    this.addduration()
  },
  methods: {
    play(){
      // 判断音乐是否播放
      if(this.$refs.audio.paused){
        this.$refs.audio.play();
        this.updateisbtnshow(false)
        this.updateTime()
        // 播放就调用函数进行传值
      }else{
        this.$refs.audio.pause();
        this.updateisbtnshow(true);
        clearInterval(this.interVal);
        // 暂停清除定时器
      }
    },
    addduration:function(){
      this.updateduration(this.$refs.audio.duration)
    },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updatecurrenttime(this.$refs.audio.currenttime);
      }, 1000);
    },
    ...mapMutations(['updateisbtnshow','updatedetailshow',"updatecurrenttime","updateduration"])
  },
  watch:{
    playlistindex: function(){
      // 监听如果下标发生改变那就自动播放音乐
      this.$refs.audio.autoplay = true;
      if(this.$refs.audio.paused){
        // 本来是暂停状态,改变图标
        this.updateisbtnshow(false)
      }
    },
    playlist: function(){
      if(this.isbtnshow){
        this.$refs.audio.autoplay = true;
        this.updateisbtnshow(false)
      }
    }
  },
  components:{
    Musicdetail
  }
}
</script>
<style lang="less" scoped>
.foot {
  width: 100%;
  height: 1.4rem;
  background-color: #79879879;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footleft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div{
      p{
        font-weight: 700;
      }
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
}
</style>