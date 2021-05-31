# CRM 系统

## 本地运行

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```
## 项目地址

测试环境：

线上环境：

## 样式

全局样式 global.less

公共样式 common.less

## 工具函数

src/utils

## 公共组件

src/views

## 请求模块

src/request

## 状态管理

mobx

## 公共状态

src/store

## 业务开发

页面使用class
```typescript
@observer
class Login extends React.Component{
  private readonly store: typeof Store
  constructor(props: any) {
    super(props);
    this.store = CreateObservable(Store)
  }
  
}
```
组件使用hook

```typescript
const Test = observer(() => {
  const store = useLocalObservable(() => initialState)
  
})
```
