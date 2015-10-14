Ext.define('SYS.store.LeftTreeStore',{
	extend:'Ext.data.TreeStore',
	model:'SYS.model.MenuModel',
	autoLoad : true,	//自动加载
	remoteSort:true,
	proxy:{				//ajax请求
		type:'ajax',
		url:'queryMenu.action'
	},
	folderSort: true
});
