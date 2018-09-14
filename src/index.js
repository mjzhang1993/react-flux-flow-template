// @flow
/*
   项目入口
   2018.03.19 更新：
      去除的 react-router-redux 模块，
      组价想要导入路由信息，同一通过 'react-router-dom' 模块的 withRouter 实现
*/

/* eslint-disable no-undef */
// const publicPath = assetsPublicPath;
// assetsPublicPath 在 /config/index.js 中配置，由 imports-loader 注入

import './api/test.js';
import './less/index.less';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Root from './router/routes';

const mountNode = document.getElementById('app');

/*
   react-redux 提供 Provider 组件，
   被 Provider 组件包裹的整个 APP 中的每个组件，都可以通过 connect 去连接 store
*/

if (mountNode !== null) {
   ReactDOM.render(
      <BrowserRouter>
         <Root />
      </BrowserRouter>,
      mountNode
   );
}
