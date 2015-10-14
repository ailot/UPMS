Ext.define('SYS.view.notice.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.noticeAdd',
			title : '新增通知公告',
			resizable:false,
			layout : 'fit',
			//maximized:true,	//初始化为最大窗体
			maximizable:true,//最大化按钮
			autoShow : true,
			modal: true,
			//height: 300,
   			//width: 600,
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