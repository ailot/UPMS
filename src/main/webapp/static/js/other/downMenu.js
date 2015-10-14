Ext.require('Ext.ux.TreePicker');
//字典表下拉菜单
	var downMenu = function(field,name,label,allow,edit,fn){
		var menu = {
			labelAlign : 'right',
			fieldLabel : field,
			xtype : 'combobox',
			name : name,
			id:name,
			store : Ext.create('Ext.data.Store', {
				fields : ['key', 'value'],
				proxy: {
         		type: 'ajax',
         		url : 'dict!selectByLabel.action?label='+label,
         		reader: {
             		type: 'json',
             		root: 'list'
         			}
     			},
     			autoLoad:true
			}),
			valueField : 'key',
			displayField : 'value',
			typeAhead : false,
			queryMode : 'local',
			allowBlank : allow,
			editable:edit,
			listeners:{
				change:function(field,newValue,oldValue,obj){
					if(fn==='01'){
						Ext.Ajax.request({
							url:'field!initInfoDict.action',
							async:false,
							params:{
	        	   				dictlable:newValue,
	        	   				table:'BaseInfoSelfDict',
	        	   				label:'FIELD'
	        	   				//dlabel:'ORTY'
	        	   			},
							success:function(response){
								var data = Ext.decode(response.responseText);
								if(!data.success){
									Ext.Msg.alert('提示',data.msg);
								}
							}
						});
					}else if(fn==='02'){
						Ext.Ajax.request({
							url:'field!initInfoDict.action',
							async:false,
							params:{
	        	   				dictlable:newValue,
	        	   				table:'PersonInfoSelfDict',
        	   					label:'FIELDP'
	        	   				//dlabel:'ORTY'
	        	   			},
							success:function(response){
								var data = Ext.decode(response.responseText);
								if(!data.success){
									Ext.Msg.alert('提示',data.msg);
								}
							}
						});
					}
				}
			}
	}
	return menu;
}

/*树形菜单*/
var treeMenu = function(field,name,label,allow,edit){

	var menu = {
			fieldLabel : field,
			id:name,
			name : name,
			xtype : 'treepicker',
			store : Ext.create('Ext.data.TreeStore', {
				fields : ['id', 'name','parentKey','leaf'],
				proxy: {
         		type: 'ajax',
         		url : 'dict!getDictTree.action?label='+label
         		/*必须去掉这个，不知道为什么，否则节点无法加载
         		reader: {
             		type: 'json',
             		root: 'trees'
         			}*/
     			},
     			root : {	//必须指定root节点
					text : '行政区划',
					expanded:true
				},
     			autoLoad:true
			}),
			valueField : 'id',
			displayField : 'name',
			allowBlank : allow,
			editable:edit,
			listeners:{}
		}
		
		return menu;
}

/*
 * 通用下拉菜单，通过表名获取
 */
var pullDown = function(field,name,label,flag){
	var down = {
		labelAlign : 'right',
		fieldLabel : field,
		xtype : 'combobox',
		name : name,
		id:name,
		store : Ext.create('Ext.data.Store', {
			fields : ['key', 'value'],
			proxy: {
     		type: 'ajax',
     		url : 'user!getCombobox.action?label='+label,
     		reader: {
         		type: 'json',
         		root: 'list'
     			}
 			},
 			autoLoad: true
		}),
		queryMode : 'local',
		valueField : 'key',
		displayField : 'value',
		allowBlank : flag,
		editable:false
		}
	return down;
}