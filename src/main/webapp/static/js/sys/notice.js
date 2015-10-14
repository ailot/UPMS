Ext.application({
	name : 'SYS',		  // 别名
	appFolder : 'static/js/sys', //指定文件夹
	controllers: ['SYS.controller.NoticeController'],
	launch : function() {//加载时运行
		Ext.create('Ext.container.Viewport', {
			layout : 'fit',  //自适应
			items : [
			{
				xtype:'noticelist'
			}
			]
		});
	}
	
});