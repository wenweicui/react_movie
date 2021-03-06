import * as Actions from '../Action/Action';
import * as FilmScheduleActions from '../Action/FilmScheduleAction';
import * as FilmChooseSeatActions from '../Action/FilmChooseSeatAction';
import * as FilmDetailActions from '../Action/FilmDetailAction';
import * as FilmGoodsListActions from '../Action/FilmGoodsListAction';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducer from '../Reducer/Reducer';
import filmScheduleReducer from '../Reducer/FilmScheduleReducer';
import filmChooseSeatReducer from '../Reducer/FilmChooseSeatReducer';
import filmDetailReducer from '../Reducer/FilmDetailReducer';
import filmGoodsListReducer from '../Reducer/FilmGoodsListReducer';
import thunk from 'redux-thunk';

var store = createStore(
   combineReducers({filmScheduleReducer, filmChooseSeatReducer, filmDetailReducer, reducer, filmGoodsListReducer}),
   applyMiddleware(thunk)
)

export const mapStateToProps =(state)=> {
  return {
    value: state.reducer.value,
    name: state.reducer.name,
    postMessage:state.reducer.postMessage,
    cityMap:state.reducer.cityMap,//所有 城市院线
    loctionCtiy:state.reducer.loctionCtiy,//所属地选择 所属地状态
    searching:state.reducer.searching,//所属地选择页面，是否点开搜索框
    searchResult:state.reducer.searchResult,//所处地选择 搜索结果
    cityCinimas:state.reducer.cityCinimas,//本市影院数据
    filmScheduleList:state.filmScheduleReducer.filmScheduleList,//电影排期列表
    filmList:state.filmScheduleReducer.filmList,//电影简介列表
    filmGoodsList: state.filmGoodsListReducer.filmGoodsList, //电影卖品列表
    filmGoodsListCounter: state.filmGoodsListReducer.filmGoodsListCounter, //电影卖品数量统计
    filmSeatList:state.filmChooseSeatReducer.filmSeatList,//电影座位列表
    filmBuyList:state.filmChooseSeatReducer.filmBuyList,//电影选座列表
    filmDetailMsgPosition:state.filmDetailReducer.filmDetailMsgPosition,//电影详情弹窗位置，向下隐藏渲染img，向上隐藏img
  }
}
export const mapDispatchToProps=(dispatch)=> {
  return {
    addState: () => dispatch(Actions.addNum("message")),
    changeName: () => dispatch(Actions.nameChange("message")),
    loadingData:()=>dispatch(Actions.fetchPosts("https://wholesaletest.playcomb.com/gameList/getWholeSaleGameList","123123")),
    getCityMap:(url,data)=>dispatch(Actions.fetchCityMap(url,data)),//获取城市院线
    getCityLocation:(url,data)=>dispatch(Actions.fetchCityLocation(url,data)),//获取所在地
    changeCityLocation:(data)=>dispatch(Actions.changeLocation(data)),//改变所在地
    searchingStart:()=>dispatch(Actions.searchStart()),//点选所在地搜索框
    searchEnd:()=>dispatch(Actions.searchEnd()),//所在地搜索取消
    searchingWord:(data)=>dispatch(Actions.searchWord(data)),//所在地 搜索关键词
    fetchCityCinimas:(url,data)=>dispatch(Actions.fetchCityCinimas(url,data)),//获取所在城市影院
    getFilmScheduleList:(url,data)=>dispatch(FilmScheduleActions.fetchFilmScheduleList(url,data)), //获取电影排期列表
    getFilmList:(url,data)=>dispatch(FilmScheduleActions.fetchFilmList(url,data)),//获取电影简介列表
    getFilmSeatList:(url,data)=>dispatch(FilmChooseSeatActions.fetchFilmSeatList(url,data)),//获取电影座位列表
    changeFilmBuySeatList:(data)=>dispatch(FilmChooseSeatActions.changeFilmBuySeatList(data)),//选中座位购票
    changeFilmDetailMsgPosition:(data)=>dispatch(FilmDetailActions.changeFilmDetailMsgPosition(data)),//电影详情弹窗位置，向下隐藏渲染img，向上隐藏img
    getFilmGoodsList: (url, data) => dispatch(FilmGoodsListActions.fetchFilmGoodsList(url, data)), //获取卖品列表
    getFilmGoodsCount: (str, index, length) => dispatch(FilmGoodsListActions.fetchFilmGoodsCount(str, index, length))      //获取卖品增减数量
  }
}



export default store;
