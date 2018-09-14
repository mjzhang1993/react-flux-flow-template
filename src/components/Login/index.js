// @flow

/*
* LoginCom UI组件
*
* */
import * as React from 'react';
import LoginForm from './LoginForm';

type Props = {
   loginState: Map<string, any>,
   changeInputData: Function,
   postDataToLogin: Function
}

class LoginCom extends React.Component<Props> {

   render(): React.Element<any> {
      return (
         <div>
            <LoginForm
              loginState={this.props.loginState}
              changeInputData={this.props.changeInputData}
              postDataToLogin={this.props.postDataToLogin}
            />
         </div>
      );
   }
}

export default LoginCom;