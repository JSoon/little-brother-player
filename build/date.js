/**
 * 获取当前日期
 * 
 * @description 格式：yyyymmdd
 * @author J.Soon <serdeemail@gmail.com>
 */

module.exports = (function () {

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return '' + year + month + day;

}());