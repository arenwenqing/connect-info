import React, { useContext, useEffect, useState } from 'react'
import { Table, Button, Space, Modal, Form, Input, message } from 'antd'
import AddressModal from '../AddressModal'
import { Context, setAddressModal } from '../../store'
import axios from 'axios'
import './index.scss'

const Address = () => {
  const [dataSource, setDataSource] = useState([])
  const { dispatch } = useContext(Context)
  const [form] = Form.useForm()

  const columns = [
    {
      title: '国家地区',
      dataIndex: 'countryRegion',
      key: 'countryRegion',
      fixed: 'left',
      width: 150
    },
    {
      title: '省份',
      dataIndex: 'province',
      key: 'province',
      width: 150
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      width: 150
    },
    {
      title: '街道',
      dataIndex: 'streetName',
      key: 'streetName',
      width: 200
    },
    {
      title: '街道编号',
      dataIndex: 'streetNumber',
      key: 'streetNumber',
      width: 100
    },
    {
      title: '大厦（小区）',
      dataIndex: 'buildingName',
      key: 'buildingName',
      width: 150
    },
    {
      title: '楼层',
      dataIndex: 'floor',
      key: 'floor',
      width: 70
    },
    {
      title: '门牌号',
      dataIndex: 'officeNumber',
      key: 'officeNumber',
      width: 100
    },
    {
      title: 'rack',
      dataIndex: 'rack',
      key: 'rack',
      width: 150,
      render: (text, record) => {
        return <span>{text || '-'}</span>
      }
    },
    {
      title: '邮编',
      dataIndex: 'postalCode',
      key: 'postalCode',
      width: 150
    },
    {
      title: '地址坐标',
      dataIndex: 'geoPoint',
      key: 'geoPoint',
      width: 200,
      render: (text, record) => {
        return <Space>
          <span>经度{text?.lon || '-'}</span>
          <span>纬度{text?.lat || '-'}</span>
        </Space>
      }
    },
    // {
    //   title: '地址类型',
    //   dataIndex: 'addressType',
    //   key: 'addressType',
    //   width: 100
    // },
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
    dispatch(setAddressModal({
      open: true,
      type: 'Edit',
      record
    }))
  }

  const addHandler = () => {
    dispatch(setAddressModal({
      open: true,
      type: 'Add'
    }))
  }

  const getAddressList = () => {
    axios.get('http://www.opennet.link/address.php?action=list').then(res => {
      console.log(res.data)
      setDataSource(res.data || [])
    }).catch(err => {
      message.error(err)
    })
  }

  useEffect(() => {
    getAddressList()
  }, [])

  // useEffect(() => {
  //   const arr = []
  //   for(let i = 0; i < 50; i++) {
  //     arr.push({
  //       endCustomerId: i,
  //       "buildingName": "星宇文创园", // 建筑名称
  //       "city": "东城", // 城市
  //       "countryRegion": "中国", // 国家
  //       "floor": "42", // 办公室所在楼层
  //       "geoPoint": { // 地理位置坐标
  //         "lat": 45.888, // 经度
  //         "lon": 12.88 // 维度
  //       },
  //       "addressType": "physical",
  //       "rackNumber": "Q934812741",
  //       "officeNumber": "8115", // 办公室门牌号
  //       "postalCode": "100022", // 邮政编码
  //       "province": "北京", // 省份
  //       "streetName": "来广营西路", // 街道名称
  //       "streetNumber": "甲9号" // 街道号
  //     })
  //   }
  //   setDataSource(arr)
  // }, [])
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
      rowKey='addressId'
      pagination={false}
      // pagination={{
      //   showQuickJumper: true,
      //   showSizeChanger: true,
      //   total: 50,
      //   onChange: pageChange,
      //   showTotal: (total) => `共 ${total} 条数据`
      // }}
    />
    <AddressModal />
  </div>
}
export default Address