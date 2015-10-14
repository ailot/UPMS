Ext.define('SYS.view.file.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.filelist', //别名
    store:'FileStore',
    selType: 'checkboxmodel',
    columnLines: true,
    forceFit:true,//自适应列宽
    viewConfig: {
    	enableTextSelection:true,
        emptyText: '<h1 style="margin:20px">没有结果</h1>'
    },
    dockedItems: [{
				dock: 'top', 
			    xtype: 'toolbar', 
			    items: [{ 
			    	id:'name_s',
			        width: 120, 
			        fieldLabel: '文件名', 
			        labelWidth: 50, 
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
		            	Ext.getCmp('name_s').reset();
		            }
		    	}]
				},{
					id:'btn',
    	            xtype: 'toolbar'
				}],
    initComponent: function() {
        this.columns = [{
				 header:'下载',
				 align : 'center',
				 xtype:'actioncolumn',
				 width:40,
				 items:[{
				 	iconCls:'icon-download',
				 	tooltip:'下载',
				 	handler: function(grid, rowIndex, colIndex) {
	                    var rec = grid.getStore().getAt(rowIndex).data.name;
	                    var url='upload';
	                    window.open('file!download.action?filename='+rec);
	                }
				 }]
				 },
                {text: 'id',dataIndex: 'id', width: 100,hidden:true},
        		{text: '文件名', dataIndex: 'name', width:200},
        		{text: '备注',dataIndex: 'bz', width: 80},
        		{text: '时间', dataIndex: 'time', width: 150}
    		];
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
			getButton('0105');
	    	obj.doLayout();
		}
    }

});