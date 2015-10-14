Ext.define('SYS.view.role.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolelist', //别名
    store:'RoleStore',
    selType: 'checkboxmodel',
    columnLines: true,
    forceFit:true,
    viewConfig: {
    	enableTextSelection:true,
        emptyText: '<h1 style="margin:20px">没有结果</h1>'
    },
    dockedItems: [
      			{
					dock: 'top', 
				    xtype: 'toolbar', 
				    items: [{ 
			    	id:'rolename_s',
			        width: 140, 
			        fieldLabel: '角色名', 
			        labelWidth: 50, 
			        xtype: 'textfield'
				},'-',{
		    		xtype:'button',
		            text : "查询",
		            iconCls: "icon-find",
		            action:'find' 
		    	},'-',{
		    		xtype:'button',
		            text: "清空",
			    	iconCls: "icon-reset",
		            handler : function() {
		            	Ext.getCmp('rolename_s').reset();
		            } 
		    	}]
				},{ //按钮工具栏
					id:'btn',
    	            xtype: 'toolbar'
    	        }],
    initComponent: function() {
        this.columns = [
            {text:'角色ID', width:50,dataIndex:'roleid'},
            {text:'角色名', width:100,dataIndex:'rolename'},
            {text:'备注', width:100,dataIndex:'roletype'}
            ];
        /**
         * 用于回调父类函数，一般用在自定义的类中，这个类继承了ext的
         * 原生类，在类定义的结尾要进行回调父类的方法this.callParent(arguments)
         */
        this.callParent(arguments);
    },
    listeners:{
    	beforerender:function(obj){
    		/**
    		 * selectButton公用方法在util.js文件下
    		 * 主要用来配置按钮的权限
    		 */
			getButton('0103');
	    	obj.doLayout();
		}
    }

});