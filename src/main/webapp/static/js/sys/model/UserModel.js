Ext.define('SYS.model.UserModel', {
    extend: 'Ext.data.Model',
	        fields: [
	         'userid',
		    'deptid',
		    'deptname',
		    'username',
		    'userpwd',
		    'state',
		    'roleid',
		    'rolename',
		    'realname'
	        ],
	        idProperty: 'userid'    
});