
Ext.define('SYS.view.dict.Update', {
    extend: 'Ext.window.Window',
    alias: 'widget.dictUpdate',
    title: '修改字典',
    resizable:false,
    layout: 'fit',
    autoShow: true,
    modal: true,
    initComponent: function() {
    	
    	this.items = [{
			xtype : 'dictView'
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