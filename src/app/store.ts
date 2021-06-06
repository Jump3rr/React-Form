import {createStore, combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';

const reducer = combineReducers({
  form: reduxFormReducer,
})

const store = (window as any).__REDUX_DEVTOOLS_EXTENSION__
              ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()(createStore)
              : createStore(reducer);

export default store;
