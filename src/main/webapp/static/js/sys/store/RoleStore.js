Ext.define('SYS.store.RoleStore', {
	autoLoad: true, // 必须自动加载, 否则无在编辑的时候load 
    extend: 'Ext.data.Store',
    model:'SYS.model.RoleModel',
    remoteSort:true,
    proxy: {
    	type: 'ajax',
    	url: 'role!selectAll.action',
    	reader:{
        	root: 'list',  //数据
            totalProperty: 'totalCount' //数据总条数
        	},
        simpleSortMode: true  //此选项可以让排序参数不安json格式传递
        },
    sorters: [{
        property: 'roleid',
        direction: 'ASC'
    }]
});