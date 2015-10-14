/**
 * 密码是否一致验证
 */
Ext.apply(Ext.form.field.VTypes, {
	  checkPwd : function(value,field) {//验证方法名
	  			var flag = false;
	  			if(field.targetPwdId){
	  				var id = Ext.getCmp(field.targetPwdId).getValue();
	  				if(value === id){
	  					flag = true;
	  				}else{
	  					flag = false;
	  				}
	  			}
					return flag;
	   		},
	   	checkPwdText : '两次输入的密码不一致'
});

Ext.define('SYS.controller.SysController',{
	extend:'Ext.app.Controller',
	views: ['main.SysMain','main.SysCenter','main.SysTreeMenu','main.SysLeftTree'],
	stores:['LeftTreeStore'],
	store : function(){
		return this.getLeftTreeStoreStore();
	},
	refs:[{
		ref:'SysTreeMenu',
		selector:'sysTreeMenu'
	},{
		ref:'SysLeftTree',
		selector:'sysLeftTree'
	},{
		ref:'sysCenter',
		selector:'sysCenter'
	}],
	init:function(){
		this.control({
			'sysCenter button[action=reset]':{
				click:function(){
					Ext.getCmp('s_name').reset();
				}
			},
			'sysCenter > toolbar #comboboxBtn':{
				change:function(field,newValue,oldValue){//设置每页显示
					var store = this.store();
					store.pageSize = newValue;
					store.on('beforeload',function(store,options){
						var new_params = {'limit':newValue};
						Ext.apply(store.proxy.extraParams,new_params);
					});
					store.loadPage(1);
				}
			},
			'#id_u':{
				click:function(){
					top.location = 'quit.action'
				}
			},
			'#id_changepwd':{
				click:function(){
			var pwdWin =Ext.create('Ext.window.Window', {
					    title: '修改密码',
					    modal: true,
					    height: 180,
					    width: 300,
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
								inputType: 'password',
								fieldLabel: '原密码',
								id:'oldPwd',
								allowBlank:false
								},{
								xtype: 'textfield',
								inputType: 'password',
								fieldLabel: '新密码',
								id:'newPwd',
								allowBlank:false
								},{
								xtype: 'textfield',
								inputType: 'password',
								fieldLabel: '确认新密码',
								id:'newPwd2',
								vtype:'checkPwd',
								validateOnChange:false,
								targetPwdId:'newPwd',
								allowBlank:false
							}]
						},
					buttons:[{
			    	text:'保存',
			    	formBind:true,
			    	disable:true,
			    	handler:function(){
	                    Ext.Ajax.request({
						    url: 'user!changePwd.action',
						    params: {
						        'oldPwd':Ext.getCmp('oldPwd').value,
						        'newPwd':Ext.getCmp('newPwd').value
						    },
						    success: function(response){
						        var data = Ext.decode(response.responseText);
						        if(data.success){
						        	Ext.Msg.alert('提示',data.msg);
						        	pwdWin.close();
						        }else{
						        	Ext.Msg.alert('提示',data.msg);
						        	//pwdWin.close();
						        }
						    }
						});
			    	}
			    },{
			    	text:'取消',
			    	handler:function(){
			    		pwdWin.close();
			    	}
			    }]
					}).show();
				}
			}
		});
	}
});