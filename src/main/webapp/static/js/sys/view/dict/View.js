Ext.define('SYS.view.dict.View', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.dictView',
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
										name : 'id',
										id : 'id',
										fieldLabel : '*id',
										hidden:true
									}, {
										name : 'label',
										id : 'label',
										allowBlank : false,
										fieldLabel : '*label',
										blankText : 'label不能为空',
										allowBlank : false
									}, {
										name : 'name',
										id : 'name',
										allowBlank : false,
										fieldLabel : '*name',
										blankText : 'name不能为空',
										allowBlank : false
									}, {
										name : 'key',
										id : 'key',
										allowBlank : false,
										fieldLabel : '*key',
										blankText : 'key不能为空',
										allowBlank : false
									}, {
										name : 'value',
										id : 'value',
										allowBlank : false,
										fieldLabel : '*value',
										blankText : 'value不能为空',
										allowBlank : false
									}, {
										name : 'parentkey',
										id : 'parentkey',
										allowBlank : false,
										fieldLabel : '*parentkey'
									}]
						}];

				this.callParent(arguments);
			}
		});