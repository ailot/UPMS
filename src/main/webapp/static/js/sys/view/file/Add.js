Ext.define('SYS.view.file.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.fileAdd',
			title : '文件上传',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			height: 200,
   			width: 300,
			initComponent : function() {
		    	this.items=[{
		    		xtype:'form',
		    		border:false,
		    		fieldDefaults: {
		            	labelAlign : 'right',
		            	width: 250,
		                labelWidth: 50,
		                margin:'10 0 0 0'
		            	},
		    		items:[{
		    			fieldLabel:'文件',
						name : 'file',
						xtype : 'filefield',
						blankText:'文件名不能为空',
						buttonText:'浏览...',
						//inputType:'file',
						allowBlank : false
		    		},{
		    			fieldLabel:'备注',
						name : 'bz',
						xtype : 'textarea',
						emptyText:'上传文件不要超过4M'
		    		}]
		    	}];
		    	
		    	this.buttons=[{
		            text: '上传',
		            action: 'save'
		        },{
		            text: '取消',
		            scope:this,
		            handler:this.close
		        }];
		    	
		        this.callParent(arguments);
		    }
		});