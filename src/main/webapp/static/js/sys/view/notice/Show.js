Ext.define('SYS.view.notice.Show', {
			extend : 'Ext.window.Window',
			alias : 'widget.noticeShow',
			title : '通知公告',
			resizable:true,
			layout : 'fit',
			autoShow : true,
			modal: true,
			height: 300,
   			width: 600,
			initComponent : function() {
				this.items = [{
					autoScroll:true,
					xtype:'form',
					bodyPadding: 10,
					id:'showpanel'
				}];
				this.callParent(arguments);
			}
		});