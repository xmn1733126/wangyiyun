import service from '../index';
// 获取歌单详情页的数据
export function getMusicItemList(data){
  return service({
    method:'GET',
    url: `/playlist/detail?id=${data}`
  })
}
// 获取歌单的所有歌曲
export function getItemList(data){
  return service({
    method:'GET',
    url: `/playlist/track/all?id=${data}&limit=10&offset=1`
  })
}
// 获取歌曲的歌词/lyric?id=33894312
export function getMusiclyric(data){
  return service({
    method:'GET',
    url: `/lyric?id=${data}`
  })
}