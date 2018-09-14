// @flow

/*
* Dispatcher.js Flux 全局只有一个 Dispatcher 但是可以有多个 Store
* */

// 创建全局唯一 Dispatcher

import { Dispatcher } from 'flux';

const instance: Dispatcher = new Dispatcher();

// 这样方便直接引用 dispatch
export const dispatch = instance.dispatch.bind(instance);

export default instance;

