// @flow

/*
* login 页面 store
* */

import {ReduceStore} from 'flux/utils';
import {Map, fromJS} from 'immutable';
import Dispatcher from '../Dispatcher';
import {CHANGE_INPUT_DATA, INPUT_FEEDBACK} from './constants';

type State = Map<string, any>

const initialData = fromJS({
   username: {
      value: '',
   },
   password: {
      value: '',
   },
   loginSuccess: false
});


class loginStore extends ReduceStore<State> {
   state: State;

   getInitialState(): State {
      return initialData.merge({})
   }

   reduce(state: State, action: Object): State {
      console.log('in login store');
      switch (action.type) {
         case CHANGE_INPUT_DATA:
            return state.mergeDeep(action.payload);
         case INPUT_FEEDBACK:
            return this._inputFeedBack(state, action);
         default: return state;
      }
   }
   _inputFeedBack(state: State, action: Object) {
     const success = action.payload.success;

     if (success) {
       const newState = state.merge(initialData);

       return newState.set('loginSuccess', success);
     }

     return state.set('loginSuccess', success);
   }
}

export default new loginStore(Dispatcher);