import { createStore } from 'vuex'
import { getMusiclyric } from '@/request/api/item.js'
import {getPhoneLogin} from "@/request/api/home.js"
export default createStore({
  state: {
    playlist:[{
      al:{
        id: 35497343,
        name: "I Love Summer - Ministry of Sound",
        pic: 18185922323960790,
        picUrl: "https://p2.music.126.net/TWX4-7ocsdVf9AkkNjKOnw==/18185922323960790.jpg",
        pic_str: "18185922323960790"
      },
      id: 477742510,
      name:"Rather Be"
    }],
    playlistindex: 0,
    // 暂停按钮显示
    isbtnshow: true,
    // 歌曲详情页显示
    detailshow: false,
    // 歌词
    lyriclist:{},
    // 当前时间
    currenttime:0,
    duration:0,
    isLogin:false,//判断是否登录
    isFooterMusic:true,//判断底部组件是否需要显示
    token:"",
    user:{},//用户信息
  },
  mutations: {
    updateisbtnshow:function(state,value){
      state.isbtnshow = value
    },
    pushplaylist:function(state,value){
      state.playlist.push(value)
    },
    updateplaylist:function(state,value){
      state.playlist = value 
    },
    updateplaylistindex:function(state,value){
      state.playlistindex = value
    },
    updatedetailshow:function(state){
      state.detailshow = !state.detailshow
    },
    updatelyriclist:function(state,value){
      state.lyriclist=value
    },
    updatecurrenttime:function(state,value){
      // console.log(state.currentTime);
      state.currenttime=value
    },
    updateduration:function(state,value){
      state.duration=value
    },
    updateIsLogin:function(state,value){
      state.isLogin=true
    },
    updateToken:function(state,value){
      state.token=value
      localStorage.setItem('token',state.token)
    },
    updateUser:function(state,value){
      state.user=value
    }
  },
  actions: {
    getlyric: async function(context,value){
      let res=await getMusiclyric(value)
      console.log(res);
      context.commit("updatelyriclist",res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value);
      // console.log(res);
      return res
    }
  },
  modules: {
  }
})