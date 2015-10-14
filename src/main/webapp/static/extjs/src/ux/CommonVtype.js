Ext.define('Ext.ux.CommonVtype', {
	vtype:function(){
		Ext.apply(Ext.form.field.VTypes, {
				  checkName : function(value,field) {//验证方法名
				  			var flag = false;
				  			var id = null;
				  			if(field.checkName){
				  				id = Ext.getCmp(field.checkName.targetComId).getValue();
				  				console.log(id);
				  			}
				  			Ext.Ajax.request({
								url: 'user!checkLoginName.action',
								async:false,  
								method: 'POST',
								params: {
									'username':value,
									'userid':id
								},
								success: function(response, opts) {
				        		var data = Ext.decode(response.responseText);
				        		flag = data.success;
								}
						  });
								return flag;
				   		},
				   	checkNameText : '存在相同的用户名！'
			});
	}
});