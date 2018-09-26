const client_id = 'web';
const client_secret = 'web-password';
const grant_type = 'kuma_user';
const login_system = 'FUM'; // KUS
const tokoenSecret = 'hello'; // todo 公钥加密？
// const publicKey = "-----BEGIN RSA PUBLIC KEY-----
// MIIBCgKCAQEA4vWL4Zner6hLbO7Mz31xeEXHLP+WoZazSgWMAy42Yr9OFwZ5b36s
// CzfFcZYUnBeZlKWib2aAYAo7/p4HvHm8OXpRuneFQz/2qAaH/CWxsrj4xDa9lCI2
// u2LMMipVH46npMRRvZ4pVeIH9fHIa8/O+5G9Q94yy0nxgMIuF8GgEtEByZrh30So
// eOr1qf/nEfe3+cSFNEF6rbIUKzFNjHd5EmmXs+7RRqPMahMyPaIhLDvLCQ7jK6qx
// Lg6uXPu2FhnwXZniqrokJ27gbIsJJN2APNDy2CArrL1KYW1/ufaC9jGMFkgPDUs/
// jRxSUOTSOuGpsKMefgJBPf6bZbmTvl2OjwIDAQAB
// -----END RSA PUBLIC KEY-----"
// const publicKey = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDi9Yvhmd6vqEts7szPfXF4Rccs/5ahlrNKBYwDLjZiv04XBnlvfqwLN8VxlhScF5mUpaJvZoBgCjv+nge8ebw5elG6d4VDP/aoBof8JbGyuPjENr2UIja7YswyKlUfjqekxFG9nilV4gf18chrz877kb1D3jLLSfGAwi4XwaAS0QHJmuHfRKh46vWp/+cR97f5xIU0QXqtshQrMU2Md3kSaZez7tFGo8xqEzI9oiEsO8sJDuMrqrEuDq5c+7YWGfBdmeKquiQnbuBsiwkk3YA80PLYICusvUphbX+59oL2MYwWSA8NSz+NHFJQ5NI64amwox5+AkE9/ptluZO+XY6P kuma@focusmedia.cn'
// const tokenObj = '{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9zeXN0ZW0iOiJGVU0iLCJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTUzNzg2NTc5OCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImJlOWU0OWIwLTMwNTUtNDYwYy04ZDQ0LTIxYmI1M2MwZTEwYSIsImNsaWVudF9pZCI6IndlYiJ9.oY8mi8ekIdC6CBWj_BHfgvJtDIbK39O8Wanqmo1eCofGjI86dGtGFG2WsYPlbByM_0hMQzLOLE3OFUJDJjmzTsd8CxHlyhNmgftiHAhwNrg8b2f15AB20x0kwUZkh2jC-izh2RIqQfBSQMVpJEGUUE9p8oACVm5ofmBydma7H8QjpNvvO35PRqDL64NPZ1US4e2AcnUQdxJIm235ytC41b6DO2CtQyuBPzsPtYuv0xgsJYdSPWBZCbbAzOAs5Xb0vAfzZ2ZEaEjNeK_P-Oa98wj-0qv2wVDTs7wzBecIV7vu2L3qe91uazNOrrHeLP1X7WLrcEWaTwqmOe2ZuX5KTQ","token_type":"bearer","refresh_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9zeXN0ZW0iOiJGVU0iLCJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsiYWxsIl0sImF0aSI6ImJlOWU0OWIwLTMwNTUtNDYwYy04ZDQ0LTIxYmI1M2MwZTEwYSIsImV4cCI6MTUzNzg2NTc5OCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjEyZWM3ODkzLWY1MGQtNDU4ZC05NWQ3LTM2OWY0MDgxMmMxYiIsImNsaWVudF9pZCI6IndlYiJ9.RX3ky1MUFpVcFLaeNCpX1_vHwwYsV7xOCwUJerqh8udiXr_as7RpcGikgxuOg_ypu9ukHAkQAGaTXYnFUgJ7ZaWialiDveCPuBCAsYjM7omKBx5D3P_lrxU6fEGzNwoQjrSbauwWmc96HWYEqEuK6Pp7Zs1MXQA0R_0t7pt3FX94wSPZLevKXzEIMrmB1MyNvu17enVeG2q8CDdKfTNstj6inB5PIk6Yhce5CFTQasywSkSEwVj6SPa5QSqX-Ht6OuB8iPtOYM9BKK-X-auDnx_3SbhPf2rCoCJuisNeByr5t5jzGNt57-nakOcGx0lW9Tgoym3YG8uIamwsS8lu4Q","expires_in":1799,"scope":"all","jti":"be9e49b0-3055-460c-8d44-21bb53c0e10a"}'

module.exports = {
    client_id,
    client_secret,
    grant_type,
    login_system,
    tokoenSecret,
    // publicKey,
    // tokenObj
}