Ext.define('SYS.controller.FileController', {
    extend: 'Ext.app.Controller',
    mixins: {
     	classSave: 'Ext.ux.CommonSave'
    },
    stores: [
             'FileStore'
         ],
    views: [
            'file.List',
            'file.Add'
        ],
    refs : [{
		ref : 'fileList',
		selector : 'filelist'
	},{
		ref : 'fileAdd',
		selector : 'fileAdd',
		autoCreate: true,
        xtype: 'fileAdd'
	}],
	grid : function(){
		return this.getFileList();// refs 首字母大写
	},
	store : function(){
		return this.getFileStoreStore();
	},
	save_url : 'file!add.action',
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
           'filelist > toolbar #comboboxBtn': {//每页显示数
        	   'change': this.changepage
           },
           'filelist button[action=find]': {//搜索
               click: this.find
           },
           'filelist button[action=add]':{
        	   click: function(){
        	   	this.getFileAdd().show();
        	   }
           },
           'filelist button[action=delete]':{//删除
           		click: this.del
           },
           'fileAdd button[action=save]': {//单位新增保存
               click: this.add_save
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
                	'name':Ext.getCmp('name_s').value
                }
                Ext.apply(store.proxy.extraParams, new_params);
                });
		 store.loadPage(1); 
    },
    add_save: function(button){ //表单保存
    	this.common_save(button,this.save_url);
    },
    del : function(){
    	var obj = this;
    	var grid = obj.grid();
    	pubOper(obj,'提示','file!delete.action','确定删除？','id');
  	}
});
