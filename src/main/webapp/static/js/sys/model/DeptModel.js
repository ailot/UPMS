Ext.define('SYS.model.DeptModel', {
    extend: 'Ext.data.Model',
	        fields: ['deptid','deptname','parentid','areacode','areaname','state','phone'],
        idProperty: 'deptid'      
});