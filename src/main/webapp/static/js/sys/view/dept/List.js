Ext.define('SYS.view.dept.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.deptlist', //别名
    store:'DeptStore',
    selType: 'checkboxmodel',
    columnLines: true,
    forceFit:true,//自适应列宽
    viewConfig: {
    	enableTextSelection:true,
        emptyText: '<h1 style="margin:20px">没有结果</h1>'
    },
    dockedItems: [
      			{
					dock: 'top', 
				    xtype: 'toolbar', 
				    items: [{ 
			    	id:'deptname_s',
			        width: 160, 
			        fieldLabel: '单位名称', 
			        labelWidth: 60, 
			        xtype: 'textfield'
				},{
		    		xtype:'button',
		            text : "查询",
		            iconCls: "icon-find",
		            action:'find' 
		    	},'-',{
		    		xtype:'button',
		            text: "清空",
			    	iconCls: "icon-reset",
		            handler : function() {
		            	Ext.getCmp('deptname_s').reset();
		            } 
		    	}]
				},{ //按钮工具栏
					id:'btn',
    	            xtype: 'toolbar'
    	        }],
    initComponent: function() {
        this.columns = [
            {text:'id', width:50,dataIndex:'deptid',hidden:true},
            {text:'单位名称',width:200,dataIndex:'deptname'},
            {text:'单位级别',width:120,dataIndex:'parentid',renderer:function(value){
            	if (value == 1) {
					return '<span style="color:blue;">一级</span>';
				} else if (value == 2) {
					return '<span style="color:green;">二级</span>';
				}
            }},
            {text:'所属政区id', width:200,dataIndex:'areacode',hidden:true},
            {text:'所属政区', width:200,dataIndex:'areaname'},
            {text:'联系电话', width:200,dataIndex:'phone'},
            {text:'状态',width:120,dataIndex:'state',renderer:function(value){
            	if (value == 1) {
					return '<span style="color:blue;">正常</span>';
				} else if (value == 0) {
					return '<span style="color:green;">注销</span>';
				}
            }}
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
			getButton('0101');
	    	obj.doLayout();
		}
    }

});