<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/taglib.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/view/include/head.jsp" %>
<style type="text/css">
li{
	list-style:none;
}
</style>
</head>
<body>
<script type="text/javascript">
/**
 * 通知公告打开方法
 */
 function openTZ(path){
		window.open (path,'newwindow','height=501,width=650,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no') 
	}
  Ext.require([
               'Ext.app.Portlet',
               'Ext.app.PortalColumn',
               'Ext.app.PortalDropZone',
               'Ext.app.PortalPanel'
           ]);

  Ext.onReady(function(){
	  
	  Ext.create('Ext.container.Viewport', {//填充整个窗口
		  layout:'fit',
		  border:false,
      	  items : [{  
                frame:true,
                xtype: 'portalpanel',
                items:[{
                		   margin:'5 5 5 5',
                           id: 'col-1',
                           items: [{
                               id: 'portlet-2',
                               title: '日历',
                               html: document.getElementById('portlet-2').innerHTML
                           }]
                        },
                        {
                        	margin:'5 5 5 5',
                            id: 'col-2',
                            items: [{
                                id: 'portlet-4',
                                title: '通知公告',
                                html: document.getElementById('portlet-4').innerHTML
                            }]
                        }]
          }],
		  renderTo: Ext.getBody()
		});
  });
  
  </script>
  
  <div style="display:none">
               <div id="portlet-2">
		            <div style="height:350px;overflow:hidden;text-align: center;">
		            
		             </div>
        	   </div>
        	   <div id="portlet-4">
	        	   <div style=" height:350px;  overflow:hidden;">
	        	   <ul id="notice">
	        	   </ul>
					</div>
        	   </div>
     </div>
     
     <script type="text/javascript">
     
   Ext.Ajax.request({
    	    url: 'notice!selectAny.action',
    	    success: function(response){
    	        var data = Ext.decode(response.responseText);
    	        for(var i=0;i<data.length;i++){
    	        	var title = data[i].title;
    	        	var content = data[i].content;
    	        	var time = data[i].time;
    	        	var url = 'notice!selectById.action?id='+data[i].id;
    	        	var list = "<li><img src='${path}/image/btn/text.png' style='position:relative; top:3px'><a href='javascript:;' style='color:#536DA6;font-size:14px' onclick='openTZ(\""+url+"\")' >"+title+"</a><span style='right:50px;position:absolute;'>"+[time]+"</span></li>";
    	        	$("#notice").append(list);
    	        }
    	    },
    	    failure:function(){
    	    	document.getElementById('notice').innerHTML="与服务器连接失败！";
    	    }
    	});
     
     </script>
</body>
</html>