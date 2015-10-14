Ext.define('SYS.view.role.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.roleAdd',
			title : '新增角色',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			//height: 130,
   			//width: 300,
			initComponent : function() {
				this.items = [{
					xtype:'roleView'
				}];

				this.buttons = [{
							text : '保存',
							action : 'save'
						}, {
							text : '取消',
							scope : this,
							handler : this.close
						}];
				this.callParent(arguments);
			}
		});