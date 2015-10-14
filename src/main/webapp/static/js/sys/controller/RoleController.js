
Ext.define('SYS.controller.RoleController', {
    extend: 'Ext.app.Controller',
    mixins: {
     	classSave: 'Ext.ux.CommonSave'
    },
    stores: [
             'RoleStore'
         ],
    views: [
            'role.List',
            'role.Add',
            'role.Update',
            'role.View'
        ],
    refs : [{
		ref : 'roleList',
		selector : 'rolelist'
	},{
		ref : 'roleAdd',
		selector : 'roleAdd',
		autoCreate: true,
        xtype: 'roleAdd'
	},{
		ref : 'roleUpdate',
		selector : 'roleUpdate',
		autoCreate: true,
        xtype: 'roleUpdate'
	}],
	
	store : function(){
		return this.getRoleStoreStore();
	},
	grid : function(){
		return this.getRoleList();// refs 首字母大写
	},
	save_url : 'role!add.action',
	update_url: 'role!update.action',
	cheSel:function(){
		var grid = this.grid();
		var record = grid.getSelectionModel().getSelection(); 
		if(record.length!=1){
			Ext.MessageBox.alert('提示', "请选择一条记录！");
			return false;
		}else{
			return record[0];
		}
	},
    init: function() {
        this.control({
           'rolelist > toolbar #comboboxBtn': {//每页显示数
        	   'change': this.changepage
           },
           'rolelist button[action=find]': {//搜索
               click: this.find
           },
           'rolelist button[action=add]':{//单位新增
        	   click: function(){
        	   	this.getRoleAdd().show();
        	   }
           },
           'rolelist button[action=edit]':{//修改
        	   click: function(){
        	   	if(this.cheSel()){
        	   		var view = this.getRoleUpdate().show();
					view.down('form').loadRecord(this.cheSel());
        	   	}
        	   }
           },
           'rolelist button[action=delete]':{//删除
           		click: this.del
           },
           'roleAdd button[action=save]': {//单位新增保存
               click: this.add_save
           },
           'roleUpdate button[action=save]': {//修改保存
               click: this.update_save
           },
           'rolelist button[action=distribution]':{//权限分配
           		click: this.distribution
           }
        });
    },
    changepage : function(Field, newValue, oldValue){ //设置每页显示
    	var store = this.store();
    	store.pageSize = newValue;
    	store.on('beforeload', function (store, options) {
            var new_params = { "limit":newValue};
            Ext.apply(store.proxy.extraParams, new_params);
            });
        store.loadPage(1);
    },
    find : function(){//搜索
    	var store = this.store();
    	store.on('beforeload', function (store, options) {
                var new_params = {  
                	'rolename':Ext.getCmp('rolename_s').value
                }
                Ext.apply(store.proxy.extraParams, new_params);
                });
		 store.loadPage(1); 
    },
    add_save: function(button){ //表单保存
    	this.common_save(button,this.save_url);
    },
    update_save : function(button){
    	this.common_save(button,this.update_url);
    },
    del : function(){
    	var obj = this;
    	pubOper(obj,'提示','role!delete.action','确定删除？','roleid');
  	},
  	distribution:function(){
  		if(this.cheSel()){
  			var roleid = this.cheSel().get('roleid');
  			var rightTreeStore = Ext.create('Ext.data.TreeStore', {
  			 	fields:['id','name','parentKey','value','leaf','checked'],
  			 	autoLoad:true,
  			 	proxy:{
  			 		actionMethods:'post',
  			 		type:'ajax',
  			 		url:'right!selectRight.action?roleid='+roleid
  			 	}
  			});
  			
  			var treePanel = Ext.create('Ext.tree.Panel',{
  				autoScroll :true,
  				height:400,
  				width:600,
  				store:rightTreeStore,
				useArrows : true,	//显示为箭头
				rootVisible: false,//是否显示根节点
				displayField : 'name',//显示的名字
				valueField 	 : 'id',	//实际的值
				listeners:{
					checkchange:function(node,checked){
						var leaf = node.get('leaf');
						if(leaf){ //如果是叶子节点
							if(checked){	//如果叶子节点被选中
								var root = node.parentNode.get('checked');
								if(!root){ //如果父节点没有被选中
									node.parentNode.set('checked',true); //选中父节点
								}
							}	
						}else{	//如果是父节点
								node.cascade(function(node){
									node.set('checked',checked);//与父节点状态保持一致
								});
						}
					}
				}
  			});
  			
  			var treeWin = Ext.create('Ext.window.Window', {
  				modal: true,
  				autoShow:true,
  				title:'权限分配',
			    items:treePanel,
			    buttons:[{
			    	text:'保存',
			    	formBind:true,
			    	disable:true,
			    	handler:function(){
			    		var records = treePanel.getView().getChecked();
                        var rights = [];
	                    Ext.Array.each(records, function(rec){
	                    	roleright = new Object();
	                    	roleright.rightid = rec.get('id');
	                    	roleright.roleid = roleid;
	                    	rights.push(roleright)
	                    });
	                    //console.log(Ext.encode(rights));
	                    Ext.Ajax.request({
						    url: 'right!saveRight.action',
						    params: {
						        'rights': Ext.encode(rights),
						        'roleid':roleid
						    },
						    success: function(response){
						        var data = Ext.decode(response.responseText);
						        if(data.success){
						        	Ext.Msg.alert('提示',data.msg);
						        	treeWin.close();
						        }else{
						        	Ext.Msg.alert('提示',data.msg);
						        	treeWin.close();
						        }
						    }
						});
			    	}
			    },{
			    	text:'取消',
			    	handler:function(){
			    		treeWin.close();
			    	}
			    }]
  			});
  			treePanel.expandAll();
  			//treeWin.show();
  		}
  	}
});
