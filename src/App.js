import { TeamOutlined, EnvironmentOutlined, ApiOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import { useState, Suspense, useMemo } from 'react';
// import ComponentApp from './route'
import zhCN from 'antd/lib/locale/zh_CN'
import { useNavigate, Routes, Route } from 'react-router-dom'
import useEnhancedReducerv from './UseEnhancedReducer'
import reducer, { Context, initialState } from './store'
import Home from './pages/Index'
import Address from './pages/Address'
import LinkNode from './pages/LinkNode'
import LinkInfo from './pages/LinkInfo'
import './App.css'

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [currentKey, setCurrentKey] = useState(['3'])
  const [state, dispatch] = useEnhancedReducerv(reducer, initialState)
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigator = useNavigate()

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const skipPageHande = (url, key) => {
    navigator(url)
    setCurrentKey(key)
  }

  const items = [
    getItem('终端用户', 'sub1', <TeamOutlined />, [
      getItem(<div onClick={skipPageHande.bind(this, '/home', ['3'])}>用户信息</div>, '3')
    ]),
    getItem(<div onClick={skipPageHande.bind(this, '/address', ['4'])}>地址信息</div>, '4', <EnvironmentOutlined />),
    getItem(<div onClick={skipPageHande.bind(this, '/linkNode', ['5'])}>链接点信息</div>, '5', <ApiOutlined />),
    getItem(<div onClick={skipPageHande.bind(this, '/linkInfo', ['6'])}>链接信息</div>, '6', <DeploymentUnitOutlined />),
  ];

  const componentLoadingDom = useMemo(() => {
    return <div style={{ textAlign: 'center' }}>加载中...</div>
  }, [])


  return (
    <Suspense fallback={componentLoadingDom}>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Context.Provider value={{ state, dispatch }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div
              style={{
                height: 32,
                margin: 16,
                color: '#fff'
              }}
              className='system-title-name'
            >管理系统</div>
            <Menu
              theme="dark"
              selectedKeys={currentKey}
              mode="inline"
              items={items}
              defaultOpenKeys={['sub1']}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            />
            <Content
              style={{
                margin: '0 16px',
              }}
            >
              <Breadcrumb
                style={{
                  margin: '16px 0',
                }}
              >
                {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
              </Breadcrumb>
              <ConfigProvider locale={zhCN}>
                {/* <ComponentApp /> */}
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/address" element={<Address />}></Route>
                  <Route path="/linkNode" element={<LinkNode />}></Route>
                  <Route path="/linkInfo" element={<LinkInfo />}></Route>
                </Routes>
              </ConfigProvider>
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
        </Context.Provider>
        
      </Layout>
    </Suspense>
  );
};
export default App;
