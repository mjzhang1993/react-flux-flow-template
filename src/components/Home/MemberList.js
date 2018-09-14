// @flow
/*
   成员组
*/
import * as React from 'react';
import {List} from 'immutable';
import MemberItems from './MemberItems';

/*
   纯展示型组件可以使用函数式组件，传入的第一个参数是 props ，在这里不能访问 this
*/

type MList = {
   memberList: List<any>
}

const MemberList = ({ memberList }: MList): React.Element<any> => (
   <div className="member-list-wrap">
      <ul className="member-list">
         <MemberItems memberList={memberList} />
      </ul>
   </div>
);

export default MemberList;
