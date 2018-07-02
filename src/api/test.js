import request from '@/utils/request'

const testLoginUrl = 'http://192.168.0.214:8080/fwas-security-admin/sys/login'

export function testLogin(params) {
  return request({
    url: testLoginUrl,
    method: 'post',
    data: params
  })
}
