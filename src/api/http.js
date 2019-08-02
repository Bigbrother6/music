/**
 * 请求工具封装
 */
import axios from 'axios'
import qs from 'qs'

//let apiBaseUrl = process.env.BASE_API;
// var service=axios.create({
//     baseURL:apiBaseUrl,
//     //withCredentials:true,
//     timeout:15000
// })
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = false
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.params = {};
// 添加请求拦截器
axios.interceptors.request.use(config => {
	console.log(config);
	// 在发送请求之前做些什么
	return config;
}, function(error) {
	console.log(error);
	// 对请求错误做些什么
    console.log("对请求错误做些什么")
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        //响应成功 // 对响应数据做点什么
        console.log("状态码"+response.status);
        return response.data
    },
    function(error) {
        // 对响应错误做点什么
        //获取状态码
        console.log(error.response.status)
	    return Promise.reject(error);
});


export default{
    //get请求
    get(url,param){
        return new Promise((resolve,reject)=>{
            axios({
                method:'get',
                url:url,
                params:param,
            }).then(res=>{
                resolve(res);
            }).catch(err=>{
                console.log(err,'异常')
            })

        })
    },
    //post请求
    post(url,param){
        return new Promise((resolve,reject)=>{
            axios({
                method:'post',
                url:url,
                data:qs.stringify(param),
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                console.log(err,'异常')
            })
        })
    }
}




