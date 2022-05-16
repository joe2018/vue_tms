const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    meta:{
        status:200,
        msg:'操作成功',
    },
    data:null
}

Mock.mock('/captcha','get',()=>{
    Result.data = {
        captchaImg : Random.dataImage('120x40','p7wy5')
    }
    return Result
})


Mock.mock('/login','post',(option)=>{
    const data = option.body.split('&')
    let username = data[0].split("=")[1];
    let password =data[1].split("=")[1];
    let code =data[2].split("=")[1];
    if (username === 'admin' && password === '123456' && code === 'p7wy5' ){
        Result.data= {
            "id": 500,
            "rid": 0,
            "username": "admin",
            "mobile": "123",
            "email": "123@qq.com",
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
        }
        Result.meta.msg = '登录成功'
        Result.meta.status = 200
        return Result
    } else {
        Result.meta.msg = '用户名或密码错误！'
        Result.meta.status = 500
        Result.data = null
        return Result
    }
})

Mock.mock('/sys/userinfo','get', ()=>{
    Result.data = {
        user_id:1001,
        user_avatar:'https://tms.haoyunll.cn/fileapi/UploadFiles/Files/88369/20220412/1bfe85a2-8019-469c-9582-0727dad43202.png',
        user_name:'wsh'
    }
    Result.meta.msg = '成功'
    Result.meta.status = 200
    return Result
})



Mock.mock('/menus','get',()=>{
    Result.data = [
        {
            "id": 110,
            "authName": "业务中心",
            "path": "business",
            "children": [
            {
                "id": 111,
                "authName": "短驳派车管理",
                "path": "appoint",
                "children": [],
                'order': null
            }
        ],
            'order': 1
        },
    {
        "id": 120,
        "authName": "系统管理",
        "path": "sys",
        "children": [
            {
                "id": 121,
                "authName": "用户管理",
                "path": "user",
                "children": [],
                'order': null
            },
            {
                "id": 122,
                "authName": "角色管理",
                "path": "role",
                "children": [],
                'order': null
            },
            {
                "id": 123,
                "authName": "菜单管理",
                "path": "menus",
                "children": [],
                'order': null
            }
        ],
        'order': 2
    },
        {
            "id": 130,
            "authName": "系统工具",
            "path": "tools",
            "children": [
                {
                    "id": 131,
                    "authName": "数字字典",
                    "path": "dict",
                    "children": [],
                    'order': null
                },
            ],
            'order': 3
        }

]
    Result.meta.msg = '成功'
    Result.meta.status = 200
    return Result
})

