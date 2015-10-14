    Ext.onReady(function() {

// sample static data for the store
        var myData = [
            ['你好好', 71.72, 0.02, 0.03, '9/1 12:00am'],
            ['你好好 Inc', 29.01, 0.42, 1.47, '9/1 12:00am'],
            ['Altria Group Inc', 83.81, 0.28, 0.34, '9/1 12:00am'],
            ['American Express Company', 52.55, 0.01, 0.02, '9/1 12:00am'],
            ['你好好 International Group, Inc.', 64.13, 0.31, 0.49, '9/1 12:00am'],
            ['AT&T Inc.', 31.61, -0.48, -1.54, '9/1 12:00am'],
            ['你好好 Co.', 75.43, 0.53, 0.71, '9/1 12:00am'],
            ['Caterpillar Inc.', 67.27, 0.92, 1.39, '9/1 12:00am'],
            ['Citigroup, Inc.', 49.37, 0.02, 0.04, '9/1 12:00am'],
            ['E.I. du Pont de Nemours and Company', 40.48, 0.51, 1.28, '9/1 12:00am'],
            ['Exxon Mobil Corp', 68.1, -0.43, -0.64, '9/1 12:00am'],
            ['General Electric Company', 34.14, -0.08, -0.23, '9/1 12:00am'],
            ['General Motors Corporation', 30.27, 1.09, 3.74, '9/1 12:00am'],
            ['Hewlett-Packard Co.', 36.53, -0.03, -0.08, '9/1 12:00am'],
            ['Honeywell Intl Inc', 38.77, 0.05, 0.13, '9/1 12:00am'],
            ['Intel Corporation', 19.88, 0.31, 1.58, '9/1 12:00am'],
            ['International Business Machines', 81.41, 0.44, 0.54, '9/1 12:00am'],
            ['Johnson & Johnson', 64.72, 0.06, 0.09, '9/1 12:00am'],
            ['JP Morgan & Chase & Co', 45.73, 0.07, 0.15, '9/1 12:00am'],
            ['McDonald\'s Corporation', 36.76, 0.86, 2.40, '9/1 12:00am'],
            ['Merck & Co., Inc.', 40.96, 0.41, 1.01, '9/1 12:00am'],
            ['Microsoft Corporation', 25.84, 0.14, 0.54, '9/1 12:00am'],
            ['Pfizer Inc', 27.96, 0.4, 1.45, '9/1 12:00am'],
            ['The Coca-Cola Company', 45.07, 0.26, 0.58, '9/1 12:00am'],
            ['The Home Depot, Inc.', 34.64, 0.35, 1.02, '9/1 12:00am'],
            ['The Procter & Gamble Company', 61.91, 0.01, 0.02, '9/1 12:00am'],
            ['United Technologies Corporation', 63.26, 0.55, 0.88, '9/1 12:00am'],
            ['Verizon Communications', 35.57, 0.39, 1.11, '9/1 12:00am'],
            ['Wal-Mart Stores, Inc.', 45.45, 0.73, 1.63, '9/1 12:00am']
        ];
        // create a model for the Business
        Ext.define('Business', { extend: 'Ext.data.Model',
            fields: [
                {name: 'company'},
                {name: 'price', type: 'float'},
                {name: 'change', type: 'float'},
                {name: 'pctChange', type: 'float'},
                {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
            ]});
        // create the data store
        var myStore = Ext.create('Ext.data.ArrayStore', {
            model: 'Business',
            data: myData
        });
        //create the Grid
//        var exportButton = Ext.create('Ext.ux.exporter.Button', {
//
//        component: Ext.getCmp('grid'),
//            text: "导出 Excel",
//           // store: myStore,
//            swfPath: './downloadify.swf',
//            downloadImage: './download.png'
//        });
        var grid = Ext.create('Ext.grid.Panel', {
            store: myStore,
            stateful: true,
            id:'grid',
            stateId: 'stateGrid',
            columns: [
                {
                    text : '公司',
                    flex : 1,
                    sortable : false,
                    dataIndex: 'company'
                },
                {
                    text : '价格',
                    width : 75,
                    sortable : true,
                    renderer : 'usMoney',
                    dataIndex: 'price'
                },
                {
                    text : '变动',
                    width : 75,
                    sortable : true,

                    dataIndex: 'change'
                },
                {
                    text : '变动百分比',
                    width : 75,
                    sortable : true,

                    dataIndex: 'pctChange'
                },
                {
                    text : '更新日期',
                    width : 85,
                    sortable : true,
                    renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                    dataIndex: 'lastChange'
                }
            ],
            height: 350,
            width: 600,
            title: 'Array Grid',
            renderTo: 'grid-example',
            viewConfig: {
                stripeRows: true
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        Ext.create('Ext.ux.exporter.Button', {
                            component: Ext.getCmp('grid'),
                            text: "导出 Excel"
                        })
//                        {
//						    xtype: 'exporterbutton',
//						    store: myStore
//
//                            //一下两项配置  已在Buttion.js中 配置了默认路径 不需要重复指定
//                            //swfPath: './downloadify.swf',
//                            //downloadImage: './download.png',
//
//                            //这里可以根据当表格 给 定制导出的文件名
//                            //downloadName:'导出的Excel 名字'
//						}
                    ]
                }
            ]
        });
    });