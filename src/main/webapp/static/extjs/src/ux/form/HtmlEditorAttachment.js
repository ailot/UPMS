/**
 * HtmlEdit 附件上传组建
 */

Ext.define('Ext.ux.form.HtmlEditorAttachment', {
	extend: 'Ext.util.Observable',
	alias: 'widget.htmlEditorAttachment',
	langTitle : '添加附件',
	langIconCls : 'icon-attachment',
	myBeforeLabelTextTpl: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
	init: function (view) {
	    var scope = this;
	    view.on('render', function () {
	      scope.onRender(view);
	    });
	},
  /**
   * 添加插入附件按钮
   */
  onRender:function(view){
  	var scope = this;
  	//console.log(view.getToolbar().add({text:'button'}));
  	view.getToolbar().add({
  		text:'添加附件',
  		iconCls:scope.langIconCls,
  		tooltip:{
  			title:scope.langTitle,
  			width:60
  		},
  		handler:function(){
  			scope.showAttachmentWin(view);
  		}
  	});
  },
  /**
   * 显示添加附件的窗体
   */
  showAttachmentWin:function(view){
  	var scope = this;
  	Ext.create('Ext.window.Window',{
  		width:400,
  		title:scope.langTitle,
  		layout:'fit',
  		autoShow:true,
  		modal:true,
  		resizable:false,
  		maximizable: false,
  		constrain:true,
  		plain:true,
  		border:false,
  		items:[{
  			xtype:'panel',
  			items:[{
  			xtype:'form',
  			layout:'column',
  			border:false,
  			defaults: {
                labelWidth: 70,
                labelAlign: 'right',
                padding: '5 5 5 5',
                allowBlank: false
            },
  			items:[{
	  			xtype:'filefield',
	  			fieldLabel: '选择文件',
	  			beforeLabelTextTpl:scope.myBeforeLabelTextTpl,
	  			buttonText:'请选择',
	  			name:'file',
	  			emptyText : '请选择文件'
  			},{
  				margin:'10 10',
  				width:330,
	  			xtype:'fieldset',
	  			title: '上传须知',
	  			html:'上传文件不能超过4M'
  			}]
  		}]
  		}],
  		buttons : [{
			text : '保存',
			handler : function(btn){
				scope.saveUploadAttachment(btn,view);
			}
		},{
			text : '取消',
			handler : function(btn){
				btn.up('window').close();
			}
		}]
  	});
  },
  saveUploadAttachment:function(btn,view){
		var scope = this;
		var win= btn.up('window');//获取Window对象
		var formObj = win.down('form');//获取Form对象
		if(formObj.isValid()){ //验证Form表单
			formObj.getForm().submit({
				url : 'file!add.action',
				method : 'POST',
				submitEmptyText : false,
				waitMsg : '正在上传附件,请稍候...',
				timeout : 60000, // 60s
				success : function(form, action){
					var result = action.result;
					Ext.MessageBox.alert('提示',action.result.msg);
					scope.insertAttachment(view,result);
					win.close();//关闭窗体
				},
				failure : function(form, action){
					Ext.MessageBox.alert('提示',action.result.msg);
				}
			});
		}
	},
	/**
	 * 插入附件
	 */
	insertAttachment : function(view, result){
		var scope = this;
		var url = result.url;
		var fileName = result.fileName;
		var str = '&nbsp;<a  target="_blank" href="' + url + '&downurl=upload" ';
		str += ' >'+fileName+'</a>&nbsp;<br>';
		view.insertAtCursor(str);
	}
});