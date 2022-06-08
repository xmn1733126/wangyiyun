<template>
  <div class="itemmusiclist">
    <div class="itemlisttop">
      <div class="listleft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放列表<span>共{{itemlist.length}}首</span></span>
      </div>
      <div class="listright">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏{{subscribedCount}}</span>
      </div>
    </div>

    <div class="itemlist">
      <div class="item" v-for="(item,i) in itemlist" :key="i">
        <div class="itemleft" @click="playmusic(i)">
          <span class="leftspan">{{i + 1}}</span>
          <div>
            <p>{{item.name}}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{item1.name}}</span>
          </div>
        </div>
        <div class="itemright">
          <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
            <use xlink:href="#icon-shipin"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-liebiao2"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  setup(props) {
    console.log(props)
  },
  props: ['itemlist', 'subscribedCount'],
  methods: {
    playmusic(i){
      this.updateplaylist(this.itemlist)
      this.updateplaylistindex(i) 
    },
     ...mapMutations(['updateplaylist','updateplaylistindex'])
  }
};
</script>

<style lang="less" scoped>
.itemmusiclist {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  .itemlisttop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listleft {
      width: 3rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        stroke: #333333;
        stroke-width: 20;
      }
      span {
        font-weight: 700;
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .listright {
      display: flex;
      align-items: center;
      background-color: rgb(232, 133, 133);
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: greenyellow;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #fff;
        margin-right: 0.1rem;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }

  .itemlist {
    width: 100%;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemleft {
        width: 85%;
        height: 100%;
        display: flex;
        align-content: center;
        .leftspan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemright {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        .icon {
          fill: blueviolet;
        }
          .bofang {
          position: absolute;
          left: 0;
          }
          .liebiao {
          position: absolute;
          right: 0;
          }
      }
    }
  }
}
</style>