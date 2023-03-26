import React, { useContext, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { Context, setLinkNodeModal } from '../../store'
import './index.scss'

/**
 * "boneId": "46f738ad-b628-4b24-94e8-3381f6062b6d", // 添加时下拉选择
    "destinationPE": { // 终点信息
        "cVlanId": 32,
        "sVlanId": 54,
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
        "wanIp": {
            "ipAddress": "Others Dynamic",
            "ipType": "dynamic",
            "portId": "c06a8343243641499c93126348c52a68",
            "portType": "UNI",
            "portTypeId": "4324"
        }
    },
    "linkType": "pe-pe", // 链路类型，一共3种，列表选择即可：ce-pe/pe-pe
 * 
 */
const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
}
const titleMap = {
  Add: '添加链接点',
  Edit: '编辑链接点'
}
const LinkNodeModal = () => {
  const { state, dispatch } = useContext(Context)
  const [form] = Form.useForm()
  const {
    linkNodeModal
  } = state

  const handleOk = async () => {
    const value = await form.validateFields()
    console.log(value)
    dispatch(setLinkNodeModal({
      open: false
    }))
  }

  const handleCancel = () => {
    dispatch(setLinkNodeModal({
      open: false
    }))
  }

  useEffect(() => {
    if (linkNodeModal.open && linkNodeModal.type === 'Edit') {
      form.setFieldsValue(linkNodeModal.record || {})
    }
    if (linkNodeModal.open && linkNodeModal.type === 'Add') {
      form.resetFields()
    }
  }, [linkNodeModal, form])

  return <Modal
    title={titleMap[linkNodeModal.type]}
    maskClosable={false}
    open={linkNodeModal.open}
    onOk={handleOk}
    onCancel={handleCancel}
  >
  <Form form={form} {...layout}>
    <Form.Item
      label='boneId'
      name='boneId'
      rules={[{
        required: true,
        message: 'boneId不能为空'
      }]}
    >
      <Select placeholder="请选择boneId" options={[]}></Select>
    </Form.Item>
    <Form.Item
      label='cVlanId'
      name='cVlanId'
      rules={[{
        required: true,
        message: 'cVlanId不能为空'
      }]}
    >
      <Input placeholder="请输入cVlanId" />
    </Form.Item>
    <Form.Item
      label='sVlanId'
      name='sVlanId'
      rules={[{
        required: true,
        message: 'sVlanId不能为空'
      }]}
    >
      <Input placeholder="请输入sVlanId" />
    </Form.Item>
    <Form.Item
      label='eaPermitNumber'
      name='eaPermitNumber'
      rules={[{
        required: true,
        message: 'eaPermitNumber不能为空'
      }]}
    >
      <Input placeholder="请输入eaPermitNumber" />
    </Form.Item>
    <Form.Item
      label='interfaceId'
      name='interfaceId'
      rules={[{
        required: true,
        message: 'interfaceId不能为空'
      }]}
    >
      <Input placeholder="请输入interfaceId" />
    </Form.Item>
    <Form.Item
      label='interfaceSerialNumber'
      name='interfaceSerialNumber'
      rules={[{
        required: true,
        message: 'interfaceSerialNumber不能为空'
      }]}
    >
      <Input placeholder="请输入interfaceSerialNumber" />
    </Form.Item>
    <Form.Item
      label='interfaceType'
      name='interfaceType'
      rules={[{
        required: true,
        message: 'interfaceType不能为空'
      }]}
    >
      <Input placeholder="请输入interfaceType" />
    </Form.Item>
    <Form.Item
      label='peId'
      name='peId'
      rules={[{
        required: true,
        message: 'peId不能为空'
      }]}
    >
      <Input placeholder="请输入peId" />
    </Form.Item>
    <Form.Item
      label='linkType'
      name='linkType'
      rules={[{
        required: true,
        message: 'linkType不能为空'
      }]}
    >
      <Select placeholder='linkType不能为空'>
        <Select.Option value='ce-pe'>ce-pe</Select.Option>
        <Select.Option value='pe-pe'>pe-pe</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      label='ipAddress'
      name={['wanIp', 'ipAddress']}
      rules={[{
        required: true,
        message: 'ipAddress不能为空'
      }]}
    >
      <Input placeholder="请输入ipAddress" />
    </Form.Item>
    <Form.Item
      label='ipType'
      name={['wanIp', 'ipType']}
      rules={[{
        required: true,
        message: 'ipType不能为空'
      }]}
    >
      <Input placeholder="请输入ipType" />
    </Form.Item>
    <Form.Item
      label='portId'
      name={['wanIp', 'portId']}
      rules={[{
        required: true,
        message: 'portId不能为空'
      }]}
    >
      <Input placeholder="请输入portId" />
    </Form.Item>
    <Form.Item
      label='portType'
      name={['wanIp', 'portType']}
      rules={[{
        required: true,
        message: 'portType不能为空'
      }]}
    >
      <Input placeholder="请输入portType" />
    </Form.Item>
    <Form.Item
      label='portTypeId'
      name={['wanIp', 'portTypeId']}
      rules={[{
        required: true,
        message: 'portTypeId不能为空'
      }]}
    >
      <Input placeholder="请输入portTypeId" />
    </Form.Item>
  </Form>
</Modal>
}
export default LinkNodeModal
