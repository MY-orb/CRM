import API from '@/request/api';
import { errorHandler } from '@/request/ErrorHandler';
import LocalStorage from '@/utils/Storage';

interface BaseURL {
  [propName: string]: string;
}
const appendData = (config: any) => {
  // config.headers.token = LocalStorage.get('token')
  return config;
};

const UMI_ENV = process.env.NODE_ENV || 'pro';

const Base_URL: BaseURL = {
  development: '',
  test: '',
  production: '',
  pro: '',
};
const baseURL = Base_URL[UMI_ENV];

const Request = new API(
  {
    baseURL,
  },
  {
    errorHandler,
    appendData,
  },
);

const request = Request.instance;

export default request;
