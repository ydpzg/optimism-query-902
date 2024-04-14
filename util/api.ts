import axios from 'axios'
import {isNil, isNull, omitBy} from 'lodash'

// Error
const getError = (data: { code: 1 | 0 | -1 | 401 | 403 | 404 | 500; message: string }) => {
  console.log('getError\n', data)
  // if (data.code === 401) {
  //   localStorage.removeItem('Token')
  // } else {
  //   message.error(data.message)
  // }
  // if (data.code === 403) {
  //   window.location.replace('/403')
  // } else if (data.code === 404) {
  //   window.location.replace('/404')
  // } else if (data.code === 500 || data.code === 1) {
  //   window.location.replace('/500')
  // } else {
  //   window.location.replace('/501')
  // }
}

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'access-control-allow-origin': '*',
    accept: 'application/json',
  },
})

// GET
const getData = async <T>(path: string, params?: any) => {
  const { data } = await instance.get(path, { params: filterParams(params) })
  /*if (data.code !== 0) {
    getError(data)
    return null
  }*/
  return data.data as T
}
const getOriginData = async (path: string, params?: any) => {
  const { data } = await instance.get(path, { params: filterParams(params) })
  /*if (data.code !== 0) {
    getError(data)
    return null
  }*/
  return data
}

// POST
const postData = async <T>(path: string, params?: any) => {
  const { data } = await instance.post(path, filterParams(params))
  if (data.code !== 0) {
    getError(data)
    return null
  }
  return data.data as T
}

const filterParams = (params: any) => {
  return omitBy(params, (value) => {
    return isNil(value) || isNull(value) || value === ''
  })
}
export const getTopGame = async () => {
  return getData(`/top-game`)
}
export const getOptimismWalletStatus = async (wallet: any) => {
  return getData(`/optimism-wallet-status`, { wallet })
}
export const getOptimismWalletToken = async (wallet: any) => {
  return getData(`/optimism-wallet-token`, { wallet })
}
