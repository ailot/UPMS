		/** fieldStyle:fieldStyle_,   文本风格，只可读 */
		var fieldStyle_ = "background-color: #DDDDDD;background-image: none;";
		// 保存方法
	    function funExtjsFormSave(form,url,store){
	    	 //公用保存方法
	    	if (form.isValid()) {
	    		form.getForm().submit({
	        		waitTitle: '请稍候',
	        		waitMsg: '正在执行操作...',
	        		url: url,
	        		method: 'POST',
	        		success: function(tform, action){//正确提示，返回的json必须要有success项 
	        					//是否有回调操作
	        					var info = action.result.msg;
	                         	Ext.MessageBox.alert('提示!', info || '保存成功！');
	                         	form.up('window').close();
	                         	if(store)
		                         	store.reload();
	        				 },
	        		failure: function(form,action){//错误提示
	        					console.log(action.result)
	        				 	Ext.MessageBox.alert('错误信息!', "保存失败："+action.result.msg);
	        			     }
	        		});
	        }else{ //表单验证失败
	        	Ext.MessageBox.alert('提示!', '请检查所输入的值！');
	        }
	    }
	//判断是空还是NULL
		function is_null(v){
			if(typeof(v)=="undefined"){
	    		return true;
	    	}else if(v==null||v==""){
	    		return true;
	    	}else{
	    		return false;
	    	}
		}
		
		//判断true和false
		function is_boolean(v){
			if(typeof(v)=="boolean"){
	    		if(v){
	    			return "1";
	    		}else{
	    			return "0";
	    		}
	    	}else if(v==="true"){
	    		return "1";
	    	}else{
	    		return "0";
	    	}
		}
		
		/** 分页工具 用法pagingFun(store) 默认是一页25  */
		function pagingFun(store,page){
	    	if(page == null){page = 25}
	    	var paging = Ext.create('Ext.PagingToolbar', {	 // paging bar on the
	    		store:store, 
	    		displayInfo:true,
	    		scope: this,
	    		//displayMsg:'当前显示 {0} - {1} 共计 {2}', 
	    		emptyMsg:"没有数据", 
	            items: [{
	                 xtype: 'combobox',
	                 fieldLabel: '每页显示',      
	                 labelWidth: 60,
	                 width:120,
	                 editable:false,
	                 value: page,
	                 store: [
	    				['25','25'],
		             	['100','100'],
		            	['200','200'],
		           	    ['300','300'],
		                ['500','500'],
		                ['1000','1000']
	              	],
	                listeners:{
	                    change: function(field, newValue, oldValue){
	                    	if(typeof store!="object"){
					        		//store不是要求的对象时，重新获取一遍
					            	store = field.up('toolbar').up('grid').store
					        	}
	                    	store.pageSize = newValue;
	                    	store.on('beforeload', function (store, options) {
	                            var new_params = { "limit":newValue};
	                            Ext.apply(store.proxy.extraParams, new_params);
	                       	});
	                    	store.loadPage(1);
	                    }
	             	}
	            
	        	},
	            /**
	        	 * 导出按钮  
	        	 * grid里参数： 
	        	 * name : 导出文件名
	        	 * columns里参数：
	        	 * hidden:true (false不导出,true导出) 
	        	 * exporter:'false' ('false'强制不许导出,'true'强制导出) 
	        	 * 
	        	 */
	        	{xtype:'button',text : "导出excel",iconCls: "icon-grid",
	        		handler:function(obj){   
	        			console.log(1);
	        			//此地址注意配置成 部署地址  ,还有js/other/extexcel/export-all.js及button里的path参数，配置部署地址
	        			$.getScript("static/js/other/extexcel/export-all.js", function(){
	        				var grid = obj.up('toolbar').up('grid');
		        			setExportBtn(grid,grid.name||'数据');
	        			});
	        			
	        		}
	        	}
	            ]
	    	})
	    	return paging;
	    }

		//显示加载中.....MYMASK_.show(); MYMASK_.hiden();
		var MYMASK_SHOW = function(){
			MYMASK_ = new Ext.LoadMask(Ext.getBody(), {
	            msg: '正在执行，请稍后...',
	            removeMask: true     //完成后移除
				});
			MYMASK_.show();
		}
		var MYMASK_HIDE = function(){
			MYMASK_.hide();
		}
		//防止ie下的console报错.
		if(!window.console){
	        window.console={}
	        window.console.log=function(){return;}
		}
		
		/*公用批量操作方法（删除，更新。。。）*/
		function pubOper(obj,text,action,info,pk){
	    	var ids="";
	    	var grid = obj.grid();
	    	var store = obj.store();
	    	var record = grid.getSelectionModel().getSelection(); 
	    	if(record.length==0){
	    		Ext.Msg.alert('提示', "请至少选择一条记录！");
				return;
			}
	    	if(pk == '' || pk == null){
	    		pk = 'id'	//默认pk为主键
	    	}
			for(var i=0; i<record.length; i++){
	    			ids += ","+record[i].get(pk);
	    	}
	    	/*去掉第一个逗号*/
	    	ids = ids.substring(1);
			Ext.MessageBox.confirm(text, info, function(btn){if(btn == 'yes'){
				//MYMASK_SHOW();
	    		Ext.Ajax.request({    
	    			url: action,    
	    			params: {
	    				'ids':ids 
	    				},   
	    			success: function(response){  
	    				//MYMASK_HIDE();
	    				var data = Ext.decode(response.responseText);
	    				if(data.success){
	    					Ext.MessageBox.show({
	    						title:'提示',
	    						msg:data.msg,
	    						buttons:Ext.Msg.OK,
	    						icon:Ext.Msg.INFO
	    					});
	    					store.reload();
	    					grid.getSelectionModel().deselectAll();
	    				}else{
	    					//Ext.MessageBox.buttonText.cancel='确定';
	    					Ext.MessageBox.show({
	    						title:'提示',
	    						msg:data.msg,
	    						buttons:Ext.Msg.OK,
	    						icon:Ext.Msg.ERROR
	    					});
	    				}	
	    				
	    			}
	    		});
			}});
		}
		
		/*公用更新，传入sql语句，慎用*/
		function pubUpdate(obj,action,info,sql){
	    	var grid = obj.grid();
	    	var store = obj.store();
	    	var record = grid.getSelectionModel().getSelection(); 
	    	if(record.length==0){
	    		Ext.Msg.alert('提示', "请至少选择一条记录！");
				return;
			}
				Ext.MessageBox.confirm('提示', info, function(btn){if(btn == 'yes'){
					MYMASK_SHOW();
		    		Ext.Ajax.request({    
		    			url: action,    
		    			params: {
		    				'sql':sql
		    				},   
		    			success: function(response){  
		    				MYMASK_HIDE();
		    				var data = Ext.decode(response.responseText);
		    				if(data.success){
		    					Ext.MessageBox.show({
		    						title:'提示',
		    						msg:data.msg,
		    						buttons:Ext.Msg.OK,
		    						icon:Ext.Msg.INFO
		    					});
		    					store.reload();
		    					grid.getSelectionModel().deselectAll();
		    				}else{
		    					//Ext.MessageBox.buttonText.cancel='确定';
		    					Ext.MessageBox.show({
		    						title:'提示',
		    						msg:data.msg,
		    						buttons:Ext.Msg.OK,
		    						icon:Ext.Msg.ERROR
		    					});
		    				}	
		    				
		    			}
		    		});
				}});
		}
		
		function selOper(obj,text,action,info,pk,state){
	    	var v="";
	    	var grid = obj.grid();
	    	var store = obj.store();
	    	var record = grid.getSelectionModel().getSelection(); 
	    	if(record.length==0){
	    		Ext.Msg.alert('提示', "请至少选择一条记录！");
				return;
			}
	    	if(pk == '' || pk == null){
	    		pk = 'id'	//默认pk为主键
	    	}
			for(var i=0; i<record.length; i++){
	    			v += ","+record[i].get(pk);
	    	}
	    	v = v.substring(1);
				Ext.MessageBox.confirm(text, info, function(btn){if(btn == 'yes'){
					MYMASK_SHOW();
		    		Ext.Ajax.request({    
		    			url: action,    
		    			params: {
		    				'id':v ,
		    				'state':state
		    				},   
		    			success: function(response){  
		    				MYMASK_HIDE();
		    				var data = Ext.decode(response.responseText);
		    				if(data.success){
		    					Ext.MessageBox.show({
		    						title:'提示',
		    						msg:data.msg,
		    						buttons:Ext.Msg.CANCEL,
		    						icon:Ext.Msg.INFO
		    					});
		    					store.reload();
		    					grid.getSelectionModel().deselectAll();
		    				}else{
		    					//Ext.MessageBox.buttonText.cancel='确定';
		    					Ext.MessageBox.show({
		    						title:'提示',
		    						msg:data.msg,
		    						buttons:Ext.Msg.CANCEL,
		    						icon:Ext.Msg.ERROR
		    					});
		    				}	
		    				
		    			}
		    		});
				}});
		}
		
		function resetPwd(obj,text,action,info,pk){
	    	var v="";
	    	var grid = obj.grid();
	    	var store = obj.store();
	    	var record = grid.getSelectionModel().getSelection(); 
	    	if(record.length==0){
	    		Ext.Msg.alert('提示', "请至少选择一条记录！");
				return;
			}
	    	if(pk == '' || pk == null){
	    		pk = 'id'	//默认pk为主键
	    	}
			for(var i=0; i<record.length; i++){
	    			v += ","+record[i].get(pk);
	    	}
	    	v = v.substring(1);
				Ext.MessageBox.confirm(text, info, function(btn){if(btn == 'yes'){
					MYMASK_SHOW();
		    		Ext.Ajax.request({    
		    			url: action,    
		    			params: {
		    				'id':v 
		    				},   
		    			success: function(response){  
		    				MYMASK_HIDE();
		    				var data = Ext.decode(response.responseText);
		    				if(data.success){
		    					Ext.MessageBox.show({
		    						title:'提示',
		    						msg:data.msg,
		    						buttons:Ext.Msg.CANCEL,
		    						icon:Ext.Msg.INFO
		    					});
		    					store.reload();
		    					grid.getSelectionModel().deselectAll();
		    				}else{
		    					Ext.MessageBox.buttonText.cancel='确定';
		    					Ext.MessageBox.show({
		    						title:'提示',
		    						msg:data.msg,
		    						buttons:Ext.Msg.CANCEL,
		    						icon:Ext.Msg.ERROR
		    					});
		    				}	
		    				
		    			}
		    		});
				}});
		}
		
		/**
		 * 按钮权限配置方法，传入的参数是对应按钮的父级菜单key
		 * @param parentid
		 */
		function getButton(parentid){
			Ext.Ajax.request({    
    			url: 'right!selectButton.action',
    			async:false,
    			params: {
    				'roleid':Ext.getDom('s_roleid').value,
    				'parentid':parentid
    				},   
    			success: function(response){  
    				var data = Ext.decode(response.responseText);
    				if(data.success){
    					var info = data.msg;
    					for(var i=0;i<info.length;i++){
    						var btns = {
    							id:info[i].rightid,
    							//style:'background:#cccccc',
						        text:info[i].rightname,
						        iconCls: 'icon-'+info[i].menuurl,
						        action:info[i].menuurl
    						}
    						Ext.getCmp('btn').add(btns);
    					}
    				}else{
    					Ext.Msg.alert('提示',data.msg);
    				}	
    				
    			}
    		});
		}
