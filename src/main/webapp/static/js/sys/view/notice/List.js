Ext.define('SYS.view.notice.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.noticelist', //别名
    store:'NoticeStore',
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
			    	id:'title_s',
			        width: 100, 
			        xtype:'textfield',
			        fieldLabel: '标题', 
			        labelWidth: 30
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
		            	Ext.getCmp('title_s').reset();
		            }
		    	}]
				},{
					id:'btn',
    	            xtype: 'toolbar'
    	       }],
    initComponent: function() {
        this.columns = [
                {
                	header:'查看',
                	xtype:'actioncolumn',
                	width:80,
                	id:'noticeview',
                	align : 'center',
                	iconCls:'icon-view',
                	dataIndex:'id',
                	handler:function(grid, rowIndex, colIndex){
                		 var rec = grid.getStore().getAt(rowIndex);
                		 this.fireEvent('showClick',{
                		 	record:rec
                		 });
                	}
                },
        		{text: '标题', dataIndex: 'title', width: 300},
        		{text: '内容',dataIndex: 'content', width: 300,hidden:true},
        		{text: '时间',dataIndex: 'time', width: 150}
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
			getButton('0104');
	    	obj.doLayout();
		}
    }

});