/** 需要取消请求的token */
import axios from '@/libs/api.request.js'
class AxiosToken {
    constructor (axios) {
        this.axios = axios
        this.tokenArr = []
    }
    // 系统只会创建一个AxiosToken
    static getInstance () {
        if(!AxiosToken.instance) {
            AxiosToken.instance = new AxiosToken(axios)
        }
        return AxiosToken.instance
    }

    // 添加一个token
    static addToken () {
        var source = axios.CancelToken.source();
        this.tokenArr.push(source)
        return source
    }
    // 取消所有token对应的请求
    static cancelRequest () {
        this.tokenArr.forEach((ele, index) => {
            ele.cancel()
            delete this.tokenArr[index]
        })
    }    
}
export default AxiosToken