import React, { useContext, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { Context, setAddressModal } from '../../store'
import axios from 'axios'
import './index.scss'

/**
 * "addressType": "physical", // 分虚拟地址和物理地址，虚拟地址指放在公有云上的，物理地址是实际的物理位置
    "buildingName": "合生汇",
    "city": "西城",
    "countryRegion": "中国",
    "floor": "18层",
    "geoPoint": {
        "lat": 39.916527,
        "lon": 116.397128
    },
    "officeNumber": "108",
    "postalCode": "000000",
    "province": "北京",
    "rackNumber": "Q934812741",
    "streetName": "华夏大街区",
    "streetNumber": "021"
 * 
 */
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
}
const titleMap = {
  Add: '添加地址',
  Edit: '编辑地址'
}
const AddressModal = () => {
  const { state, dispatch } = useContext(Context)
  const [form] = Form.useForm()
  const {
    addressModal
  } = state

  const handleOk = async () => {
    const value = await form.validateFields()
    console.log(value)
    axios.post(`http://www.opennet.link/address.php?action=add`, {
      ...value
    }).then(res => {
      console.log(res)
    })
    // dispatch(setAddressModal({
    //   open: false,
    // }))
  }

  const handleCancel = () => {
    dispatch(setAddressModal({
      open: false
    }))
  }

  useEffect(() => {
    if (addressModal.open && addressModal.type === 'Edit') {
      form.setFieldsValue(addressModal.record || {})
    }
    if (addressModal.open && addressModal.type === 'Add') {
      form.resetFields()
    }
  }, [addressModal, form])

  useEffect(() => {
    if (addressModal.open && addressModal.type === 'Add') {
      form.resetFields()
    }
  }, [addressModal.open, addressModal.type, form])

  return <Modal
    title={titleMap[addressModal.type]}
    maskClosable={false}
    open={addressModal.open}
    onOk={handleOk}
    onCancel={handleCancel}
  >
  <Form form={form} {...layout}>
    <Form.Item
      label='国家地区'
      name='countryRegion'
      rules={[{
        required: true,
        message: '国家地区不能为空'
      }]}
    >
      <Input placeholder="请输入国家地区" />
    </Form.Item>
    <Form.Item
      label='省份'
      name='province'
      rules={[{
        required: true,
        message: '省份不能为空'
      }]}
    >
      <Input placeholder="请输入省份" />
    </Form.Item>
    <Form.Item
      label='城市'
      name='city'
      rules={[{
        required: true,
        message: '城市不能为空'
      }]}
    >
      <Input placeholder="请输入城市" />
    </Form.Item>
    <Form.Item
      label='街道'
      name='streetName'
      rules={[{
        required: true,
        message: '街道不能为空'
      }]}
    >
      <Input placeholder="请输入街道" />
    </Form.Item>
    <Form.Item
      label='街道号'
      name='streetNumber'
      rules={[{
        required: true,
        message: '街道号不能为空'
      }]}
    >
      <Input placeholder="请输入街道号" />
    </Form.Item>
    <Form.Item
      label='园区'
      name='buildingName'
      rules={[{
        required: true,
        message: '园区不能为空'
      }]}
    >
      <Input placeholder="请输入园区" />
    </Form.Item>
    <Form.Item
      label='楼层'
      name='floor'
      rules={[{
        required: true,
        message: '楼层不能为空'
      }]}
    >
      <Input placeholder="请输入楼层" />
    </Form.Item>
    <Form.Item
      label='门牌号'
      name='officeNumber'
      rules={[{
        required: true,
        message: '门牌号不能为空'
      }]}
    >
      <Input placeholder="请输入门牌号" />
    </Form.Item>
    <Form.Item
      label='邮编'
      name='postalCode'
      rules={[{
        required: true,
        message: '邮编不能为空'
      }]}
    >
      <Input placeholder="请输入邮编" />
    </Form.Item>
    <Form.Item
      label='经度'
      name={['geoPoint', 'lon']}
      rules={[{
        required: true,
        message: '经度不能为空'
      }]}
    >
      <Input placeholder="请输入经度" />
    </Form.Item>
    <Form.Item
      label='纬度'
      name={['geoPoint', 'lat']}
      rules={[{
        required: true,
        message: '纬度不能为空'
      }]}
    >
      <Input placeholder="请输入纬度" />
    </Form.Item>
    <Form.Item
      label='地址易读名'
      name='addressName'
      rules={[{
        required: true,
        message: '地址易读名不能为空'
      }]}
    >
      <Input placeholder="请输入地址易读名" />
    </Form.Item>
    <Form.Item
      label='rackNumber'
      name='rack'
      rules={[{
        required: true,
        message: 'rackNumber不能为空'
      }]}
    >
      <Input placeholder="请输入rackNumber" />
    </Form.Item>
  </Form>
</Modal>
}
export default AddressModal
