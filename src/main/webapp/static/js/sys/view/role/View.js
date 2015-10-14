Ext.define('SYS.view.role.View', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.roleView',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			height: 100,
   			width: 300,
			initComponent : function() {
				this.items = [{
					xtype:'form',
					fieldDefaults : {
						labelAlign : 'right',
						labelWidth : 80,
						width : 260,
						margin:'10 0 0 0'
					},
					defaultType : 'textfield',
					items : [{
								name : 'roleid',
								id : 'roleid',
								fieldLabel : '角色id',
								hidden:true
							},{
								name : 'rolename',
								id : 'rolename',
								fieldLabel : '角色名',
								allowBlank : false
							}, {
								name : 'roletype',
								id : 'roletype',
								fieldLabel : '备注',
								allowBlank : false
							}]
						}];

				this.callParent(arguments);
			}
		});