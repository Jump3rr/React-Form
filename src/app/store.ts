import {createStore, combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import rootReducer from 'redux';

const reducer = combineReducers({
  form: reduxFormReducer,
})

// const store = (window.devToolsExtension
//   ? window.devToolsExtension()(createStore)
//   : createStore)(reducer);

const store = (window as any).__REDUX_DEVTOOLS_EXTENSION__
              ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()(createStore)
              : createStore(reducer)

// const store = createStore(
//   rootReducer,
//   initialState,
//   (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
//     (window as any).__REDUX_DEVTOOLS_EXTENSION__()
// );

export default store;
