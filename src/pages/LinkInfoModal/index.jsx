import React, { useContext, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
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
 */
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const titleMap = {
  Add: '添加链接信息',
  Edit: '编辑链接信息'
}
const LinkInfoModal = () => {
  const { state, dispatch } = useContext(Context)
  const [form] = Form.useForm()
  const {
    linkInfoModal
  } = state

  const handleOk = async () => {
    const value = await form.validateFields()
    console.log(value)
    dispatch(setLinkInfoModal({
      open: false
    }))
  }

  const handleCancel = () => {
    dispatch(setLinkInfoModal({
      open: false
    }))
  }

  useEffect(() => {
    if (linkInfoModal.open && linkInfoModal.type === 'Edit') {
      form.setFieldsValue(linkInfoModal.record || {})
    }
    if (linkInfoModal.open && linkInfoModal.type === 'Add') {
      form.resetFields()
    }
  }, [linkInfoModal, form])

  return <Modal
    title={titleMap[linkInfoModal.type]}
    maskClosable={false}
    open={linkInfoModal.open}
    onOk={handleOk}
    onCancel={handleCancel}
  >
  <Form form={form} {...layout}>
    <Form.Item
      label='带宽大小'
      name='bandwidth'
      rules={[{
        required: true,
        message: '带宽大小不能为空'
      }]}
    >
      <Input placeholder="请输入带宽大小" />
    </Form.Item>
    <Form.Item
      label='带宽单位'
      name='bandwidthUnit'
      rules={[{
        required: true,
        message: '带宽单位不能为空'
      }]}
    >
      <Input placeholder="请输入带宽单位" />
    </Form.Item>
    <Form.Item
      label='购买人'
      name='buyerId'
      rules={[{
        required: true,
        message: '购买人不能为空'
      }]}
    >
      <Input placeholder="请输入购买人" />
    </Form.Item>
    <Form.Item
      label='底层链路提供商'
      name={['linkServiceProvider', 'linkServiceProviderName']}
      rules={[{
        required: true,
        message: '底层链路提供商不能为空'
      }]}
    >
      <Select placeholder="请输入底层链路提供商">
        <Select.Option value='CTG'>CTG</Select.Option>
        <Select.Option value='CUG'>CUG</Select.Option>
        <Select.Option value='CMI'>CMI</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      label='链路类型'
      name={['linkServiceProvider', 'linkServiceProviderType']}
      rules={[{
        required: true,
        message: '链路类型'
      }]}
    >
      <Input placeholder="请输入链路类型" />
    </Form.Item>
    <Form.Item
      label='服务提供商'
      name='sellerId'
      rules={[{
        required: true,
        message: '服务提供商不能为空'
      }]}
    >
      <Input placeholder="请输入服务提供商" />
    </Form.Item>
    <Form.Item
      label='链接状态'
      name='linkState'
      rules={[{
        required: true,
        message: '链接状态不能为空'
      }]}
    >
      <Select placeholder="请输入链接状态">
        <Select.Option value='0'>正常开通</Select.Option>
        <Select.Option value='-1'>关闭</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item
      label='orderActivity'
      name='orderActivity'
      rules={[{
        required: true,
        message: 'orderActivity不能为空'
      }]}
    >
      <Input placeholder="请输入orderActivity" />
    </Form.Item>
    <Form.Item
      label='productOffering'
      name='sellerId'
      rules={[{
        required: true,
        message: 'productOffering不能为空'
      }]}
    >
      <Input placeholder="请输入productOffering" />
    </Form.Item>
  </Form>
</Modal>
}
export default LinkInfoModal
