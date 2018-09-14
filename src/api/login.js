// @flow

/*
   login 的网络请求部分
*/
import {post} from './request';

export function loginUser(userData: Object) {
   return post('/login', userData).then(res => res.data);
}