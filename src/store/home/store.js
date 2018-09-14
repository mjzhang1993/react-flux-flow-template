//  @flow

/*
* home 页面的 store
* */

import {ReduceStore} from 'flux/utils';
import {Map, fromJS} from 'immutable';
import Dispatcher from '../Dispatcher';
import {CHANGE_INPUT_INFO, GET_MEMBER_LIST} from './constants';

type State = Map<string, any>

class homeStore extends ReduceStore<State> {
   getInitialState(): State {
      return fromJS({
         memberList: [],
         inputInfo: {
            name: '',
            tel: ''
         },
         title: '成员s列表'
      })
   }

   reduce(state: State, action: Object): State {
     console.log('in home store');
      switch (action.type) {
         case CHANGE_INPUT_INFO:
            return state.set('inputInfo', action.payload);
         case GET_MEMBER_LIST:
            return state.set('memberList', action.payload);
         default: return state;
      }
   }
}

export default new homeStore(Dispatcher);