// @flow
/*
   App 容器组件的子组件，顶部状态栏
*/
import * as React from 'react';
import { withRouter } from 'react-router-dom';

// import '../../less/app.less';
import styles from '../../less/app.less';

type Props = {
   location: Object,
   title: string,
   children: React.Element<any>
}

class AppCom extends React.Component<Props> {
   constructor(props) {
      super(props);
   }
   static defaultProps = {
      title: 'default  title'
   };
   render(): React.Element<any> {
      const { title, location } = this.props;
      const currentKey: string = location.pathname;
      console.log(currentKey);

      return (
         <div id={styles.appContainer}>
            <header className={styles.appHeader}>{title}</header>
            <div className={styles.appBody}>
               {this.props.children}
               {/* <Link to="/test">点击进入 Test 页面</Link> */}
               {/* Route 可以像正常组件一样写在这里 */}
               {/* <Route path="/test" component={Test}/> */}
            </div>
         </div>
      );
   }
}

export default withRouter(AppCom);
