// @flow

/*
* login 页面的 action
* */
import {dispatch} from '../Dispatcher';
import {CHANGE_INPUT_DATA, INPUT_FEEDBACK} from './constants';
import {loginUser} from '../../api/login';


type InputData = {
   username?: {
      value?: string,
      pass?: boolean,
      errorMessage?: ?string
   },
   password?: {
      value?: string,
      pass?: boolean,
      errorMessage?: ?string
   }
}

type LoginData = {
   username: string,
   password: string | number
}

export function changeInputData(newInputData: InputData) {
   return dispatch({
      type: CHANGE_INPUT_DATA,
      payload: newInputData
   })
}

export function postDataToLogin(loginData: LoginData) {
   return loginUser(loginData)
      .then(res => dispatch({
         type: INPUT_FEEDBACK,
         payload: res.success
      }))
}