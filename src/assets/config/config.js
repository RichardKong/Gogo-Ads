import axios from 'axios';

const config = {
    baseURL: 'https://my7e1b4mje.execute-api.us-east-1.amazonaws.com/gogoads',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
};

const api = axios.create(config);

// 默认 post 请求，使用 application/json 形式
api.defaults.headers.post['Content-Type'] = 'application/json';

api.post = function(url,params){
    return new Promise((resolve, reject) => {
        // console.log("****************************");
        axios({
            method: 'post',
            url:config.baseURL,
            params,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).then(response => {
            if (response.status == 200) {
                //根据实际情况进行更改
                resolve(response)
            } else {
                reject(response)
            }
        })
    })
}

export default api
