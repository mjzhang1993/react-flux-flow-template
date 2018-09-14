// @flow

/*
   Test 容器组件的子组件，信息展示
*/
import * as React from 'react';
import { withRouter } from 'react-router-dom';

import '../../less/home.less';

type Props ={
   history: Object
}

class TestCom extends React.Component<Props> {
   constructor(props: Props) {
      super(props);
   }
   handleClick = () => {
      // withRouter 使组件获得了 location history match 三个属性
      this.props.history.push({
         pathname: '/home',
         search: '?name=testname'
      });
   };
   render(): React.Element<any> {
      return (
         <div className="test-container">
            <button onClick={this.handleClick}>点击回到 home page</button>
         </div>
      );
   }
}

export default withRouter(TestCom);