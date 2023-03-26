import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Space, Modal, Form, Input, Tooltip } from 'antd'
import LinkNodeModal from '../LinkeNodeModal'
import { Context, setLinkNodeModal } from '../../store'
import './index.scss'

/**
 * 
 * "boneId": "46f738ad-b628-4b24-94e8-3381f6062b6d", // 添加时下拉选择
    "destinationPE": { // 终点信息
        "cVlanId": 32,
        "eaPermitNumber": "64623564",
        "interfaceId": "4324",
        "interfaceSerialNumber": "83274671",
        "interfaceType": "UNI",
        "peAddress": {
            "addressType": "physical",
            "buildingName": "京都中心",
            "city": "台北市",
            "countryRegion": "中国",
            "floor": "12",
            "geoPoint": {
                "lat": 23.875367,
                "lon": 120.651224
            },
            "officeNumber": "102",
            "postalCode": "010000",
            "province": "台湾",
            "rackNumber": "9823182",
            "streetName": "利得来",
            "streetNumber": "091"
        },
        "peId": "7471315c5bd44e379d22b1e09d6880af",
        "sVlanId": 54,
        "wanIp": {
            "ipAddress": "Others Dynamic",
            "ipType": "dynamic",
            "portId": "c06a8343243641499c93126348c52a68",
            "portType": "UNI",
            "portTypeId": "4324"
        }
    },
 */
const LinkNode = () => {
  const [dataSource, setDataSource] = useState([])
  const { dispatch } = useContext(Context)
  const [form] = Form.useForm()

  const columns = [
    {
      title: 'boneId',
      dataIndex: 'boneId',
      key: 'boneId',
      fixed: 'left',
      width: 150
    },
    {
      title: 'cVlanId',
      dataIndex: 'cVlanId',
      key: 'cVlanId',
      width: 150
    },
    {
      title: 'eaPermitNumber',
      dataIndex: 'eaPermitNumber',
      key: 'eaPermitNumber',
      width: 150
    },
    {
      title: 'interfaceId',
      dataIndex: 'interfaceId',
      key: 'interfaceId',
      width: 150
    },
    {
      title: 'interfaceSerialNumber',
      dataIndex: 'interfaceSerialNumber',
      key: 'interfaceSerialNumber',
      width: 190
    },
    {
      title: 'interfaceType',
      dataIndex: 'interfaceType',
      key: 'interfaceType',
      width: 150
    },
    {
      title: 'peAddress',
      dataIndex: 'peAddress',
      key: 'peAddress',
      width: 200,
      ellipsis: true,
      render: (text) => {
        return <Tooltip title={`${text.countryRegion}${text.province}${text.city}${text.streetName}
        ${text.streetNumber}${text.buildingName}门牌号${text.officeNumber}邮政编码${text.postalCode}`}>
          <span>
            {`${text.countryRegion}${text.province}${text.city}${text.streetName}
            ${text.streetNumber}${text.buildingName}门牌号${text.officeNumber} 邮政编码${text.postalCode}`}
          </span>
        </Tooltip> 
      }
    },
    {
      title: 'peId',
      dataIndex: 'peId',
      key: 'peId',
      width: 200,
    },
    {
      title: 'sVlanId',
      dataIndex: 'sVlanId',
      key: 'sVlanId',
      width: 150
    },
    {
      title: 'wanIp',
      dataIndex: 'wanIp',
      key: 'wanIp',
      width: 200,
      ellipsis: true
    },
    {
      title: 'linkType',
      dataIndex: 'linkType',
      key: 'linkType',
      width: 100,
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
    dispatch(setLinkNodeModal({
      open: true,
      type: 'Edit',
      record
    }))
  }

  const addHandler = () => {
    dispatch(setLinkNodeModal({
      open: true,
      type: 'Add'
    }))
  }

  useEffect(() => {
    const arr = []
    for(let i = 0; i < 50; i++) {
      arr.push({
        endCustomerId: i,
        "boneId": "46f738ad-b628-4b24-94e8-3381f6062b6d", // 添加时下拉选择
        "cVlanId": 32,
        "eaPermitNumber": "64623564",
        "interfaceId": "4324",
        "interfaceSerialNumber": "83274671",
        "interfaceType": "UNI",
        "linkType": "pe-pe",
        "peAddress": {
          "addressType": "physical",
          "buildingName": "京都中心",
          "city": "台北市",
          "countryRegion": "中国",
          "floor": "12",
          "geoPoint": {
            "lat": 23.875367,
            "lon": 120.651224
          },
          "officeNumber": "102",
          "postalCode": "010000",
          "province": "台湾",
          "rackNumber": "9823182",
          "streetName": "利得来",
          "streetNumber": "091"
        },
        "peId": "7471315c5bd44e379d22b1e09d6880af",
        "sVlanId": 54,
        "wanIp": {
          "ipAddress": "Others Dynamic",
          "ipType": "dynamic",
          "portId": "c06a8343243641499c93126348c52a68",
          "portType": "UNI",
          "portTypeId": "4324"
        }
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
    <LinkNodeModal />
  </div>
}
export default LinkNode