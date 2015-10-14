/**
 * 公用方法：保存
 * 参数：保存按钮、地址
 */

Ext.define('Ext.ux.CommonSave', {
	
	common_save : function(button, url, obj, fun) { //公用保存方法
				if (obj == null) {
					obj = this;
				}
				var store = obj.store();
				var grid = obj.grid();
				var win = button.up('window'), //获得编辑用户窗口的引用
				form = win.down('form');//获得form
				if (form.isValid()) {
					if (form.isDirty()) {
						form.getForm().submit({
							clientValidation:true,//表单验证
							waitTitle : '请稍候',
							waitMsg : '正在执行操作...',
							url : url,
							method : 'POST',
							submitEmptyText : false,
							success : function(form, action) {//正确提示，返回的json必须要有success项 
								win.close();
								Ext.MessageBox.show({
											title : '提示',
											msg : action.result.msg,
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.INFO
										});
								if (fun != null) {
									fun();
								};
								grid.getSelectionModel().deselectAll();
								store.reload();
							},
							failure : function(form, action) {//错误提示
								Ext.MessageBox.show({
											title : '提示',
											msg : action.result.msg,
											buttons : Ext.Msg.OK,
											icon : Ext.Msg.ERROR
										});
							}
						});
					}
				}else{
					Ext.MessageBox.alert('提示', '请检查所输入的值！');
				}
			}
		});
