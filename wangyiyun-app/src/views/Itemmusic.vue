<template>
  <div>
    <Itemmusictop :playlist="state.playlist"></Itemmusictop>
    <Itemmusiclist :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount"></Itemmusiclist>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicItemList,getItemList } from '@/request/api/item.js'
import Itemmusictop from '@/components/item/Itemmusictop.vue'
import Itemmusiclist from '@/components/item/Itemmusiclist.vue'
export default {
  setup() {
    const state = reactive({
      // 歌单详情页数据
      playlist: {},
      // 歌单的歌曲
      itemlist:[]
    });
    onMounted(async () => {
      let id = useRoute().query.id
      console.log(id);
      // 获取歌单详情
      let res = await getMusicItemList(id);
      console.log(res);
      state.playlist = res.data.playlist;
      //  获取歌单歌曲
     let result = await getItemList(id);
     console.log(result);
     state.itemlist = result.data.songs;
      sessionStorage.setItem('itemDetail',JSON.stringify(state))
    });
    return{ state }
  },
  components: {
    Itemmusictop,
    Itemmusiclist
  }
};
</script>

<style>
</style>