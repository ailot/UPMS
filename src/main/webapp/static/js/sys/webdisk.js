Ext.application({
	name : 'SYS',		  // 别名
	appFolder : 'static/js/sys', //指定文件夹
	controllers: [
              'SYS.controller.WebdiskController' //指定控制器,可简写
          ],
	launch : function() {
			Ext.create('SYS.view.webdisk.Home', {
				renderTo : Ext.getBody()
			});
  		}
});