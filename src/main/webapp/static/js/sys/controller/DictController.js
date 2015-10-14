
Ext.define('SYS.controller.DictController', {
    extend: 'Ext.app.Controller',
    mixins: {
     	classSave: 'Ext.ux.CommonSave'
    },
    stores: [
             'DictStore'
         ],
    views: [
            'dict.List',
            'dict.Add',
            'dict.Update',
            'dict.View'
        ],
    refs : [{
		ref : 'dictList',
		selector : 'dictlist'
	},{
		ref : 'dictAdd',
		selector : 'dictAdd',
		autoCreate: true,
        xtype: 'dictAdd'
	},{
		ref : 'dictUpdate',
		selector : 'dictUpdate',
		autoCreate: true,
        xtype: 'dictUpdate'
	}],
	
	store : function(){
		return this.getDictStoreStore();
	},
	grid : function(){
		return this.getDictList();// refs 首字母大写
	},
	save_url : 'dict!saveDict.action',
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
           'dictlist > toolbar #comboboxBtn': {//每页显示数
        	   'change': this.changepage
           },
           'dictlist button[action=find]': {//搜索
               click: this.find
           },
           'dictlist button[action=add]':{//单位新增
        	   click: function(){
        	   	this.getDictAdd().show();
        	   }
           },
           'dictlist button[action=edit]':{//修改
        	   click: function(){
        	   	if(this.cheSel()){
        	   		var view = this.getDictUpdate().show();
					view.down('form').loadRecord(this.cheSel());
        	   	}
        	   }
           },
           'dictlist button[action=delete]':{//删除
           		click: this.del
           },
           'dictAdd button[action=save]': {//单位新增保存
               click: this.add_save
           },
           'dictUpdate button[action=save]': {//修改保存
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
                	'label':Ext.getCmp('label_s').value,
                	'value':Ext.getCmp('value_s').value
                }
                Ext.apply(store.proxy.extraParams, new_params);
                });
		 store.loadPage(1); 
    },
    add_save: function(button){ //表单保存
    	this.common_save(button,this.save_url);
    },
    update_save : function(button){
    	this.common_save(button,this.save_url);
    },
    del : function(){
    	var obj = this;
    	var grid = obj.grid();
    	if(this.cheSel()){
    		pubOper(obj,'提示','dict!delete.action','确定删除？','id');
    	}
  	}
});
