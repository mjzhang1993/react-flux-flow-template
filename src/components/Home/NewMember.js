// @flow

/*
   添加新成员
*/
import * as React from 'react';
import {Map} from 'immutable';

type Props = {
   changeInputInfo: Function,
   inputInfo: Map<string, any>,
   postNewInfo: Function
}

// 一个无用的，用来说明 state 如何定义类型
type State = {
   test: number
}

export default class NewMember extends React.PureComponent<Props, State> {
   state: State;
   constructor(props: Props) {
      super(props);
      this.state = {
         test: 0
      };
   }
   handleChange(mold: string, e: any) {
      const { changeInputInfo, inputInfo } = this.props;
      const newInfo = inputInfo.set(mold, e.target.value);

      changeInputInfo(newInfo);
   }
   handleClick = () => {
      const { postNewInfo, inputInfo } = this.props;

      postNewInfo(inputInfo)
         .then(res => console.log('success return ', res))
         .catch(err => console.error(err));
   };
   render(): React.Element<any> {
      const inputInfo = this.props.inputInfo;

      return (
         <div className="new-member">
            <p>
               姓名：
               <input type="text" value={inputInfo.get('name')} onChange={this.handleChange.bind(this, 'name')} />
            </p>
            <p>
               电话：
               <input type="tel" value={inputInfo.get('tel')} onChange={this.handleChange.bind(this, 'tel')} />
            </p>
            <button onClick={this.handleClick}>提交 {this.state.test}</button>
         </div>
      );
   }
}
