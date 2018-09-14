// @flow

/*
* Login Form 组件
* */
import * as React from 'react';
// import {} from 'immutable';
import {Form, message} from 'antd';
import LoginFormItem from './LoginFormItem';

type Props = {
  form: any
};

const formConfig = {
  username: {
    field: { // 项目判断
      name: 'username',
      options: {
        // initialValue: 'username',
        rules: [{
          max: 9, // 最大长度
          message: '请填写用户名!', // 文案
          pattern: /^123/, // 正则校验
          required: true, // 是否必填
          type: 'string', // 内建类型校验
          whiteSpace: true, // 校验时空格的处理
        }]
      }
    },
    node: { // 节点配置
      element: 'input',
      props: {type: 'text'}
    },
    item: { // Form.Item 配置
      attr: {
        hasFeedback: true, // 展示校验状态图标
        label: <mark>username</mark>,
        colon: true // 是否显示label 后冒号
      }
    }
  },
  password: {
    field: {
      name: 'password',
      options: {
        // initialValue: 'password',
        rules: [{
          max: 9, // 最大长度
          message: '请填写用户密码!', // 文案
          required: true, // 是否必填
          type: 'string', // 内建类型校验
          whiteSpace: true, // 校验时空格的处理
        }]
      }
    },
    node: {
      element: 'input',
      props: {type: 'string'}
    },
    item: {
      label: <mark>password</mark>,
      hasFeedback: true, // 展示校验状态图标
      colon: true // 是否显示label 后冒号
    }
  },
  submit: {
    field: null,
    node: {
      element: 'button',
      props: {
        attr: {},
        value: '点击'
      }
    },
    item: null
  }
};

class LoginForm extends React.Component<Props> {
  formConfig: Object;
  constructor(props: Props) {
    super(props);

    (this: any).checkThenSubmit = this.checkThenSubmit.bind(this);
    formConfig.submit.node.props.attr.onClick = (this: any).checkThenSubmit;
    (this: any).formConfig = formConfig;
  }
  checkThenSubmit() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return message.error(JSON.stringify(errors));
      }

      message.success(JSON.stringify(values));
    })
  }
  render(): React.Element<any> {
    const form = this.props.form;
    const {formConfig} = this;

    return (
      <Form>
        {Object.keys(formConfig).map(key => <LoginFormItem key={key} config={formConfig[key]} form={form}/>)}
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields: props => {
    const loginState = props.loginState;

    return {
      username: Form.createFormField({
        value: loginState.getIn(['username', 'value'])
      }),
      password: Form.createFormField({
        value: loginState.getIn(['password', 'value'])
      })
    }
  },
  onFieldsChange: (props, fields) => {
    const newInputData = Object.keys(fields).reduce((prev, current) => {
      prev[current] = {
        value: fields[current].value
      };
      return prev;
    }, {});

    props.changeInputData(newInputData)
  },
})(LoginForm);