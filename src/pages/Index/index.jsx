import React, { useContext, useEffect, useState } from 'react'
import { Table, Tooltip, Button, Space, Modal, Form, Input, message } from 'antd'
import CustomerModal from '../CustomerModal'
import { Context, setCustomserModal } from '../../store'
// import Apis from '../../apis'
import axios from 'axios'
import './index.scss'

const Home = () => {
  const [dataSource, setDataSource] = useState([])
  const { dispatch } = useContext(Context)
  const [form] = Form.useForm()

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'customerId',
      key: 'customerId',
      fixed: 'left',
      width: 150
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
      width: 300
    },
    {
      title: '公司营业执照号',
      dataIndex: 'brNumber',
      key: 'brNumber',
      width: 200
    },
    {
      title: '联系人姓名',
      dataIndex: 'contactName',
      key: 'contactName',
      width: 150
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      key: 'contactPhone',
      width: 150
    },
    {
      title: '联系email',
      dataIndex: 'contactEmail',
      key: 'contactEmail',
      width: 220
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      key: 'address',
      width: 300,
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

  // const pageChange = (page, pageSize) => {
  //   console.log(page, pageSize)
  // }

  const editHandler = (record) => {
    dispatch(setCustomserModal({
      open: true,
      type: 'Edit',
      record
    }))
  }

  const addHandler = () => {
    dispatch(setCustomserModal({
      open: true,
      type: 'Add'
    }))
  }

  const getUsers = () => {
    axios.get('http://www.opennet.link/customer.php?action=list').then(res => {
      console.log(res.data)
      setDataSource(res.data || [])
    }).catch(err => {
      message.error(err)
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  // useEffect(() => {
  //   const arr = []
  //   for(let i = 0; i < 50; i++) {
  //     arr.push({
  //       endCustomerId: i,
  //       companyName: `中国一点${i}`,
  //       brNumber: '41263205',
  //       customerName: '张三',
  //       contactPhone: '18516089766',
  //       contactEmail: '122134@qq.com',
  //       address: {
  //         "buildingName": "星宇文创园", // 建筑名称
  //         "city": "东城", // 城市
  //         "countryRegion": "中国", // 国家
  //         "floor": "42", // 办公室所在楼层
  //         "geoPoint": { // 地理位置坐标
  //             "lat": 45.888, // 经度
  //             "lon": 12.88 // 维度
  //         },
  //         "officeNumber": "8115", // 办公室门牌号
  //         "postalCode": "100022", // 邮政编码
  //         "province": "北京", // 省份
  //         "streetName": "来广营西路", // 街道名称
  //         "streetNumber": "甲9号" // 街道号
  //       }
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
      rowKey='brNumber'
      pagination={false}
      // pagination={{
      //   showQuickJumper: true,
      //   showSizeChanger: true,
      //   total: 50,
      //   onChange: pageChange,
      //   showTotal: (total) => `共 ${total} 条数据`
      // }}
    />
    <CustomerModal />
  </div>
}
export default Home