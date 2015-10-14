<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/taglib.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/view/include/head.jsp" %>
<script type="text/javascript" src="${path}/js/sys/sys.js"></script>
<script type="text/javascript">

var check_ = setInterval("checkLogin()", 5000);

function againLogin(){
		var a_win = Ext.create('Ext.window.Window', {
		    title: '会话已失效，请重新登录',
		    closable:false,
		    height: 150,
		    width: 300,
		    modal:true,
		    resizable:false,
		    layout: 'fit',
		    items:{
				xtype : 'form',
				fieldDefaults : {
					labelAlign : 'right',
					labelWidth : 80,
					width : 260
				},
				defaultType : 'textfield',
				items : [{
					padding:'15 0 0 0',
					xtype: 'textfield',
					fieldLabel: '用户名',
					value:'${CURRENT_USER.username}',
					id:'a_username',
					allowBlank:false
					},{
					xtype: 'textfield',
					inputType: 'password',
					fieldLabel: '密码',
					id:'a_Pwd',
					allowBlank:false
					}]
			},
		buttons:[{
	text:'确认',
	formBind:true,
	disable:true,
	handler:function(){
		var addMask = new Ext.LoadMask(a_win, {
            msg: "正在验证您的身份,请稍候...",
            removeMask: true
        });
		if(a_win.down('form').isValid()){
        addMask.show();
        Ext.Ajax.request({
			    url: 'login.action',
			    params: {
			    	'username':Ext.getCmp('a_username').value,
			        'userpwd':Ext.getCmp('a_Pwd').value
			    },
			    callback: function(options, success, response) {
                addMask.hide();
                if (success) {
                    var data = Ext.decode(response.responseText);
                    if (data.success) {
                    	a_win.close();
                    	check_ = setInterval("checkLogin()", 5000);
                    	//window.location.reload();
                    } else {
                        Ext.Msg.alert("提示信息", data.msg);
                        return;
                    }
                } else {
                    Ext.Msg.alert("提示信息", '系统错误，请联系管理员！');
                    return;
                }
            }
        });
		}
	}
},{
	text:'取消',
	handler:function(){
		a_win.close();
	}
}]
	}).show();
}
	
	function checkLogin(){
		Ext.Ajax.request({
		    url: 'checkSession.action',
		    autoAbort :true,
		    success: function(response) {
	    		//会话失效    进行重新登录检查
	    		var data = Ext.decode(response.responseText);
		    	if(!data.success){
		    		againLogin();
					window.clearInterval(check_);
				}
		    }
		});
	}

</script>
</head>
<body>
	
</body>
</html>