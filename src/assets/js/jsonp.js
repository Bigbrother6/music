// jsonp封装(用promise实现封装)
import originJsonp from 'jsonp'
 
// data对象转化为字符串后拼接到url后面去
export default function jsonp(url,data,option){
	  url+=(url.indexOf('?')<0 ? '?': '&')+query(data);
	console.log(url);
	// Promise()回调函数，类似于callback，三种状态：pending(进行中)/resolve(已完成)/reject(已失败)
	return new Promise((resolve,reject)=>{
		originJsonp(url,option,(err,data)=>{
			if (!err) {
				resolve(data)
			}else{
				reject(err)
			}
		})
	})
}

// 将data转换为json格式
function query(data){
	var queryStr='';
	for(var [key,value] of Object.entries(data)){
		queryStr+=`&${key}=${value}`;
	}
	return queryStr?queryStr.substring(1):'';
}