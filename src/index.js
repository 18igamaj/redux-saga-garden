import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import {takeLatest, put} from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga'
import axios from 'axios'
import App from './App';

// this startingPlantArray should eventually be removed
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   { id: 2, name: 'Tulip' },
//   { id: 3, name: 'Oak' }
// ];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return action.payload 
    default:
      return state;
  }
};

function* watcherSaga() {
  yield takeLatest('FETCH_PLANTS', fetchSaga)
  yield takeLatest('POST_PLANT', postSaga)
  yield takeLatest('REMOVE_PLANT', removeSaga)
}

function* postSaga(action) {
  try {
    console.log('Is our action Post showing up?', action)

    yield axios.post('/api/plant', action.payload)

    yield put({
      type: 'FETCH_PLANTS'
    })
  } catch(error){
    console.log('Oh no our Post Saga', error)
  }
}

function* fetchSaga(){

  try {
    const plants = yield axios.get('/api/plant')
    yield put({
      type: 'ADD_PLANT',
      payload: plants.data
    })
  } catch(err){

  }
}

function* removeSaga(action){
try{
  yield axios.delete(`/api/plant/${action.payload}`)
  yield put({
    type:'FETCH_PLANTS'
  })
} catch(error) {
  console.log('Error with DELETE', error)
}

}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware(sagaMiddleware, logger)
);




sagaMiddleware.run(watcherSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);