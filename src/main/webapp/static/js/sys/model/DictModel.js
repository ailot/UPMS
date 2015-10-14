Ext.define('SYS.model.DictModel', {
    extend: 'Ext.data.Model',
	        fields: ['id','label','name','key','value','parentkey','pinyin'],
        idProperty: 'id'      
});