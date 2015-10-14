Ext.define('SYS.view.webdisk.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.webdiskAdd',
			title : '新增字典',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			height: 150,
   			width: 300,
			initComponent : function() {
				this.items = [{
							xtype : 'form',
							fieldDefaults : {
								labelAlign : 'right',
								labelWidth : 80,
								width : 260
							},
							defaultType : 'textfield',
							items : [{
										padding : '5 0 0 0',
										name : 'webdisk.type',
										id : 'type',
										fieldLabel : '*type',
										blankText : 'type不能为空',
										allowBlank : false
									}, {
										name : 'webdisk.key',
										id : 'key',
										allowBlank : false,
										fieldLabel : '*key',
										blankText : 'key不能为空',
										allowBlank : false
									}, {
										name : 'webdisk.value',
										id : 'value',
										allowBlank : false,
										fieldLabel : '*value',
										blankText : 'value不能为空',
										allowBlank : false
									}]
						}];

				this.buttons = [{
							text : '保存',
							action : 'save'
						}, {
							text : '取消',
							scope : this,
							handler : this.close
						}];
				this.callParent(arguments);
			}
		});