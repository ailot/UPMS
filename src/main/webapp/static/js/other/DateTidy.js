/********************************************************************/
/*
    dateTidy: 将用户输入的时间字符串进行整理.带有自动完成和实时验证功能
    实现思想:
    1.将用户输入的字符串第一轮过滤得到纯数字字串
    2.获取年份,字符串前4位 最小值1900,最大值2099
    3.获取月份,字符串5至6位 最小值01 最大值12 .第五位字符大于3.自动转换为0开头的日期
    4.获取日期,字符串7至8位 最小值01 最大值当月最大日期
*/
/********************************************************************/
function dateTidy(rawValue){
    var year = '',mounth = '',day = '',myValue = '';
    var dateArray = new Array();

    for (var i = 0; i < rawValue.length; i++) {
        myValue += isNaN(rawValue.charAt(i))?'':rawValue.charAt(i);
    }
    var len = myValue.length;

    // get year 
    myValue = myValue.substring(0,8);
    year = (len >= 4)?myValue.substring(0,4):myValue;
    if(year.length>=4 && year < '1900'){
        year = '1900';
    }else if(year.length>=4 && year > '2099'){
        year = '2099';
    }
    dateArray.push(year);
    // get mounth
    if(len >= 5){
        mounth = myValue.substring(4,6);
        if(mounth.charAt(0) >= '2'){
            mounth = '0'+mounth.charAt(0);
        }else if(mounth.length>=2 && mounth > '12'){
            mounth = '12';
        }else if(mounth.length>=2 && mounth < '01'){
            mounth = '01';
        }
        dateArray.push(mounth);
    }
    // get day
    if(len >= 7){
        day = myValue.substring(6,9);
        var nMonth = parseInt(mounth,10)+1;
        var temp = new Date(year+"/"+nMonth+"/0");
        var strDay = ""; 
        strDay += temp.getDate();

        if(day.charAt(0) > strDay.charAt(0)){
            day = '0'+day.charAt(0);
        }else if(day.length>=2 && day > strDay){
            day = strDay;
        }else if(day.length>=2 && day < '01'){
            day = '01';
        }
        dateArray.push(day);
    }

    return dateArray.join('-');
}

function SubDay(){
		var start = Ext.getCmp('starttime').value;
		var end = Ext.getCmp('endtime').value;
		var sub = Math.floor((end-start)/(24*3600*1000));
		if(sub<0){
			Ext.Msg.alert('提示','结束时间不能大于开始时间！');
			return;
		}
		Ext.getCmp('qjdays').setValue(sub);
	}

