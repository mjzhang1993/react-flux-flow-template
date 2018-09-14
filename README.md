### 项目运行步骤

```bash
# 开发环境
npm run dev
# 开发环境服务器
npm run server
# 生产环境打包
npm run build
# 生产环境打包情况查看
npm run build --report
```

### flux/utils 使用流程

1. 定义全局唯一的 Dispatcher 实例 /src/store/Dispatcher.js

```jsx
  // @flow

  /*
  * Dispatcher.js Flux 全局只有一个 Dispatcher 但是可以有多个 Store
  * */

  // 创建全局唯一 Dispatcher

  import { Dispatcher } from 'flux';

  const instance: Dispatcher = new Dispatcher();

  // 这样方便直接引用 dispatch
  export const dispatch = instance.dispatch.bind(instance);

  export default instance;
```

2. 创建某个页面的 Store 数据 /src/store/{pageName}/store.js
  1. 创建一个继承 ReduceStore 的 pageStore 类, 最后输出他的实例, ReduceStore 是 'flux/utils' 提供的
  2. pageStore 中有两个需要重写的方法 getInitialState | reduce
  3. 定义 getInitialState 方法返回一个初始化的 state
  4. 定义 reduce 方法接受旧的 state 和 action ，根据 action.type 触发不同的更改，返回新的 state
  
  ```jsx
  // @flow

    /*
    - login 页面 store
    - */

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
          switch (action.type) {
             case CHANGE_INPUT_DATA:
                return state.mergeDeep(action.payload);
             case INPUT_FEEDBACK: {
                const success = action.payload.success;

                if (success) {
                   const newState = state.merge(initialData);

                   return newState.set('loginSuccess', success);
                }

                return state.set('loginSuccess', success);
             }
             default: return state;
          }
       }

    }

    export default new loginStore(Dispatcher);
  ```

3. 创建 对应这个页面的 actions-creator 文件 /src/store/{pageName}/actions.js
  1. 在这个文件中引入 dispatch, dispatch 是 全局唯一 Dispatcher 的方法，用来分发 action
  2. 定义一个 action creator 函数，这个函数中可以通过 dispatch 一个 含有 type 属性的对象来分发 action
  
  ```jsx
    import {dispatch} from '../Dispatcher';

    export function changeInputData(newInputData: InputData) {
       return dispatch({
          type: CHANGE_INPUT_DATA,
          payload: newInputData
       })
    }
  ```

4. 由于 action.type 在 action 中和 store 中都会用到，一次需要将其提取出为常量，防止拼写错误引起 BUG 提取到 /src/store/{pageName}/constants.js
5. 组件中使用
  1. 定义一个容器组件 Page 在 /src/container/{pageName}.js
  2. 这个组件要被 Container.create(Page) 高阶组件包裹后，返回新的组件 Container 是 'flux/utils' 提供的高阶组件，用于将 flux 的 store 与组建立联系
  3. 在我们自定义的组件 Page 中要定义两个固定的静态方法 getStore | calculateState,（高阶组件中会用到
  4. getStore 用来将我们创建的 store 与组件建立联系，他需要返回一个包含多个 store 的数组
  5. calculateState 会返回一个对象，对象中的属性值对应了 从 store 中获取的 状态，这属性值会作为 组件的 this.state 的属性值使用
  6. 我们之前定义的 actions 可以在这里引入
  7. 最后 引入的 action 与 state 又可以传给子组件作为 props 使用

  ```jsx
    // @flow

    /*
    + Login 页面 使用 antd Form
    + */

    import * as React from 'react';
    import {Container} from 'flux/utils'
    import LoginCom from '../components/Login/index';
    import {changeInputData, postDataToLogin} from '../store/login/actions';
    import loginStore from '../store/login/store';

    type State = {
      loginState: Map<string, any>
    }

    class Login extends React.Component<any, State> {

      static getStores() {
        return [loginStore]
      }
      static calculateState(prevState: State): State {
        return {
          loginState: loginStore.getState()
        }
      }

      render(): React.Element<any> {
        return (
          <LoginCom
            loginState={this.state.loginState}
            changeInputData={changeInputData}
            postDataToLogin={postDataToLogin}
          />
        )
      }
    }

    export default Container.create(Login);
  ```
