export default {
    Gender(val) {
        //性别过滤 0女 1男 没有则未知
        const dataWare = [
            '女', '男'
        ]
        return dataWare[val] ?? '未知';
    }
}
