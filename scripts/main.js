import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Registration from './registration';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const WrappedRegistrationForm = Form.create()(Registration);
ReactDOM.render(<WrappedRegistrationForm />, document.getElementById('main'));

// ReactDOM.render(<h1>salam</h1>, document.getElementById('main'));
