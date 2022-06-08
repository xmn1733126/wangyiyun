<template>
     <div>
        <Top></Top>
        <Swpiertop></Swpiertop>
        <Iconlist></Iconlist>
        <Musiclist></Musiclist>
     </div>
</template>

<script>
// @ is an alias to /src
// import { getMusicItemList, getItemList } from "@/request/api/item.js";
import Top from '@/components/home/Top.vue'
import Swpiertop from '@/components/home/Swpiertop.vue'
import Iconlist from '@/components/home/Iconlist.vue'
import Musiclist from '@/components/home/Musiclist.vue'
export default {
  name: "Home",
  // async mounted(){
  //     let res2= await getItemList(5221080943);
  //     console.log(res2);
  // },
  components: {
      Top,
      Swpiertop,
      Iconlist,
      Musiclist
  },
};
</script>
