import request from '@/request/request';

interface LoginParams {
  account: string;
  captcha: string;
}

class Login {
  /**
   * 登录
   */
  static login = (params: LoginParams): Promise<any> =>
    request.post('/api/user/login/captcha', {
      ...params,
    });

  /**
   * 退出登录
   */
  static logout = (): Promise<any> => request.get('/api/user/logout');
}

export default Login;
