Ext.define('SYS.view.notice.Update', {
			extend : 'Ext.window.Window',
			alias : 'widget.noticeUpdate',
			title : '修改通知公告',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			//height: 200,
   			//width: 300,
			initComponent : function() {
				this.items = [{
					xtype:'noticeView'
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