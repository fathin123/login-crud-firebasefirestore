import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import reducer from '../reducer';
import thunk from 'redux-thunk';

export const store = createStore(reducer, applyMiddleware(thunk))