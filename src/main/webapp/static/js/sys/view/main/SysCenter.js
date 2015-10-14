Ext.define('SYS.view.main.SysCenter',{
	extend:'Ext.tab.Panel',
	forceFit:true,		//自动适应宽度
	layout:'fit',
	id:'mainTab',
	alias: 'widget.sysCenter',
	items: [{
		title:'个人中心',
		frame:false,
		//xtype: 'myCenter'
		html:"<iframe scrolling='auto' name='work' frameborder='0' width='100%' height='100%' src='welcome.action'> </iframe>"
	}],
	plugins :Ext.create('Ext.ux.TabCloseMenu', {
    closeTabText: '关闭当前',
    closeOthersTabsText: '关闭其他',
    closeAllTabsText: '关闭所有'
	})
});