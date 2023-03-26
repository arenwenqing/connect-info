import React, { useContext, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { Context, setCustomserModal } from '../../store'
import './index.scss'

/**
 * 
 * "brNumber": "41263205", // 公司营业执照号
        "companyName": "测试跨境1", // 公司名称
        "contactEmail": "7410@qq.com", // 联系email
        "contactPhone": "741264184", // 联系电话
        "customerName": "aa", // 联系人姓名
        "endCustomerId": "4e4b5e272fac404eaa16771cd9fb4772" // 用户ID，后台生成
 */
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
}
const titleMap = {
  Add: '添加用户',
  Edit: '编辑用户'
}
const CustomerModal = () => {
  const { state, dispatch } = useContext(Context)
  const [form] = Form.useForm()
  const {
    customserModal
  } = state

  const handleOk = async () => {
    const value = await form.validateFields()
    console.log(value)
    dispatch(setCustomserModal({
      open: false
    }))
  }

  const handleCancel = () => {
    dispatch(setCustomserModal({
      open: false
    }))
  }

  useEffect(() => {
    if (customserModal.open && customserModal.type === 'Edit') {
      form.setFieldsValue(customserModal.record || {})
    }
    if (customserModal.open && customserModal.type === 'Add') {
      form.resetFields()
    }
  }, [customserModal, form])

  return <Modal
    title={titleMap[customserModal.type]}
    maskClosable={false}
    open={customserModal.open}
    onOk={handleOk}
    onCancel={handleCancel}
  >
  <Form form={form} {...layout}>
    <Form.Item
      label='公司名称'
      name='companyName'
      rules={[{
        required: true,
        message: '公司名称不能为空'
      }]}
    >
      <Input placeholder="请输入公司名称" />
    </Form.Item>
    <Form.Item
      label='营业执照号'
      name='brNumber'
      rules={[{
        required: true,
        message: '公司营业执照号不能为空'
      }]}
    >
      <Input placeholder="请输入公司营业执照号" />
    </Form.Item>
    <Form.Item
      label='联系人姓名'
      name='customerName'
      rules={[{
        required: true,
        message: '联系人姓名不能为空'
      }]}
    >
      <Input placeholder="请输入联系人姓名" />
    </Form.Item>
    <Form.Item
      label='联系电话'
      name='contactPhone'
      rules={[{
        required: true,
        message: '联系电话不能为空'
      }]}
    >
      <Input placeholder="请输入联系电话" />
    </Form.Item>
    <Form.Item
      label='邮箱'
      name='contactEmail'
      rules={[{
        required: true,
        message: '公司名称邮箱'
      }]}
    >
      <Input placeholder="请输入公司名称邮箱" />
    </Form.Item>
    <Form.Item
      label='地址'
      name='address'
      rules={[{
        required: true,
        message: '地址不能为空'
      }]}
    >
      <Input.TextArea rows={4} placeholder="请输入地址"  maxLength={6} />
    </Form.Item>
  </Form>
</Modal>
}
export default CustomerModal
