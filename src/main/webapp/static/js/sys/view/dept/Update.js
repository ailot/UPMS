Ext.define('SYS.view.dept.Update', {
			extend : 'Ext.window.Window',
			alias : 'widget.deptUpdate',
			title : '修改单位',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			//height: 150,
   			//width: 300,
			initComponent : function() {
				this.items = [{
					xtype:'deptView'
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