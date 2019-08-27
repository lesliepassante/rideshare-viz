import { combineReducers } from 'redux';
import driver from './driver';
import files from './files';
import status from './status';

export default combineReducers({ driver, files, status });
