Ext.define('SYS.view.user.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.userAdd',
			title : '新增用户',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			able:true,
			//height: 200,
   			//width: 300,
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