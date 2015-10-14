Ext.define('SYS.store.FieldStore', {
	autoLoad: true, // 必须自动加载, 否则无在编辑的时候load 
    extend: 'Ext.data.Store',
    model:'SYS.model.FieldModel',
    remoteSort:true,
    proxy: {
    	type: 'ajax',
    	url: 'field!selectAll.action?label=FIELD&table=BaseInfoSelfDict&dlabel=ORTY',
    	reader:{
        	root: 'list',  //数据
            totalProperty: 'totalCount' //数据总条数
        	},
        simpleSortMode: true  //此选项可以让排序参数不安json格式传递
        },
    sorters: [{
        property: 'dictlable',
        direction: 'DESC'
    }]
});