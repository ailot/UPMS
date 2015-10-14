Ext.define('SYS.model.NoticeModel', {
    extend: 'Ext.data.Model',
	        fields: [
				'id',
				'title',
				'content',
				'time'
	        ],
	        idProperty: 'id'    
});