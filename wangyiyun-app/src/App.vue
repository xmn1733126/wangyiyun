<template>
  <router-view/>
  <Foot v-show="$store.state.isFooterMusic"></Foot>
</template>
<script>
import Foot from './components/item/Foot.vue'
export default {
  components:{
     Foot
  }
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
</style>
