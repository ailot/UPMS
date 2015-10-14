Ext.define('SYS.view.user.List' ,{
	id:'userlist',
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist', //别名
    store:'UserStore',
    selType: 'checkboxmodel',
    forceFit:true,//自适应列宽
    columnLines: true,
    viewConfig: {
    	enableTextSelection:true,
        emptyText: '<h1 style="margin:20px">没有结果</h1>'
    },
    dockedItems: [{
				dock: 'top', 
			    xtype: 'toolbar', 
			    items: [{ 
			    	id:'realname_s',
			        width: 160, 
			        fieldLabel: '用户姓名', 
			        labelWidth: 60, 
			        xtype: 'textfield'
				},'-',{
		    		xtype:'button',
		            text : '查询',
		            iconCls: 'icon-find',
		            action:'find'
		    	},'-',{
		    		xtype:'button',
		            text: '清空',
			    	iconCls: 'icon-reset',
		            handler : function() {
		            	Ext.getCmp('realname_s').reset();
		            }
		    	}]
			},{
				id:'btn',
	            xtype: 'toolbar'
    	       }],
    initComponent: function() {
        this.columns = [
                {text: 'id',dataIndex: 'userid', width: 100,hidden:true},
        		{text: '登录名', dataIndex: 'username', width: 150},
        		{text: '用户姓名', dataIndex: 'realname', width: 150},
        		{text: 'roleid',dataIndex: 'roleid', width: 80,hidden:true},
        		{text: '角色名', dataIndex: 'rolename', width: 120},
        		{text: '机构ID',dataIndex: 'deptid',width: 100},
        		{text: '单位名称', dataIndex: 'deptname', width: 200},
        		{text: '负责人', dataIndex: 'leader', width: 80,hidden:true},
        		{text: '操作员', dataIndex: 'operator', width: 80,hidden:true},
        		{text: '状态', dataIndex: 'state', width: 80,
        			renderer:function(value, p, record){
		            	if (value == 1) {
		        			return '<span style="color:#006B00;">已启用</span>';
		        		} else if (value == 0) {
		        			return '<span >未启用</span>';
		        		}
		            }
        			}
    		];
         /*分页工具栏*/
        this.bbar = pagingFun(this.store); 
        /**
         * 用于回调父类函数，一般用在自定义的类中，这个类继承了ext的
         * 原生类，在类定义的结尾要进行回调父类的方法this.callParent(arguments)
         */
        this.callParent(arguments);
    },
    listeners:{
    	afterrender:function(obj){
    		/**
    		 * selectButton公用方法在util.js文件下
    		 * 主要用来配置按钮的权限
    		 */
			getButton('0102');
	    	obj.doLayout();
		}
    }
});