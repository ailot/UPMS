//定义验证码控件
Ext.define('CheckCode',{
	extend:'Ext.form.field.Text',
	alias:'widget.checkcode',
	codeUrl:Ext.BLANK_IMAGE_URL,
	isLoad:true,
	onRender:function(ct,position){
		this.callParent(arguments);
		this.codeEl = ct.createChild({tag:'img',src:Ext.BLANK_IMAGE_URL});
		this.codeEl.addCls('x-form-code');
		this.codeEl.on('click',this.loadCodeImg,this);
		if(this.isLoad){
			this.loadCodeImg();
		}
	},
	alignErrorIcon:function(){
		this.errorIcon.alignTo(this.codeEl,'tl-tr',[2,0]);
	},
	//如果浏览器发现url不变，就认为图片没有改变，就会使用缓存中的图片，而不是重新向服务器请求，所以需要加一个参数，改变url 
	loadCodeImg:function(){
		this.codeEl.set({src:this.codeUrl + '?id=' + Math.random()});
	}
});

$(function(){
	Ext.onDocumentReady(function(){
	var loginPanel = Ext.create('Ext.tab.Panel',{
			id : 'loginTabs',
			maxHeight:174,
			items : [{
				title : '用户登录',
				xtype : 'form',
				id : 'loginForm',
				defaults : {
					width : 260,
					height: 25
				},
				padding:'20 0 0 50',
				defaultType : 'textfield',
				items : [{
							fieldLabel : '登录名',
							labelWidth : 60,
							name : 'username',
							id : 'username',
							cls : 'user',
							value:'admin',
							blankText : '用户名不能为空,请输入!',
							maxLength : 30,
							maxLengthText : '用户名的最大长度为30个字符',
							allowBlank : false
						}, {
							fieldLabel : '密&nbsp;&nbsp;码',
							labelWidth : 60,
							name : 'userpwd',
							id : 'userpwd',
							cls : 'key',
							value:'1',
							inputType : 'password',
							blankText : '密码不能为空,请输入!',
							maxLength : 20,
							maxLengthText : '密码的最大长度为20个字符',
							allowBlank : false
						},{
							xtype:'checkcode',
							id:'checkCode',
							name:'checkCode',
							fieldLabel : '验证码',
							labelWidth : 60,
							width:180,
							cls : 'vcode',
							value:'123',
							maxLength: 4,
              				maxLengthText: '验证码最大长度为4个字符',
							blankText : '验证码不能为空,请输入!',
							allowBlank : false,
							codeUrl:'servlet/validateCodeServlet',
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										login();
									}
								}
							}
						}]
			}]
	});
	
	var loginWin = Ext.create('Ext.window.Window', {
		autoShow:true,
		title:'<h2 style="margin: 20px 0 10px 0;font-size:22px;">通用权限管理系统</h2>',
		layout : 'fit',
		width : 420,
		height : 260,
		plain : true,
		modal : true,
		draggable : false,
		closable : false,
		resizable : false,
		buttons : [{
			text : '&nbsp;登录',
			id:'btntrtestbaseall',
			iconCls : 'acceptIcon',
			handler : function() {
					login();
			} 
		},{
			text : '&nbsp;重置',
			iconCls : 'resetIcon',
			handler : function() {
				Ext.getCmp('username').reset();
				Ext.getCmp('userpwd').reset();
				Ext.getCmp('checkCode').reset();
			}
		}],
		items : [
			loginPanel
		]
	});
	
	/*检查浏览器*/
		if(!Ext.isChrome){
			Ext.Msg.alert('温馨提示',
			'系统检测到您浏览器版本过低，我们强烈建议您立即切换到<b><a href="http://www.google.cn/intl/zh-CN/chrome/browser/" target="_blank">GoogleChrome</a></b>浏览器，体验飞一般的感觉！'
			);
		}else{
			loginWin.show();
		}
		
		/**
	 * 提交登陆请求
	 */
   function login() {
        if (Ext.getCmp('loginForm').form.isValid()) {
            /*if (!checkImg()) {
                return false;
            }*/
            var addMask = new Ext.LoadMask(loginWin, {
                msg: "正在验证您的身份,请稍候...",
                removeMask: true
            });
            addMask.show();
            Ext.Ajax.request({
                method: 'POST',
                url: 'login.action',
                params: {
                   'username': Ext.getCmp('username').value,
                   'userpwd': Ext.getCmp('userpwd').value
                },
                callback: function(options, success, response) {
                    addMask.hide();
                    var info = Ext.decode(response.responseText);
                    /*console.log(info);
                    console.log(success);*/
                    if (success) {
                        if (info.success) {
                            window.location.href = 'main.action';
                        } else {
                            Ext.Msg.alert("提示信息", info.msg);
                            return;
                        }
                    } else {
                        Ext.Msg.alert("提示信息","系统错误，请联系管理员！");
                        return;
                    }
                }
            });
		}
	}
	//验证码检测
	var checkImg = function checkImg(){
	var checkYzm = false;
	Ext.Ajax.request({
		async:false,
		method : 'GET',
		url : 'servlet/validateCodeServlet',
		params:{
			validateCode:Ext.getCmp('checkCode').value
		},
		callback: function (options, success, response) {
			var msg = Ext.decode(response.responseText);
			if(msg){
				checkYzm=msg;
			}else{
				Ext.MessageBox.alert('提示','验证码输入错误！');
				return ;
			}
		}
	});
	return checkYzm;
	}
})
})