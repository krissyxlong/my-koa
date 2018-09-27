# 接口文档
> 
## 登录、注册、商户信息
### 1、登录接口
 * api: /login
 * 入参：
    ```
    username: 用户名
    password: 密码
    ```
 * method: POST
 * 返回：
    >  ```
    > {
    >     "access_token":"access_token", // 其他请求需带上该 token 值
    >     "token_type":"bearer",
    >     "refresh_token":"ejk3KGfsEW",
    >     "expires_in":43199,
    >     "scope":"all",
    >     "jti":"cf9a01fb-2be7-44c9-b47d-263706800930"
    > }
    >  ```
 * 注意
    >  其他接口必需加上 Authorization 请求头，value 格式为：Bearer ${access_token}
    
## 点位信息
### 1、城市列表接口
 * api: /fso/city
  * 入参：
     ```
     参数	  参数类型	参数说明	              是否必填
     cityName  string	城市名称 (不填 搜全部)	否
     page	  int	        页码 (默认1)	        否
     rows	  int	        每页条数 (默认10)	否
     sort	  boolean	排序 (默认 false)	否
     ```
  * method: POST
  * 返回示例：
      ```
     [
         {
             "name": "安徽",
             "pinyin": "anhui",
             "pid": 1,
             "no": "0001.0002",
             "id": 2,
             "type": 1,
             "level": 1
         }
     ]
      ```
  * 返回参数说明
     ```
      参数	  参数类型  参数说明	       是否必填
      cityName string   城市名称 (不填 搜全部)	否
      page	  int	   页码 (默认1)	        否
      rows	  int	   每页条数 (默认10)	否
      sort	  boolean  排序 (默认 false)	否
    ```

### 2、区域列表接口
  * api: /fso/area
  * 入参：
     ```
     参数	 参数类型  参数说明	是否必填
     cityName string   城市名称	是
     ```
  * method: POST
  * 返回示例：
      ```
     [
         {
             "name": "昌平区",
             "no": "0001.0003.0035.0284",
             "pinyin": "changpingqu",
             "level": 3,
             "pid": 35,
             "type": 3,
             "id": 284
         }
     ]
      ```
  * 返回参数说明
     ```
      参数	参数类型	参数说明
      name	String	地区名称
      pinyin	String	拼音
      pid	int	上级id
      no	string	地区编号
      id	int	地区ID
      type	int	类型
      level	int	层级
     ```