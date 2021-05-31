import React from 'react';
import PageTitle from '@/views/pageTitle/index';
import styles from './index.less';
import { Tabs } from 'antd';
import { CreateObservable } from '@/utils/CreateObservable';
import { observer } from 'mobx-react';
const { TabPane } = Tabs;

interface TabPaneParams {
  title: string;
  content: JSX.Element | string;
  key: string;
  closable?: boolean;
}

const renderCon = () => {
  return <div>Content of Tab 1</div>;
};

const initialPanes = [
  { title: '用户管理', content: renderCon(), key: '1', closable: false },
  { title: 'wyd', content: 'Content of Tab 2', key: '2' },
];

const Store = {
  panes: initialPanes,
  activeKey: initialPanes[0].key,
  onEdit(targetKey: any) {
    this.remove(targetKey);
  },
  // 删除tab标签函数
  remove(targetKey: string) {
    let newActiveKey = this.activeKey;
    let lastIndex;
    this.panes.forEach((pane: TabPaneParams, i: number) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = this.panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex && lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.panes = newPanes;
    this.activeKey = newActiveKey;
  },
  onChange(activeKey: string) {
    this.activeKey = activeKey;
  },
};

@observer
class IndexPage extends React.Component {
  private readonly store: typeof Store;
  constructor(props: any) {
    super(props);
    this.store = CreateObservable(Store);
  }
  render() {
    const { activeKey, panes, onChange, onEdit } = this.store;
    return (
      <div className={styles.box}>
        <PageTitle />
        <Tabs
          hideAdd
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          tabBarGutter={0}
        >
          {panes.map((pane) => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
export default IndexPage;
