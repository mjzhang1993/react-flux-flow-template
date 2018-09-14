// @flow

/*
   Home 主页
*/
import * as React from 'react';
import {Container} from 'flux/utils';
import {Map} from 'immutable';
import homeStore from '../store/home/store';
import {
   getMemberList,
   changeInputInfo,
   postNewInfo
} from '../store/home/actions';
import HomeCom from '../components/Home/index';

type State = {
   homeState: Map<string, any>
}

class Home extends React.Component<void, State> {
   constructor(props: any) {
      super(props);
   }
   static getStores() {
      return [homeStore];
   }
   static calculateState(prevState: State) {
      const homeState = homeStore.getState();

      return {
         homeState
      }
   }
   render(): React.Element<any> {
      return (
         <HomeCom
            homeState={this.state.homeState}
            getMemberList={getMemberList}
            changeInputInfo={changeInputInfo}
            postNewInfo={postNewInfo}
         />
      );
   }
}

export default Container.create(Home);
