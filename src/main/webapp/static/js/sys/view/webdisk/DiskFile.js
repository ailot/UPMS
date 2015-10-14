
Ext.define('SYS.view.webdisk.DiskFile', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.webdiskfile',
    layout: 'fit',
    width : 300,
    initComponent: function() {
    	this.tbar=[{
    		xtype:'button',
            text : '新建文件夹',
            iconCls: 'icon-newfolder'
    	},{
    		xtype:'button',
            text : '上传',
            iconCls: 'icon-upload'
    	},{
    		xtype:'button',
            text : '分享',
            iconCls: 'icon-share_m'
    	}];
		this.items = [{
			xtype:'panel',
			title:'',
			html:'1231'
		}];

		this.callParent(arguments);
	}
});