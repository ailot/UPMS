/**
 * 本方法 外部使用方法
 *  Ext.Loader.setConfig({
		enabled : true,paths:{BASE:'js/base'}
	});
	,readOnly:true,
      listeners:{
		click:{
			element:'el',
			fn:function(){
				Ext.create('Ext.ux.CommonSelOrg',{varid:'orgID',varname:'orgName'});
			}
		}
	}
 * 选择框
 */


var orgStore = Ext.create('Ext.data.Store',{
	autoLoad: true, 
    pageSize: 25,
	fields : ['userid','username','deptid','deptname','realname'],
	proxy: {								
	    	actionMethods:'post',
	    	type: 'ajax',			//jquery选择器
	    	url : 'user!selectAll.action?state=1',
	        reader: 
	        	{
	        	root: 'list',    
	        	totalProperty: 'totalCount' 
	        	},
	        simpleSortMode: true
		   },
		   sorters: [{
		   property: 'userid',	
		   direction: 'DESC' 
		   }]
});

Ext.define('Ext.ux.CommonSelUsr', {
	id:'userWin',
    extend: 'Ext.window.Window',
    alias: 'widget.commonSelUsr',
    title: '人员选择框',
    layout: 'fit',
    width:600,
    height:300,
    autoShow: true,
    modal: true,
    config: {
    	varid:'',
    	varname:''
    },
    constructor: function(config)
	        { 
	        	this.initConfig(config);
	        	this.callParent();
	        },
    initComponent: function() {
    	var id = this.config.varid;
    	var name = this.config.varname;
        this.items = [
           {
               xtype: 'form',
               fieldDefaults: {labelAlign: 'right',labelWidth: 90,width:270,labelStyle: 'font-weight:bold'},
               items: [{
					    xtype: 'grid',
					    height:340,
					    selType: 'checkboxmodel',
					    forceFit:true,
					    columnLines: true,
			        	store : orgStore,
						columns : [{text: 'user_id',dataIndex: 'userid', width: 100,hidden:true},
						           {text: 'dept_id',dataIndex: 'deptid', width: 100,hidden:true},
						           {text: '登录名', dataIndex: 'username', width: 120},
					        		{text: '用户姓名', dataIndex: 'realname', width: 120},
					        		{text: '单位名称',dataIndex: 'deptname', width: 80,hidden:true}
								  ],
				      	 viewConfig : {enableTextSelection:true,emptyText: '<h1 style="margin:20px">没有结果</h1>' },
				        dockedItems: [
					    {   //添加搜索控件
						dock: 'top', 
					    xtype: 'toolbar', 
					    items: [{ id:'realname',width: 180, fieldLabel: '用户姓名', labelWidth: 100, xtype: 'textfield'},'-',
					            {
						            xtype:'button',
						            text : "查询",
						            iconCls: "icon-find",
						            handler : function() {
						            	var store = orgStore;
						            	store.on('beforeload', function (store, options) {
		                            	var new_params = {
		                                	'realname':Ext.getCmp('realname').getValue()
		                                	};
		                            	Ext.apply(store.proxy.extraParams, new_params);
		                            	});
		                        		store.loadPage(1); 
				                   	 } 
				                   	},'-',
				               {
				               xtype:'button',
				               text: "清空",
				               iconCls: "icon-reset",
					            handler : function() {
				 					Ext.getCmp('realname').reset();
								}
				    	}]
					}]

			}]
		}];
        
        this.buttons = [{
	    	text:'保存',
	    	formBind:true,
	    	disable:true,
	    	handler:function(button){
	    		var varnames = [];
	    		var varids = [];
	    		var records = button.up('window').down('form').down('grid').getSelectionModel().getSelection();
	    		if(records.length>1){
	    		   Ext.Msg.alert('提示','最多只能选择一条记录！')
	    		   return;
	    		}
	    		if(records.length==0){
	    		   Ext.Msg.alert('提示','请选择记录！')
	    		   return;
	    		}
                Ext.Array.each(records, function(rec){
                	varids.push(rec.get('userid'));
                	varnames.push(rec.get('realname'));
                });
                Ext.getCmp(id).setValue(varids);
                Ext.getCmp(name).setValue(varnames);
                button.up('window').close();
	    	}
	    },
           {
               text: '关闭',
               scope: this,
               handler: this.close
           }
        ];
        this.bbar = pagingFun(orgStore,10);
        this.callParent(arguments);
    }
});
