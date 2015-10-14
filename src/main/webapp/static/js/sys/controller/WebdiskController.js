Ext.define('SYS.controller.WebdiskController', {
    extend: 'Ext.app.Controller',
    mixins: {
     	classSave: 'Ext.ux.CommonSave'
    },
    views: [
            'webdisk.Home',
            'webdisk.DiskFile'
        ],
    refs : [{
		ref : 'webdiskhome',
		selector : 'webdiskhome'
	}],
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
        this.control({});
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
  	 stop : function(){
    	var obj = this;
    	pubOper(obj,'提示','dept!stop.action','确定注销？','deptid');
  	},
  	 start : function(){
    	var obj = this;
    	pubOper(obj,'提示','dept!start.action','确定启用？','deptid');
  	}
});
