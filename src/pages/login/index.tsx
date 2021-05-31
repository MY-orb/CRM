import React from 'react';
import { CreateObservable } from '@/utils/CreateObservable';
import { observer } from 'mobx-react';
import { Input, Button } from 'antd';
import LoginReq from '@/request/login';

const Store = {
  phone: '' as string,
  password: '' as string,
  loading: false,
  setPassword(str: string) {
    this.password = str;
  },
  setPhone(str: string) {
    console.log(str);
    this.phone = str;
  },
  async loginBtn() {
    try {
      this.loading = true;
      const res = await LoginReq.login({
        account: this.phone,
        captcha: this.password,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
};

@observer
class Login extends React.Component {
  private readonly store: typeof Store;
  constructor(props: any) {
    super(props);
    this.store = CreateObservable(Store);
  }

  render() {
    const { setPhone, phone, setPassword, password, loginBtn, loading } =
      this.store;
    return (
      <div style={styles.loginBg}>
        {/*// @ts-ignore*/}
        <div style={styles.loginBox}>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button loading={loading} onClick={loginBtn} type="primary">
            登录
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  loginBg: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
  },
};

export default Login;
