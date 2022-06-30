document.write('<script src="/ait/js/cityData.js"><\/script>');
// --身份证号码验证-支持新的带x身份证
function isIdCardNo(num) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4,
        2, 1);
    var error;
    var varArray = new Array();
    var intValue;
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        // error = "输入身份证号码长度不对！";
        // alert(error);
        // frmAddUser.txtIDCard.focus();
        // frmAddUser.txtIDCard.focus();
        return false;
    }
    // check and set value
    for (i = 0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            // error = "错误的身份证号码！.";
            // alert(error);
            // frmAddUser.txtIDCard.focus();
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        // check date
        var date8 = idNumber.substring(6, 14);
        if (isDate8(date8) == false) {
            // error = "身份证中日期信息不正确！.";
            // alert(error);
            return false;
        }
        // calculate the sum of the products
        for (i = 0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = 12 - lngProduct % 11;
        switch (intCheckDigit) {
            case 10:
                intCheckDigit = 'X';
                break;
            case 11:
                intCheckDigit = 0;
                break;
            case 12:
                intCheckDigit = 1;
                break;
        }
        // check last digit
        if (varArray[17].toUpperCase() != intCheckDigit) {
            // error = "身份证效验位错误!...正确为： " + intCheckDigit + ".";
            // alert(error);
            return false;
        }
    }
    else { // length is 15
        // check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {
            // alert("身份证日期信息有误！.");
            return false;
        }
    }
    // alert ("Correct.");
    return true;
}
function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = 19 + sDate.substring(0, 2);
    month = sDate.substring(2, 4);
    day = sDate.substring(4, 6);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500)
        return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
        iaMonthDays[1] = 29;
    if (month < 1 || month > 12)
        return false
    if (day < 1 || day > iaMonthDays[month - 1])
        return false
    return true
}
function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (year < 1700 || year > 2500)
        return false
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
        iaMonthDays[1] = 29;
    if (month < 1 || month > 12)
        return false
    if (day < 1 || day > iaMonthDays[month - 1])
        return false
    return true
}

function getIdentityInfo(idCard){
    let birthday ="";
    let sex  = 0;
    let cityData  = "";
    if(idCard.length===15)
    {
        birthday='19' + idCard.substring(6,8) + '-' + idCard.substring(8,10) + '-' + idCard.substring(10,12);
        sex = (idCard[14]%2 === 0)?'1':'0';
    }
    else{
        birthday=idCard.substring(6,10) + '-' + idCard.substring(10,12) + '-' + idCard.substring(12,14);
        sex = (idCard[16]%2 === 0)?'1':'0';
    }
    var dataNum = mySite.cityData.length;
    for (var i = 0; i < dataNum; i++) {
        if(idCard.substring(0,3) + '000'== mySite.cityData[i].code){
            cityData = mySite.cityData[i].code
        }
    }
    return {"birthday":birthday, "sex":sex, "cityData":cityData};
}

function getAge(str){
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
    if(r==null)return   false;

    var d= new Date(r[1],r[3]-1,r[4]);
    var returnStr = "输入的日期格式错误！";

    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){

        var date = new Date();
        var yearNow = date.getFullYear();
        var monthNow = date.getMonth() + 1;
        var dayNow = date.getDate();

        var largeMonths = [1,3,5,7,8,10,12], //大月， 用于计算天，只在年月都为零时，天数有效
            lastMonth = monthNow -1>0?monthNow-1:12,  // 上一个月的月份
            isLeapYear = false, // 是否是闰年
            daysOFMonth = 0;    // 当前日期的上一个月多少天

        if((yearNow%4===0&&yearNow%100!==0)||yearNow%400===0){  // 是否闰年， 用于计算天，只在年月都为零时，天数有效
            isLeapYear = true;
        }

        if(largeMonths.indexOf(lastMonth)>-1){
            daysOFMonth = 31;
        }else if(lastMonth===2){
            if(isLeapYear){
                daysOFMonth = 29;
            }else{
                daysOFMonth = 28;
            }
        }else{
            daysOFMonth = 30;
        }

        var Y = yearNow - parseInt(r[1]);
        var M = monthNow - parseInt(r[3]);
        var D = dayNow - parseInt(r[4]);
        if(D < 0){
            D = D + daysOFMonth; //借一个月
            M--;
        }
        if(M<0){  // 借一年 12个月
            Y--;
            M = M + 12; //
        }

        if(Y<0){
            returnStr = "出生日期有误！";

        }else if(Y===0){
            if(M===0){
                returnStr = D+"天";
            }else{
                returnStr = M+"月";
            }
        }else{
            if(M===0){
                returnStr = Y+"岁";
            }else{
                returnStr = Y+"岁"+M+"月";
            }
        }

    }

    return returnStr;
}