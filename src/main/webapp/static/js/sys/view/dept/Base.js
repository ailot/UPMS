Ext.define('SYS.view.dept.Base', {
			extend : 'Ext.window.Window',
			alias : 'widget.deptBase',
			title : '基数设置',
			resizable:false,
			layout : 'fit',
			autoShow : true,
			modal: true,
			height: 400,
   			width: 450,
			initComponent : function() {
			this.items = [{
				layout : {
						type : 'table',
						columns : 2
					},
				xtype : 'form',
				fieldDefaults : {
					labelAlign : 'right',
					labelWidth : 100,
					width : 200,
					//padding : '10 0 0 0'
					margin:'10 0 0 0'
				},
				defaultType : 'numberfield',
				items : [{
							name : 'deptid',
							id : 'deptid',
							fieldLabel : '机构ID',
							hidden:true
						},{
							name : 'xqcs',
							id : 'xqcs',
							fieldLabel : '辖区村数'
						},{
							name : 'dnjscs',
							id : 'dnjscs',
							fieldLabel : '当年计划村数'
						},{
							name : 'nqkhhs',
							id : 'nqkhhs',
							fieldLabel : '农区客户户数'
						},{
							name : 'nqkhrs',
							id : 'nqkhrs',
							fieldLabel : '农区客户人数'
						},{
							name : 'nqjdkh',
							id : 'nqjdkh',
							fieldLabel : '农区建档客户'
						},{
							name : 'nqxzcs',
							id : 'nqxzcs',
							fieldLabel : '农区辖内行政村数'
						},{
							name : 'wgkhrs',
							id : 'wgkhrs',
							fieldLabel : '务工客户人数'
						},{
							name : 'wgjdkh',
							id : 'wgjdkh',
							fieldLabel : '务工建档客户'
						},{
							name : 'sqkhhs',
							id : 'sqkhhs',
							fieldLabel : '商区客户户数'
						},{
							name : 'yqkhhs',
							id : 'yqkhhs',
							fieldLabel : '园区客户户数'
						},{
							name : 'yqkhrs',
							id : 'yqkhrs',
							fieldLabel : '园区客户人数'
						},{
							name : 'yqjdkh',
							id : 'yqjdkh',
							fieldLabel : '园区建档客户'
						},{
							name : 'sqkhhs',
							id : 'sqkhhs',
							fieldLabel : '商区客户户数'
						},{
							name : 'sqkhrs',
							id : 'sqkhrs',
							fieldLabel : '商区客户人数'
						},{
							name : 'sqjdkh',
							id : 'sqjdkh',
							fieldLabel : '商区建档客户'
						},{
							name : 'sqshs',
							id : 'sqshs',
							fieldLabel : '商区商户数'
						},{
							name : 'yhfs',
							id : 'yhfs',
							fieldLabel : '应回访数'
						},{
							name : 'zgjdhs',
							id : 'zgjdhs',
							fieldLabel : '总建档户数'
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