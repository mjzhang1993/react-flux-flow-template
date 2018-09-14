// @flow

/*
   App 应用总容器
*/
import * as React from 'react';
import {Container} from 'flux/utils';
import homeStore from '../store/home/store';
import AppCom from '../components/App/index';

type Props = {
   children?: React.Element<any>
}

type State ={
   title: string
}

class App extends React.Component<Props, State> {
   constructor(props: Props) {
      super(props);
   }
   static getStores(): Array<any> {
      return [homeStore];
   }
   static calculateState(preState) {
      return {
         title: homeStore.getState().get('title'),
      };
   }
   render(): React.Element<any> {
      return <AppCom title={this.state.title}>{this.props.children}</AppCom>;
   }
}

export default Container.create(App);
