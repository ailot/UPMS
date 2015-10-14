Ext.define('SYS.view.user.Update', {
			extend : 'Ext.window.Window',
			alias : 'widget.userUpdate',
			title : '修改用户',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			//height: 180,
   			width: 300,
			initComponent : function() {
				this.items = [{
					xtype:'userView'
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