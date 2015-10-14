Ext.define('SYS.store.DictStore', {
    extend: 'Ext.data.Store',
    autoLoad: true, // 必须自动加载, 否则无在编辑的时候load 
    model:'SYS.model.DictModel',
    remoteSort:true,
    proxy: {
    	type: 'ajax',
        url: 'dict!selectAll.action',
        reader:{
        	root: 'list',  //数据
            totalProperty: 'totalCount' //数据总条数
        },
        simpleSortMode: true  //此选项可以让排序参数不安json格式传递
    },
    sorters: [{
        property: 'id',
        direction: 'ASC'
    }]
});