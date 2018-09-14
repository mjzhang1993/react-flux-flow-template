// @flow

/*
   Home 容器组件的子组件，信息展示
*/
import * as React from 'react';
import {Map} from 'immutable';
import { Link } from 'react-router-dom';
import NewMember from './NewMember';
import MemberList from './MemberList';

import '../../less/home.less';

type Props = {
   homeState: Map<string, any>,
   changeInputInfo: Function,
   postNewInfo: Function,
   getMemberList: Function
}

export default class HomeCom extends React.Component<Props> {
   constructor(props: Props) {
      super(props);
   }
   componentWillMount() {
      this.props.getMemberList();
   }
   render(): React.Element<any> {
      const { homeState, changeInputInfo, postNewInfo } = this.props;

      return (
         <div id="home-container">
            <NewMember inputInfo={homeState.get('inputInfo')} changeInputInfo={changeInputInfo} postNewInfo={postNewInfo} />
            <MemberList memberList={homeState.get('memberList')} />
            {/* location 对象可以有 search 但是 query 取消了 */}
            <Link to={{ pathname: '/test', search: '?name=homename', state: { mold: 'add' } }} className="home-link">
               点击跳转到 test page sasas
            </Link>
         </div>
      );
   }
}
