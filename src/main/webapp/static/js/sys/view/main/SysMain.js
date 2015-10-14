Ext.define('SYS.view.main.SysMain',{
	extend: 'Ext.container.Viewport',
	layout: 'border',
	alias:'widget.sysMain',
 	items: [{
 		cls:'background-color:"#CCCCCC"',
 		region:'north',
 		xtype:'toolbar',
 		height:70,
 		items:[
 		'<span style="font-size:24px;font-Weight:900">'+Ext.getDom('systitle').value+'</span>','->',
 		{
 		 	border:false,
	 		//width:400,
	 		xtype:'toolbar',
	 		style:{
	 			//marginBottom: '50px'
	 			backgroundColor:"#CCCCCC"
	 			},
	 		items:[{
	            text : Ext.getDom('s_deptname').value,
	            iconCls:'icon-home'
        	},'-',{
	 			iconCls:'icon-user',
	 			text:Ext.getDom('s_username').value
	 		},Ext.getDom('s_rolename').value,'-',{
	 			xtype: 'splitbutton',
	 			text:'操作',
	 			//iconCls:'icon-process',	 			
	 			menu: [{
	 				id:'id_changepwd',
		 			text: '修改密码',
		 			iconCls:'icon-key'
		 			},{
	        		id:'id_u',
	        		text:'退出',
	        		iconCls:'icon-exit'
	        		}]
	 			}]
 		 }]
 		},{
	 		region:'west',
	 		width:200,
	 		xtype:'sysTreeMenu'
 		},{
 			region:'center',
 			xtype:'sysCenter'
 		},{
 			region:'south',
 			html:'<center style="background:#cccccc">Copyright @ AILOT</center>'
 		}]
});
