// @flow

// home 页面的 action creator

import {dispatch} from '../Dispatcher';
import {CHANGE_INPUT_INFO, GET_MEMBER_LIST} from './constants';
import { obtainMemberList, postNewMember } from '../../api/home';


export function getMemberList() {
   return obtainMemberList()
      .then((res: any) => dispatch({
         type: GET_MEMBER_LIST,
         payload: res
      }))
      .catch(err => console.log(err));
}
export function changeInputInfo(newMember: Object) {
   return dispatch({
      type: CHANGE_INPUT_INFO,
      payload: newMember
   })
}
export function postNewInfo(newMember: Object) {
   return postNewMember(newMember)
      .then(() => obtainMemberList())
      .then(newDate => dispatch({
         type: GET_MEMBER_LIST,
         payload: newDate
      }))
}
