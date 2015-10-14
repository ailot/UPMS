Ext.define('SYS.controller.NoticeController', {
    extend: 'Ext.app.Controller',
    mixins: {
     	classSave: 'Ext.ux.CommonSave'
    },
    stores: [
             'NoticeStore'
         ],
    views: [
            'notice.List',
            'notice.Add',
            'notice.Update',
            'notice.Show',
            'notice.View'
        ],
    refs : [{
		ref : 'noticeList',
		selector : 'noticelist'
	},{
		ref : 'noticeAdd',
		selector : 'noticeAdd',
		autoCreate: true,
        xtype: 'noticeAdd'
	},{
		ref : 'noticeUpdate',
		selector : 'noticeUpdate',
		autoCreate: true,
        xtype: 'noticeUpdate'
	},{
		ref : 'noticeShow',
		selector : 'noticeShow',
		autoCreate: true,
        xtype: 'noticeShow'
	}],
	grid : function(){
		return this.getNoticeList();// refs 首字母大写
	},
	store : function(){
		return this.getNoticeStoreStore();
	},
	save_url : 'notice!add.action',
	update_url: 'notice!update.action',
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
           'noticelist > toolbar #comboboxBtn': {//每页显示数
        	   'change': this.changepage
           },
           'noticelist button[action=find]': {//搜索
               click: this.find
           },
           'noticelist button[action=add]':{
        	   click: function(){
        	   	this.getNoticeAdd().show();
        	   }
           },
            'noticelist #noticeview':{
        	   showClick: function(record){
        	   		var content = record.record.data.content;
        	   		var title = record.record.data.title;
        	   		var time = record.record.data.time;
        	   		this.getNoticeShow().show();
        	   		var showpanel = Ext.getCmp('showpanel');
        	   		var panel = new Ext.panel.Panel({
        	   			html:"<div style='height:400px; text-align:center; overflow-y: auto;'>"+
                                "<p style='font-weight:600; font-size:15px'>"+title+"</p><span>"+time+"</span><br/><div style='text-align:left;'>"+content+"</div></div>"
        	   		});
        	   		showpanel.items.add(panel);
        	   		showpanel.doLayout();
        	   }
           },
           'noticelist button[action=edit]':{//修改
        	   click: function(){
        	   	if(this.cheSel()){
        	   		var view = this.getNoticeUpdate().show();
					view.down('form').loadRecord(this.cheSel());
        	   	}
        	   }
           },
           'noticelist button[action=delete]':{//删除
           		click: this.del
           },
           'noticeAdd button[action=save]': {//单位新增保存
               click: this.add_save
           },
           'noticeUpdate button[action=save]': {//修改保存
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
                	'title':Ext.getCmp('title_s').value
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
    	pubOper(obj,'提示','notice!delete.action','确定删除？','id');
  	}
});
