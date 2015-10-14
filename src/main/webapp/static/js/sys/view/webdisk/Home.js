   
Ext.define('SYS.view.webdisk.Home' ,{
    extend: 'Ext.container.Viewport',
    alias: 'widget.webdiskhome', //别名
	layout:'border',
	title:'网盘信息',
	items:[{
		region:'west',
		width:'30%',
		split:true,
	    layout:'anchor',
		items:[{
			title:'空间概览',
			xtype: 'panel',
			bodyStyle:'background:#6495ED; padding:10px;',
			items:[{
				margin:'10 0 10 0',
				height:20,
				xtype:'progressbar',
				value:0.5,
				text:'50%'
			}],
			html:'<p style="font-size:16px;font-weight:bold;text-align:center;color:#fff">0KB/1024KB</p>'
		},{
		},{
			title:'我的网盘',
			xtype: 'treepanel',
			rootVisible:false,
			root: {
            text: 'Root Node',
            expanded: true,
            children: [{
                text: 'Item 1',
                leaf: true
            }, {
                text: 'Item 2',
                leaf: true
            }, {
                text: 'Folder',
                children: [{
                    text: 'Item 3',
                    leaf: true
                }]
            }]
        }
		}]
	},{
		region:'center',
		title:'文件',
		xtype:'webdiskfile'
	}]
});