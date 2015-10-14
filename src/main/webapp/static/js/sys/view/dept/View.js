Ext.define('SYS.view.dept.View', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.deptView',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			height: 180,
   			width: 300,
			initComponent : function() {
				this.items = [{
							xtype : 'form',
							fieldDefaults : {
								labelAlign : 'right',
								labelWidth : 100,
								width : 260,
								//padding : '10 0 0 0'
								margin:'10 0 0 0'
							},
							defaultType : 'textfield',
							items : [{
										name : 'deptid',
										id : 'deptid',
										fieldLabel : '机构ID',
										//allowBlank : false,
										hidden:true
									}, {
										name : 'deptname',
										id : 'deptname',
										allowBlank : false,
										fieldLabel : '单位名称',
										allowBlank : false
									}, {
										name : 'parentid',
										id : 'parentid',
										allowBlank : false,
										fieldLabel : '单位级别',
										xtype:'combobox',
										editable:false,
										store:[
										['1','一级'],
										['2','二级']
										]
									},treeMenu('所属政区','areacode','SBPL',false,false),
									{
										name : 'person',
										id : 'person',
										fieldLabel : '联系人'
									}, {
										name : 'phone',
										id : 'phone',
										fieldLabel : '联系电话'
									}]
						}];

				this.callParent(arguments);
			}
		});