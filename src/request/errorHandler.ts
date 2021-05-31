import { history } from 'umi';
import { message } from 'antd';

interface CodeMessage {
  [propName: number]: string;
}
const codeMessage: CodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * message 使用规则,若服务器有抛出 message 则使用,若无,则使用 codeMessage
 */
export const errorHandler = (error: any) => {
  const { response } = error;
  if (response) {
    const { data } = response;
    const msg = codeMessage[response.status] || '请求错误';
    if (response.status !== 200) {
      message.error((data && data.message) || msg);
      return Promise.reject(response);
    }
    if (data) {
      if (data.code !== 0) {
        if (data.code === 'SCHOOL_2001' || data.code === 'SCHOOL_8') {
          history.push('/login');
        } else {
          message.error(data.msg || msg);
        }
        return Promise.reject(response);
      }
    }

    return data;
  }
  console.log(error);
  message.error('您的网络发生异常，无法连接服务器');
  return Promise.reject(response);
};
