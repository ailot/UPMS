/**
 * 登录名重复验证
 */
Ext.apply(Ext.form.field.VTypes, {
				  checkName : function(value,field) {//验证方法名
				  			var flag = false;
				  			var id = null;
				  			if(field.checkName){
				  				id = Ext.getCmp(field.checkName.targetComId).getValue();
				  			}
				  			Ext.Ajax.request({
								url: 'user!checkLoginName.action',
								async:false,  
								method: 'POST',
								params: {
									'username':value,
									'userid':id
								},
								success: function(response, opts) {
				        		var data = Ext.decode(response.responseText);
				        		flag = data.success;
								}
						  });
								return flag;
				   		},
				   	checkNameText : '存在相同的用户名！'
			});

Ext.define('SYS.view.user.View', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.userView',
			requires: ['Ext.form.field.VTypes', 'Ext.ux.CommonVtype'],
			resizable:false,
			layout : 'fit',
			autoShow : true,
			height: 180,
   			width: 300,
			initComponent : function() {
				this.items = [{
							xtype : 'form',
							fieldDefaults : {
								labelAlign : 'right',
								labelWidth : 100,
								width : 260,
								margin:'10 0 0 0'
							},
							defaultType : 'textfield',
							items : [{
										name : 'userid',
										id : 'userid',
										fieldLabel : 'userid',
										allowBlank:true,
										hidden:true
									},{
										name : 'realname',
										id : 'realname',
										fieldLabel : '用户姓名',
										allowBlank:true
									},{
										name : 'username',
										id : 'username',
										fieldLabel : '登录名',
										allowBlank:false,
										vtype:'checkName',
										validateOnChange:false,
										checkName:{targetComId:'userid'}
									},{
										name : 'userpwd',
										id : 'userpwd',
										fieldLabel : '用户密码',
										allowBlank:true
									},
									pullDown('机构名称','deptid','sys_dept',false),
									pullDown('角色名称','roleid','sys_role',false)
								]
						}];
				this.callParent(arguments);
			}
		});