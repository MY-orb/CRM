import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'CRM系统',
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/test', component: '@/pages/test/index' },
    { path: '/login', component: '@/pages/login/index' },
  ],
  fastRefresh: {},
});
