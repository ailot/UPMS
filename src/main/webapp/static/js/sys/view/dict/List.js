Ext.define('SYS.view.dict.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.dictlist', //别名
    store:'DictStore',
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
			    	id:'value_s',
			        width: 120, 
			        fieldLabel: 'value', 
			        labelWidth: 40, 
			        xtype: 'textfield'
				},'-',{ 
			    	id:'label_s',
			        width: 120, 
			        fieldLabel: 'label', 
			        labelWidth: 40, 
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
		            	Ext.getCmp('value_s').reset();
		            	Ext.getCmp('label_s').reset();
		            } 
		    	}]
				},{ //按钮工具栏
    	            xtype: 'toolbar',
    	            id: 'btn'
    	        }],
    initComponent: function() {
        this.columns = [
            {text:'id', width:50,dataIndex:'id'},
            {text:'label', width:50,dataIndex:'label',sortable : true},
            {text:'name', width:80,dataIndex:'name'},
            {text:'key', width:150,dataIndex:'key'},
            {text:'value', width:150,dataIndex:'value'},
            {text:'parentkey', width:150,dataIndex:'parentkey'},
            {text:'pinyin', width:150,dataIndex:'pinyin'}
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
			getButton('0106');
	    	obj.doLayout();
		}
    }

});