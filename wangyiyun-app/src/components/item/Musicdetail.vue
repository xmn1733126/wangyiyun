<template>
  <img :src="musiclist.al.picUrl" alt="" class="img" />
  <div class="top">
    <div class="topleft">
      <svg class="icon liebiao" aria-hidden="true" @click="backhome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="nameauthor">
        <p style="color: purple">{{musiclist.al.name}}</p>
        <span v-for="item in musiclist.ar" :key="item">
          {{ item.name }}
        </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
    </div>
    <div class="topright">
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="content" v-show="!islyricshow">
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnshow}"/>
    <img src="@/assets/cd.png" alt="" class="img_cd" />
    <img :src="musiclist.al.picUrl" alt="" class="img_ar" @click="islyricshow=true" :class="{img_ar_active:isbtnshow,img_ar_paused:!isbtnshow}"/>
  </div>
  <div class="musiclyric" ref="musiclyric" v-show="islyricshow">
    <p v-for="item in lyric" :key="item" :class="{active:(currenttime*1000>=item.time && currenttime*1000<item.pre)}">
      {{item.lrc}}
    </p>
  </div>
  <div class="footer">
    <div class="footertop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazaisvg"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31xiaoxi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footercontent">
      <input type="range" class="range" min="0" :max="duration" v-model="currenttime" step="0.05">
    </div>
    <div class="footerfooter">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goplay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="isbtnshow" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goplay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default {
  data(){
    return{
     islyricshow: false,
    };
  },
  computed:{
    ...mapState(["lyriclist",'currenttime','playlistindex','playlist','duration']),
    lyric(){
      let arr;
      if(this.lyriclist.lyric){
        arr = this.lyriclist.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
            let min=item.slice(1,3);
            let sec=item.slice(4,6);
            let mill=item.slice(7,10);
            let lrc=item.slice(11,item.length)
            let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
            if(isNaN(Number(mill))){
              mill=item.slice(7,9);
              lrc=item.slice(10,item.length)
              time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill);
            }
            console.log(min,sec,Number(mill),lrc);
            return { min,sec,mill,lrc,time}
        })
        arr.forEach((item,i)=> {
          if(i===arr.length-1 || isNaN(arr[i+1].time)){
            item.pre=100000;
          }else{
            item.pre=arr[i+1].time
          }
        });
      }
      // console.log(arr);
      
      return arr
    }
  },
  mounted() {
    // console.log(this.musiclist);
    // console.log(this.lyriclist.lyric);
    this.addduration()
  },
  props: ['musiclist','isbtnshow','play','addduration'],
  methods: {
    backhome(){
      this.islyricshow=false
      this.updatedetailshow()
    },
    goplay:function(num){
      let index = this.playlistindex + num;
      if(index < 0){
        index = this.playlist.length - 1;
      }else if(index == this.playlist.length){
       index = 0;
      }
      this.updateplaylistindex(index); 
    }, 
    ...mapMutations(["updatedetailshow","updateplaylistindex"]),
  },
  watch:{
    currenttime: function(newValue){
      let p=document.querySelector("p.active");
      if(p){
        if(p.offsetTop>300){ 
        this.$refs.musiclyric.scrollTop=p.offsetTop-300
       }
      }
      if(newValue===this.duration){
        if(this.playlistindex===this.playlist.length-1){
          this.updateplaylistindex(0);
          this.play()
        }else{
          this.updateplaylistindex(this.playlistindex+1);
        }
      }
      // console.log([this.$refs.musiclyric]); 
    }
  }
}
</script>

<style lang="less" scoped>
.img {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.top {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: black;
  .topleft {
    display: flex;
    align-items: center;
    .nameauthor {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        color: #999;
      }
    }
  }
}
.content {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 1.6s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 1.6s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active{
    animation-play-state: running;
  }
  .img_ar_active{
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }
}
.musiclyric{
  width: 100%;
  height: 8.6867rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2667rem;
  overflow: scroll;
  p{
    color: rgb(239, 226, 226);
    margin-bottom: .5333rem;
  }
  .active{
    color: #fff;
    font-size: .6667rem;
  }
}
.footer {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footertop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range{
    width: 100%;
    height: 0.06rem;
  }
  .footerfooter {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>

