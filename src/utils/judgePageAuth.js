/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-05-18 16:19:30
 * @LastEditTime: 2020-05-18 16:45:22
 */

// 判断页面权限
const judgePageAuth = (pagePermissions) => {
    const pageAuth = JSON.parse(localStorage.getItem('pageAuth'));
    if (pageAuth.indexOf(pagePermissions) !== -1) {
        return true;
    }
    return false;
};

export default judgePageAuth;