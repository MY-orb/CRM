import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';

const AXIOS_DEFAULTS = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 删除空参数
const filterParam = (obj: any) => {
  if (obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        filterParam(obj[key]); // 递归遍历
      }
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }
      if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
  return obj;
};

interface ApiConfig {
  errorHandler?: any;
  appendData?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  basePath?: string;
}

class API {
  private defaults: AxiosRequestConfig;
  instance: AxiosInstance;
  private errorHandler: ApiConfig['errorHandler'];
  private appendData: ApiConfig['appendData'];
  private basePath?: string;

  constructor(axiosConfig: AxiosRequestConfig, apiConfig: ApiConfig = {}) {
    this.defaults = { ...AXIOS_DEFAULTS, ...axiosConfig };
    this.instance = axios.create(this.defaults);
    this.errorHandler = apiConfig.errorHandler;
    this.appendData = apiConfig.appendData;
    this.basePath = apiConfig.basePath || '';

    this.instance.interceptors.request.use(
      (config) => {
        filterParam(config.params || config.data);
        this.appendData && this.appendData(config);
        filterParam(config.headers);
        if (config.method === 'get') {
          config.paramsSerializer = (params) =>
            qs.stringify(params, { arrayFormat: 'repeat' });
        }
        return config;
      },
      (error: any) => {
        return this.errorHandler(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        return this.errorHandler({ response });
      },
      (error) => {
        return this.errorHandler(error);
      },
    );
  }

  request(originConfig: any) {
    const config = { ...this.defaults, ...originConfig };
    return this.instance.request(config);
  }
}

export default API;
