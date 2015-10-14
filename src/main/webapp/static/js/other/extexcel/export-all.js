/**
 * Created by IntelliJ IDEA.
 * User: lanjs
 * Date: 2012-03-12
 * Time: ����8:31
 * �������� ExtJS-Excel������Ҫ�� .js ���� ExtJSģ��
 *
 * ���ļ���,����Ŀ¼�ṹ��Ҫ�����޸�   ��������&������ϵ Button.js
 */


(function() {
	
    var path = path || "static/js/other/extexcel/";
    Ext.Loader.setConfig({ enabled: true });
    Ext.Loader.setPath('Ext.ux.exporter', path + 'exporter');
    Ext.require([
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.ux.exporter.Exporter'
    ]);
    //$.getScript(path + 'exporter/downloadify.min.js');
    //$.getScript(path + 'exporter/swfobject.js');
    //因为我是动态加载js，必须同步加载，否则后面会出问题	
    $.ajax({url: path + 'exporter/downloadify.min.js',async: false,dataType: "script"})
    $.ajax({url: path + 'exporter/swfobject.js'      ,async: false,dataType: "script"})
    
    console.log("加载完成.........");
})();


/**
 * 自定义方法
 * @param grid
 */
function setExportBtn(grid,name){
	   var win = Ext.getCmp('setExportBtn2014');
	   if(win){
		   win.close();
	   } 
	   Ext.define('setExportBtnWin', {
	    extend: 'Ext.window.Window',
	    alias: 'widget.setExportBtnWin',
	    width:300,
	    id:'setExportBtn2014',
	    height:120,
	    title: '导出excel',layout: 'fit',autoShow: true,modal: true,
	    initComponent: function() {
	        this.items = [
	           {
	               xtype: 'form',
	               layout: {pack: 'center'},
	               region : 'center',
	               html:"<div style='text-align:center'><br/>" +
	               	   "<div style=''>是否导出当前页面显示的数据？<div><br/>" +
	               	   "</div>"
			}];
	        this.buttons = [
							   Ext.create('Ext.ux.exporter.Button', {
					                    component: grid,
					                    downloadName:name
					                }),
	                        {
	                            text: '否',
	                            scope: this,
	                            handler: this.close
	                        }
	                        ]
	        
	        this.callParent(arguments);
	    }
	});
	//创建
	Ext.widget('setExportBtnWin');
	//不同风格的extjs 需要微调按钮位置
	$("#downloadId object").css({'position':'relative','top':'-13px'})
}