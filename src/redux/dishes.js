import * as ActionType from './ActionType';

export  const Dishes=(state={isloading:true,
    errMsg:null,
    dishes:[]},action)=>{
    switch (action.type){
        case ActionType.ADD_DISHES:
            return {...state, isloading: false, errMsg: null, dishes: action.payload};

        case ActionType.DISHES_LOADING:
            return {...state, isloading: true, errMsg: null, dishes: []}

        case ActionType.DISHES_FAILED:
            return {...state, isloading: false, errMsg: action.payload};

        default:
            return state;
    }
};