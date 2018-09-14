// @flow

/*
* Login Form Item 通过配置文件配置 表单项
* */

import * as React from 'react';
import {Form, Button, Input,} from 'antd';

const FormItem = Form.Item;

const mapConfigToComponent = (config) => {
  const maps = {
    input: props => <Input {...props}/>,
    button: props => <Button {...props.attr}>{props.value}</Button>
  };

  return maps[config.element](config.props);
};

type Props = {
  form: any,
  config: Object
}

class LoginFormItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render(): React.Element<any> {
    const {getFieldDecorator} = this.props.form;
    const {item, field, node} = this.props.config;

    return (
      <FormItem {...(item && item.attr || {})}>
        {field === null
          ? mapConfigToComponent(node)
          : getFieldDecorator(field.name, field.options)(mapConfigToComponent(node))}
      </FormItem>
    )
  }
}

export default LoginFormItem;