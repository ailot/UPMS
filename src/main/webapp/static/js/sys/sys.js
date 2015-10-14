	//创建应用程序的实例
	Ext.application({
		//设定命名空间
		name : 'SYS',		  // 别名
		appFolder : 'static/js/sys', //指定文件夹
		//加载控制器
		controllers: ['SYS.controller.SysController'],
		launch: function() {
			Ext.create('SYS.view.main.SysMain', {
				renderTo : Ext.getBody()
			});
  		}
});
