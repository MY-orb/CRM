import React from 'react';
import { Dropdown, Row, Col, Button, Menu, message } from 'antd';
import { DownOutlined, PlusOutlined, Html5Outlined } from '@ant-design/icons';
import styles from './index.less';
import Login from '@/request/login';
import { history } from 'umi';

const logout = async () => {
  try {
    const res = await Login.logout();
    console.log(res);
    if (res.code === 0) {
      message.success('退出成功');
      history.push('/login');
    }
  } catch (e) {
    console.log(e);
  }
};

const menu = (
  <Menu>
    <Menu.Item onClick={logout} key="1">
      退出登录
    </Menu.Item>
  </Menu>
);

const Index = () => {
  return (
    <Row className={styles.header} justify="space-between">
      <Col>
        <Html5Outlined />
        <span className={styles.logo}>选校帝</span>
        CRM管理系统
      </Col>
      <Col>
        <Button className={styles.recordBtn} size="small" type="primary">
          <PlusOutlined />
          录入资源
        </Button>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            wyd <DownOutlined />
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Index;
