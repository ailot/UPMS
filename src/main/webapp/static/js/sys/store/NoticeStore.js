Ext.define('SYS.store.NoticeStore', {
	autoLoad: true, // 必须自动加载, 否则无在编辑的时候load 
    extend: 'Ext.data.Store',
    model:'SYS.model.NoticeModel',
    remoteSort:true,
    proxy: {
    	type: 'ajax',
    	url: 'notice!selectAll.action',
        reader:{
        	root: 'list',  //数据
            totalProperty: 'totalCount' //数据总条数
        	},
        simpleSortMode: true
    },
    sorters: [{
        property: 'id',
        direction: 'DESC'
    }]

});