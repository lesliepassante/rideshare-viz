import { combineReducers } from 'redux';
import config from './config';
import driver from './driver';
import files from './files';
import status from './status';

export default combineReducers({ config, driver, files, status });
