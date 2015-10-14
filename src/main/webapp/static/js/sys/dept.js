Ext.application({
	name : 'SYS',		  // 别名
	appFolder : 'static/js/sys', //指定文件夹
	controllers: [
              'SYS.controller.DeptController' //指定控制器,可简写
          ],
	launch : function() {//加载时运行
		Ext.create('Ext.container.Viewport', {//填充整个窗口
			layout : 'fit',  //自适应
			items : [
			{
				xtype:'deptlist'
			}
			]
		});
	}
});