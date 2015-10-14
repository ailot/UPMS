Ext.define('SYS.view.main.SysTreeMenu',{
	extend:'Ext.Panel',
	alias:'widget.sysTreeMenu',
	collapsible: true,
	split: true,
	title: '导航栏',
	layout:'accordion',
	rootVisible: false,//是否显示根节点
	items:[{
		title:'系统菜单',
		iconCls:'icon-down',
		xtype:'sysLeftTree'
	}]
});