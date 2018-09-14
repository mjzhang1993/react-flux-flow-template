// @flow

/*
* Login 页面 使用 antd Form
* */

import * as React from 'react';
import {Container} from 'flux/utils'
import LoginCom from '../components/Login/index';
import {changeInputData, postDataToLogin} from '../store/login/actions';
import loginStore from '../store/login/store';

type State = {
  loginState: Map<string, any>
}

class Login extends React.Component<any, State> {

  static getStores() {
    return [loginStore]
  }
  static calculateState(prevState: State): State {
    return {
      loginState: loginStore.getState()
    }
  }

  render(): React.Element<any> {
    return (
      <LoginCom
        loginState={this.state.loginState}
        changeInputData={changeInputData}
        postDataToLogin={postDataToLogin}
      />
    )
  }
}

export default Container.create(Login);