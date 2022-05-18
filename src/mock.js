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
            "useravatar":'https://tms.haoyunll.cn/fileapi/UploadFiles/Files/88369/20220412/1bfe85a2-8019-469c-9582-0727dad43202.png',
            "username": "admin",
            "mobile": "123",
            "email": "123@qq.com",
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM",
            "routerList":  [
                {
                    "id": 110,
                    "name": "Business",
                    'meta': {'title': '业务中心'},
                    "children": [
                        {
                            "id": 111,
                            "name": "appoint",
                            "path": "appoint",
                            'component':'appoint/AppointCar',
                            "children": [],
                            'meta': {'title': '短驳派车管理'},
                        }
                    ],
                },
                {
                    "id": 120,
                    "name": "SYS",
                    'meta': {'title': '系统管理'},
                    "children": [
                        {
                            "id": 121,
                            "name": "user",
                            "path": "user",
                            'component':'sys/UserIndex',
                            "children": [],
                            'meta': {'title': '用户管理'},
                        },
                        {
                            "id": 122,
                            "name": "role",
                            "path": "role",
                            'component':'sys/RoleIndex',
                            "children": [],
                            'meta': {'title': '角色管理'},
                        },
                        {
                            "id": 123,
                            "name": "menus",
                            "path": "menus",
                            'component':'sys/MenusIndex',
                            "children": [],
                            'meta': {'title': '菜单管理'},
                        }
                    ]
                },
                {
                    "id": 130,
                    "name": "Tools",
                    'meta': {'title': '系统工具'},
                    "children": [
                        {
                            "id": 131,
                            "name": "dict",
                            "path": "dict",
                            'component':'tools/DictIndex',
                            'meta': {'title': '数字字典'},
                            "children": [],

                        },
                    ]
                }
            ]
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

