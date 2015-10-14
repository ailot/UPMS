Ext.define('SYS.store.UserStore', {
	autoLoad: true, // 必须自动加载, 否则无在编辑的时候load 
    extend: 'Ext.data.Store',
    //remoteSort: true,	//开启此选项会返回当前新增的那条记录的信息
    remoteSort:true,
    model:'SYS.model.UserModel',
    proxy: {
    	type: 'ajax',
    	url: 'user!selectAll.action',
    	reader:{
        	root: 'list',  //数据
            totalProperty: 'totalCount' //数据总条数
        	},
        simpleSortMode: true	//远程排序请求
    },
    sorters: [{
        property: 'userid',
        direction: 'DESC'
    }]

});