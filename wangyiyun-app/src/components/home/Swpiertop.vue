<template>
  <div id="swipertop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
     </van-swipe-item>
   </van-swipe>
  </div>
</template>

<script>
import {getBanner} from '@/request/api/home.js'
import {reactive,onMounted} from 'vue'
export default {
    setup() {
     const state = reactive({
      images:[
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://cdn.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]});
    onMounted(async () => {
      // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
      //   state.images = res.data.banners
      // })
      let res = await getBanner();
      state.images = res.data.banners
    })
    return { state };
  },
}
</script>

<style lang="less">
#swipertop {
.van-swipe{
  width: 100%;
  height: 3rem;
  .van-swipe-item{
    padding: 0 0 0.2rem;
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__indicator--active{
      background-color: rgb(209, 39, 146);
    }
 }
}
</style>