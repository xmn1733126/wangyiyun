<template>
  <div class="musiclist">
    <div class="musictop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musiccontent">
      <van-swipe :loop="false" :width="150" class="my-swpier" :show-indicators="false">
        <van-swipe-item v-for="item in musiclist" :key="item">
          <router-link :to="{ path:'/itemmusic',query:{id:item.id}}">
            <img :src="item.picUrl" alt="" />
            <span class="playcount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon-play"></use>
              </svg>
              {{changeCount(item.playCount)}}
            </span>
            <span class="name">{{item.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusiclist } from '@/request/api/home.js'
export default {
  data() {
    return {
      musiclist: []
    }
  },
  methods: {
    async getgedan() {
      let res = await getMusiclist()
      this.musiclist = res.data.result
    },
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num / 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
  },
  mounted() {
    this.getgedan()
  }
}
</script>

<style lang="less" scoped>
.musiclist {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musictop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musiccontent {
    width: 100%;
    height: 3.6rem;
    .van-swipe-item {
      //   margin-right: 0.14rem;
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        //   position: absolute;
      }
      .playcount {
        position: absolute;
        z-index: 100;
        right: 0.3rem;
        color: white;
        margin-top: 0.06rem;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>
