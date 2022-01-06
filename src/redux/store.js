import {createStore} from 'redux';
import commonReducer from './reducer/Reducer';
const store = createStore(commonReducer);
export default store;
