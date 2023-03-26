import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

export const Context = React.createContext(null)

export const initialState = {
  customserModal: {
    open: false,
    type: 'Add',
    record: {}
  },
  addressModal: {
    open: false,
    type: 'Add',
    record: {}
  },
  linkNodeModal: {
    open: false,
    type: 'Add',
    record: {}
  },
  linkInfoModal: {
    open: false,
    type: 'Add',
    record: {}
  },
}

export const reduxSlice = createSlice({
  name: 'reduxSlice',
  initialState,
  reducers: {
    setCustomserModal: (state, { payload }) => {
      state.customserModal = payload
    },
    setAddressModal: (state, { payload }) => {
      state.addressModal = payload
    },
    setLinkNodeModal: (state, { payload }) => {
      state.linkNodeModal = payload
    },
    setLinkInfoModal: (state, { payload }) => {
      state.linkInfoModal = payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setCustomserModal, setAddressModal, setLinkNodeModal, setLinkInfoModal } = reduxSlice.actions

// redux-thunk actions
// 拉取是否开通接口
// export const getIsOpen =
//   (query = {}) =>
//   async (dispatch) => {
//     const res = await Apis.getIsOpen(query).catch((err) => {
//       console.log('getIsOpen err', err)
//     })
//     const isOpen = res?.data ?? false
//     dispatch(setIsOpen(isOpen))
//   }

// 数据配置：拉取数据配置列表
// export const getDataTableList = (params) => async (dispatch) => {
//   const res = await Apis.getDataTableList(params).catch((err) => {
//     console.log('getDataTableList err', err)
//     return []
//   })
//   return res?.data
// }

// Reducer
export default reduxSlice.reducer
