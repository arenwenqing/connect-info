import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Space, Modal, Form, Input } from 'antd'
import LinkInfoModal from '../LinkInfoModal'
import { Context, setLinkInfoModal } from '../../store'
import './index.scss'

/**
 * "bandwidth": "87", // 带宽大小
    "bandwidthUnit": "Mbps", // 带宽单位
    "buyerId": "快快乐乐公司", // 购买人（单位名称）
    "linkServiceProvider": {
      "linkServiceProviderName": "CTG", // 底层链路提供商，一共3种，列表选择即可：CTG、CUG、CMI
      "linkServiceProviderType": "cross-border" // 链路类型
    },
    "sellerId": "CTG" // 服务提供商
    "linkId": "43ba478d-3765-4e0a-b995-8e2cb92c0b83", // 添加时不需要
    "linkState": "0", // 0 正常开通 -1：关闭
    "orderActivity": "Install",
    "orderId": "53f65887b31e4f289e592fd8dc73676d", // 添加时不需要
    "productOffering": "SDWAN"
 * 
 */
const LinkInfo = () => {
  const [dataSource, setDataSource] = useState([])
  const { dispatch } = useContext(Context)
  const [form] = Form.useForm()

  const columns = [
    {
      title: '带宽大小',
      dataIndex: 'bandwidth',
      key: 'bandwidth',
      fixed: 'left',
      width: 150
    },
    {
      title: '带宽单位',
      dataIndex: 'bandwidthUnit',
      key: 'bandwidthUnit',
      width: 150
    },
    {
      title: '购买人（单位名称）',
      dataIndex: 'buyerId',
      key: 'buyerId',
      width: 190
    },
    {
      title: '底层链路提供商',
      dataIndex: 'linkServiceProvider',
      key: 'linkServiceProvider',
      width: 200
    },
    {
      title: '服务提供商',
      dataIndex: 'sellerId',
      key: 'sellerId',
      width: 150
    },
    {
      title: '链接状态',
      dataIndex: 'linkState',
      key: 'linkState',
      width: 150,
      render: (text) => {
        return <span>{ text === '0' ? '正常开通' : '关闭' }</span>
      }
    },
    {
      title: 'linkId',
      dataIndex: 'linkId',
      key: 'linkId',
      width: 200
    },
    {
      title: 'orderId',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 200
    },
    {
      title: 'orderActivity',
      dataIndex: 'orderActivity',
      key: 'orderActivity',
      width: 150,
    },
    {
      title: 'productOffering',
      dataIndex: 'productOffering',
      key: 'productOffering',
      width: 150,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 170,
      render: (text, record) => {
        return <Space>
          <Button type='primary' onClick={editHandler.bind(this, record)}>编辑</Button>
          <Button danger type='primary' onClick={deleteHandler.bind(this, record)}>删除</Button>
        </Space>
      }
    }
  ]

  const deleteHandler = (record) => {
    Modal.confirm({
      title: '删除确认',
      icon: <></>,
      content: '您确定要删除该项记录么？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }

  const pageChange = (page, pageSize) => {
    console.log(page, pageSize)
  }

  const editHandler = (record) => {
    dispatch(setLinkInfoModal({
      open: true,
      type: 'Edit',
      record
    }))
  }

  const addHandler = () => {
    dispatch(setLinkInfoModal({
      open: true,
      type: 'Add'
    }))
  }

  useEffect(() => {
    const arr = []
    for(let i = 0; i < 50; i++) {
      arr.push({
        endCustomerId: i,
        "bandwidth": "87", // 带宽大小
        "bandwidthUnit": "Mbps", // 带宽单位
        "buyerId": "快快乐乐公司", // 购买人（单位名称）
        "linkServiceProvider": {
          "linkServiceProviderName": "CTG", // 底层链路提供商，一共3种，列表选择即可：CTG、CUG、CMI
          "linkServiceProviderType": "cross-border" // 链路类型
        },
        "sellerId": "CTG", // 服务提供商
        "linkId": "43ba478d-3765-4e0a-b995-8e2cb92c0b83", // 添加时不需要
        "linkState": "0", // 0 正常开通 -1：关闭
        "orderActivity": "Install",
        "orderId": "53f65887b31e4f289e592fd8dc73676d", // 添加时不需要
        "productOffering": "SDWAN"
      })
    }
    setDataSource(arr)
  }, [])
  return <div className='end-customer-wrapper'>
    <div className='end-customer-filter'>
      <Form form={form} layout='inline'>
        <Form.Item
          label='公司名称'
          name='companyName'
        >
          <Input placeholder='请输入公司名称' allowClear style={{ width: 200 }} />
        </Form.Item>
        <Form.Item
          label='联系人'
          name='customerName'
        >
          <Input placeholder='请输入联系人名称' allowClear style={{ width: 200 }} />
        </Form.Item>
        <Space>
          <Button type='primary'>搜索</Button>
          <Button type='primary' onClick={addHandler}>添加</Button>
        </Space>
      </Form>
    </div>
    <Table
      dataSource={dataSource}
      columns={columns}
      scroll={{
        x: 1300,
      }}
      rowKey='endCustomerId'
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        total: 50,
        onChange: pageChange,
        showTotal: (total) => `共 ${total} 条数据`
      }}
    />
    <LinkInfoModal />
  </div>
}
export default LinkInfo