const urls = {
  dev: {
    baseURL: 'http://192.168.31.79:8081',
    imgURL: 'http://test.vpf.cdn.elementwin.com'
  },
  alpha: {
    baseURL: 'http://api-ops.vpf.elementwin.com',
    imgURL: 'http://test.vpf.cdn.elementwin.com'
  },
  release: {
    baseURL: 'http://api.ops.t-vpf.elementwin.com',
    imgURL: 'http://test.vpf.cdn.elementwin.com'
  }
}
export default {
  ...urls[process.env.mode]
}
