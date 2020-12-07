import { request } from '../api';

/* action definition */
const FETCH = 'FETCH';
const GET_INFO_LIST = 'GET_INFO_LIST';
const ADD_INFO = 'ADD_INFO';
const REMOVE_INFO = 'REMOVE_INFO';
const SAVE_ORDER = 'SAVE_ORDER';
const SAVE_SEARCH = 'SAVE_SEARCH';
const CATCH_ERROR = 'CATCH_ERROR';

/* action creator */
export const getInfoList = () => async dispatch => {
    try {
        const { data } = await request();

        dispatch({ type: GET_INFO_LIST, list: data.map(val => ({
            ...val,
            callingCodes: val.callingCodes.map(code => code.split(' ').join(', ')).join(', ')
        }))});
    } catch (err) {
        dispatch({ type: CATCH_ERROR });
    }
}

export const addInfo = info => dispatch => {
    dispatch({ type: ADD_INFO, info });
}

export const removeInfo = name => dispatch => {
    dispatch({ type: REMOVE_INFO, name });
}

export const saveOrder = (key, order) => dispatch => {
    dispatch({ type: SAVE_ORDER, key, order });
}

export const saveSearch = search => dispatch => {
    dispatch({ type: SAVE_SEARCH, search });
}

const initialState = {
    fetching: false,
    error: false,
    infoList: [],
    currentInfoList: [],
    orderList: [],
    searchList: [],
}

/* reducer */
export default function (state=initialState, action) {
    switch (action.type) {
        case FETCH:
            return {
                ...state,
                fetching: true,
            }
        case GET_INFO_LIST:
            return {
                ...state,
                fetching: false,
                infoList: action.list,
                currentInfoList: action.list,
            }
        case ADD_INFO:
            return {
                ...state,
                infoList: state.infoList.concat(action.info),
                currentInfoList: state.currentInfoList.concat(action.info),
            }
        case REMOVE_INFO:
            return {
                ...state,
                infoList: state.infoList.filter(info => info.name !== action.name),
                currentInfoList: state.currentInfoList.filter(info => info.name !== action.name),
            }
        case SAVE_ORDER:
            return {
                ...state,
                orderList: state.orderList.concat({
                    key: action.key,
                    order: action.order,
                }),
                currentInfoList: state.currentInfoList.map(value => value).sort((a, b) => action.order === 'asc'
                    ? ((action.key === 'callingCodes' ? (Number(a[action.key].split(', ')[0]) < Number(b[action.key].split(', ')[0])) : (a[action.key] < b[action.key])) ? -1 : 1)
                    : ((action.key === 'callingCodes' ? (Number(a[action.key].split(', ')[0]) < Number(b[action.key].split(', ')[0])) : (a[action.key] < b[action.key])) ? 1 : -1)
                ),
            }
        case SAVE_SEARCH:
            return {
                ...state,
                searchList: action.search === '' ? state.searchList : state.searchList.concat(action.search),
                currentInfoList: action.search === '' ? state.infoList : state.infoList.filter(info => Object.values(info).join('!!').toLowerCase().includes(action.search.toLowerCase())),
            }
        case CATCH_ERROR:
            return {
                ...state,
                fetching: false,
                error: true,
            }
        default:
            return state;
    }
}