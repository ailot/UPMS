Ext.define('SYS.controller.UserController', {
    extend: 'Ext.app.Controller',
    mixins: {
     	classSave: 'Ext.ux.CommonSave'
    },
    stores: [
             'UserStore'
         ],
    views: [
            'user.List',
            'user.Add',
            'user.Update',
            'user.View'
        ],
    refs : [{
		ref : 'userlist',
		selector : 'userlist'
	},{
		ref : 'userAdd',
		selector : 'userAdd',
		autoCreate: true,
        xtype: 'userAdd'
	},{
		ref : 'userUpdate',
		selector : 'userUpdate',
		autoCreate: true,
        xtype: 'userUpdate'
	}],
	grid : function(){
		return this.getUserlist();// refs 首字母大写
	},
	store : function(){
		return this.getUserStoreStore();
	},
	save_url : 'user!add.action',
	update_url: 'user!update.action',
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
           'userlist > toolbar #comboboxBtn': {//每页显示数
        	   'change': this.changepage
           },
           'userlist button[action=find]': {//搜索
               click: this.find
           },
           'userlist button[action=add]':{
        	   click: function(){
        	   	this.getUserAdd().show();
        	   }
           },
           'userlist button[action=edit]':{//修改
        	   click: function(){
        	   	if(this.cheSel()){
        	   		var view = this.getUserUpdate().show();
        	   		var form =  view.down('form');
        	   		form.getForm().findField('userpwd').setDisabled(true);
        	   		form.getForm().findField('userpwd').setVisible(false);
					form.loadRecord(this.cheSel());
        	   	}
        	   }
           },
           'userlist button[action=delete]':{//删除
           		click: this.del
           },
           'userAdd button[action=save]': {//单位新增保存
               click: this.add_save
           },
           'userUpdate button[action=save]': {//修改保存
               click: this.update_save
           },
           'userlist button[action=stop]':{
           		click: function(){
			    	var obj = this;
			    	pubOper(obj,'提示','user!stop.action','确定停用？','userid');
           		}
           },
           'userlist button[action=start]':{
           		click: function(){
			    	var obj = this;
			    	pubOper(obj,'提示','user!start.action','确定启用？','userid');
           		}
           },
           'userlist button[action=reset]':{
           		click: function(){
			    	var obj = this;
			    	if(this.cheSel()){
			    		pubOper(obj,'提示','user!resetPwd.action','确定重置密码为：123456？','userid');
			    	}
           		}
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
                	'realname':Ext.getCmp('realname_s').value
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
    	pubOper(obj,'提示','user!delete.action','确定删除？','userid');
  	}
});
