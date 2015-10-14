Ext.define('SYS.view.notice.View', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.noticeView',
			requires:['Ext.ux.form.AttachmentField'],
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			height:250,
   			width:800,
			initComponent : function() {
				this.items = [{
							xtype : 'form',
							fieldDefaults : {
								labelAlign : 'right',
								labelWidth : 60,
								width : 500,
								margin:'10 0 0 0'
							},
							defaultType : 'textfield',
							items : [{
									name : 'id',
									id : 'id',
									fieldLabel : 'id',
									hidden:true
								},{
									name : 'title',
									id : 'title',
									fieldLabel : '标题',
									allowBlank:false
								},{
									xtype:'attachmentField',
									name : 'content',
									id : 'content',
									width : 760,
									height:200,
									fieldLabel : '内容',
									allowBlank:false
								}]
						}];

				this.callParent(arguments);
			}
		});