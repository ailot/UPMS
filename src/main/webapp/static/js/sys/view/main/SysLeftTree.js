Ext.define('SYS.view.main.SysLeftTree',{
	extend:'Ext.tree.Panel',
	alias:'widget.sysLeftTree',
	store: 'LeftTreeStore',
	useArrows : false,	//显示为箭头
	expanded:true,	//节点不展开
	rootVisible: false,//是否显示根节点
	displayField : 'name',//显示的名字
	valueField 	 : 'id',	//实际的值
	bodyStyle: {},	//自定义样式
	listeners:{
		'itemclick':function(view,record){
			if(record.data.leaf){
				var tabId = record.data.id;
				var tabTitle = record.data.name;
			    var tabUrl = record.data.url;
			    var centerpanel = Ext.getCmp('mainTab');
			    var tab = centerpanel.getComponent(tabId);
			    if(tab){
			    	centerpanel.remove(tabId);
			    }
			    tab = centerpanel.add({
			    	id:tabId,
			    	title:tabTitle,
			    	layout:'fit',
			    	closable:true,
             		closeAction:'close',
             		html:"<iframe name='workspace' id='tabPanel' scrolling='auto' frameborder='0' width='100%' height='100%' src='"+tabUrl+"'> </iframe>"
			    });
			    centerpanel.setActiveTab(tab);
			}else{
				if(record.data.expanded){  
                    view.collapse(record);  
                }else{  
                    view.expand(record);  
                } 
			}
		}
	}
});