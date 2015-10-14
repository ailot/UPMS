Ext.define('SYS.controller.DeptController', {
    extend: 'Ext.app.Controller',
    mixins: {
     	classSave: 'Ext.ux.CommonSave'
    },
    stores: [
             'DeptStore'
         ],
    views: [
            'dept.List',
            'dept.View',
            'dept.Add',
            'dept.Update',
            'dept.Base'
        ],
    refs : [{
		ref : 'deptList',
		selector : 'deptlist'
	},{
		ref : 'deptAdd',
		selector : 'deptAdd',
		autoCreate: true,
        xtype: 'deptAdd'
	},{
		ref : 'deptUpdate',
		selector : 'deptUpdate',
		autoCreate: true,
        xtype: 'deptUpdate'
	},{
		ref : 'deptBase',
		selector : 'deptBase',
		autoCreate: true,
        xtype: 'deptBase'
	}],
	store : function(){
		return this.getDeptStoreStore();
	},
	grid : function(){
		return this.getDeptList();// refs 首字母大写
	},
	save_url : 'dept!add.action',
	update_url: 'dept!update.action',
	cheSel:function(){//修改用到的公用选择方法
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
           'deptlist > toolbar #comboboxBtn': {//每页显示数
        	   'change': this.changepage
           },
           'deptlist button[action=find]': {//搜索
               click: this.find
           },
           'deptlist button[action=add]':{//单位新增
        	   click: function(){
        	   	this.getDeptAdd().show();
        	   }
           },
            'deptlist button[action=setup]':{
           		click: function(){
           			if(this.cheSel()){
        	   		var view = this.getDeptBase().show();
					view.down('form').loadRecord(this.cheSel());
        	   		}
           		}
           },
           'deptlist button[action=edit]':{//修改
        	   click: function(){
        	   	if(this.cheSel()){
        	   		var view = this.getDeptUpdate().show();
					view.down('form').loadRecord(this.cheSel());
        	   	}
        	   }
           },
           'deptlist button[action=delete]':{//删除
           		click: this.del
           },
           'deptlist button[action=stop]':{//注销
           		click: this.stop
           },
            'deptlist button[action=start]':{
           		click: this.start
           },
           'deptAdd button[action=save]': {//单位新增保存
               click: this.add_save
           },
           'deptUpdate button[action=save]': {//修改保存
               click: this.update_save
           },
           'deptBase button[action=save]': {//修改保存
               click: this.update_save
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
                	'deptname':Ext.getCmp('deptname_s').value
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
    	pubOper(obj,'提示','dept!delete.action','确定删除？','deptid');
  	},
  	 stop : function(){
    	var obj = this;
    	pubOper(obj,'提示','dept!stop.action','确定注销？','deptid');
  	},
  	 start : function(){
    	var obj = this;
    	pubOper(obj,'提示','dept!start.action','确定启用？','deptid');
  	}
});
