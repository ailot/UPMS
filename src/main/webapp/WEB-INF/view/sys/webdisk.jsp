<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/view/include/head.jsp"%>
<link rel="stylesheet" href="${path }/css/disk.css">
<link rel="stylesheet" href="${path }/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="${path }/zTree/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="${path }/zTree/js/jquery.ztree.exedit-3.5.min.js"></script>
<script type="text/javascript" src="${path }/drop/progressBar.js"></script>
<script type="text/javascript" src="${path }/drop/dragable.js"></script>
<script type="text/javascript" src="${path }/drop/droppable.js"></script>
<script type="text/javascript" src="${path }/promptBox/jquery.pop.js"></script>
<link rel="stylesheet" href="${path }/promptBox/style.css">
<script type="text/javascript" src="${path }/uploadify/jquery.uploadify.min.js"></script>
<link rel="stylesheet" href="${path }/uploadify/uploadify.css"/>
<link rel="stylesheet" href="${path }/contextmenu/theme/contextmenu.css"/>
<script type="text/javascript" src="${path }/contextmenu/jquery.contextmenu.js"></script>
</head>
<body>
	<div id="main">
		<div id="left">
			<div id="netdisk">
				<span id="space_bar">空间概览：资源(${diskInfo.filenumber})</span>
			</div>
			<div>
				<span id="shareIndex">分享的资源</span>
			</div>
			<div id="dir_tree">
				<span id="myDisk">我的网盘</span>
				<ul id="my_file_tree" class="ztree" style="margin-top:40px"></ul>
			</div>
		</div>
		<div id="right">
			<div id="mydisk">
				<div id="file_path">
					<div id="path_wrap">
						<div id="root">
							<span>我的网盘</span>:
						</div>
						<div id="children_path"></div>
					</div>
				</div>
				<div id="tools_bar">
					<span id="mkdir">新建文件夹</span> 
					<span id="upload">上传<span id="upload_button"></span></span>
					<!-- <span id="share">分享主页</span> -->
				</div>
				<div id="folder">
					<ul>
					</ul>
				</div>
			</div>
		<div id="myshare">
			<div id="file_path">
				<div id="path_wrap">
					<div id="root">
						<span>分享的资源</span>:
					</div>
				</div>
			</div>
			<div id="shareResource">
			</div>
		</div>
		</div>
	</div>
	<div id="upload_queue"></div>
	<script type="text/javascript">
		var store = Ext.create('Ext.data.Store',{
			fields:['id','userid','username','name','type','createtime','shareurl','sharedownload'],
			autoLoad:true,
			proxy:{
				type:'ajax',
				url:'share!files.action',
				reader: {
		             type: 'json',
		             root: 'list'
		         }
			}
		});
		Ext.create('Ext.grid.Panel', {
		    layout:'fit',
		    columnLines: true,
		    forceFit:true,//自适应列宽
		    store:store,
		    columns:[{
				 header:'下载',
				 align : 'center',
				 xtype:'actioncolumn',
				 width:40,
				 items:[{
				 	iconCls:'icon-download',
				 	tooltip:'下载',
				 	handler: function(grid, rowIndex, colIndex) {
	                    var rec = grid.getStore().getAt(rowIndex).data;
	                    window.open(rec.shareurl+"?shareId="+rec.id);
	                }
				 }]
				 },{
		    	text:'id',
		    	dataIndex:'id',
		    	hidden:true
		    },{
		    	text:'userid',
		    	dataIndex:'userid',
		    	hidden:true
		    },{
		    	text:'分享文件',
		    	dataIndex:'name'
		    },{
		    	text:'文件类型',
		    	dataIndex:'type'
		    },{
		    	text:'分享地址',
		    	dataIndex:'shareurl',
		    	hidden:true
		    },{
		    	text:'下载次数',
		    	dataIndex:'sharedownload'
		    },{
		    	text:'分享人',
		    	dataIndex:'username'
		    },{
		    	text:'创建时间',
		    	dataIndex:'createtime'
		    }],
		    renderTo: "shareResource"
		});
		
		$("#shareIndex").click(function(){
			store.reload();
			$("#myshare").show();
			$("#mydisk").hide();
		});
		
		$("#myDisk").click(function(){
			$("#mydisk").show();
			$("#myshare").hide();
		});
		
		var file_template = 
			"<li class='file'>" +
				"<span class='file_icon'>"+
					"<span class='share'></span>"+
				"</span>" +
				"<span class='file_name' title='双击重命名'></span>" +
			"</li>";
		var ztree;
		/*zTree处理异步加载返回得的数据*/
   		var dataFilter = function(tId, pNode, myFiles){
   			if(myFiles){
   				var myFile;
   				for(var i=0;i<myFiles.length;i++){
   					myFile = myFiles[i];
   					if(myFile.type != "adir"){
   						myFile.icon = "${path}/image/filetype/" + myFile.type+".gif";
   					}else {
   						myFile.isParent = true;
   					}
   				}
   			}
   			return myFiles;
   		};
   		
   		/*zTree的context*/
   		var setting = {
   				async : {
   					enable 		: true,
   					autoParam 	: ["id"],
   					url 		: "disk!selectByFolderId.action",
   					dataFilter	: dataFilter
   				},
   				data:{keep:{parent:true}},
   				callback : {
   					beforeAsync : function(tId, tNode){
   						if(tNode.isLock == 1){
   							return false;
   						}
   						return true;
   					},
   					onAsyncSuccess : function(event, treeId, tNode, msg) {
   						if(tNode.isClick) {
   							listFiles(tNode);
   						}
   					},
   					/*双击目录树，显示文件夹内容*/
   					onClick : function(event, treeId, tNode){						
   						if(tNode.type != "adir"){
   							return;
   						}
   						if(tNode.isParent && tNode.isClick == null) {
   							tNode.isClick = true;
   						}
   						if(tNode.zAsync == false) {
   							zTree.reAsyncChildNodes(tNode,"refresh",true);
   						}else {
   							listFiles(tNode);
   						}
   					}
   				}
   			};
   		/*初始化的sTree*/
   		var zNodes = [{
   			isParent		: true,
   			name 			: "我的网盘",
   			open 			: true,
   			id 				: '${homeId}',
   			type			: "adir"
   		}];
   		/*初始化zTree并加载根目录*/
   		$(document).ready(function() {
   			zTree = $.fn.zTree.init($("#my_file_tree"), setting, zNodes);
   			
   			var root = zTree.getNodeByTId("my_file_tree_1");
   			zTree.reAsyncChildNodes(root,"refresh",true);
   			$("#root span").data("node_id","my_file_tree_1").data("file_id",'${homeId}');
   			root.isClick = true;
   		});
   		
   		/*获得字符串实际长度，中文2，英文1，要获得长度的字符串 */
		var getRealStrLen = function(str) {
			var realLen = 0, len = str.length, charCode = -1;
			for (var i = 0; i < len; i++) {
				charCode = str.charCodeAt(i);
				if (charCode >= 0 && charCode <= 128){
					realLen += 1;
				}else{
					realLen += 2;
				}
			}
			return realLen;
		};
		
		/*限制字符串的长度，超过长度后面用省略号覆盖*/
		var strLimit = function(str,len){
			if(str.length > 20){
				return str.substr(0,18)+"..."; 
			}else{
				return str;
			}
		}
		
		/*取得某个树节点的路径*/
		var createPath = function(tNode){
			var tempNode = tNode;
			var cPath = $("#children_path");
			cPath.html("");
			
			while(tempNode.getParentNode() != null){
				cPath.prepend($("<span/>").
						data("file_id",tempNode.id).
						data("node_id",tempNode.tId).
						addClass("lock_"+tempNode.isLock).
						html(tempNode.name));
				cPath.prepend("》");
				tempNode = tempNode.getParentNode();
			} 
		}
		
		/*把文件夹的内容展示在右边窗口里*/
		var listFiles = function(tNode){
			$("#folder").data("folder_id",tNode.id).data("node_id",tNode.tId);
			createPath(tNode);
			var files = tNode.children;
			var file,folder = $("#folder ul");
			folder.html("");
			for(var i=0;i<files.length;i++){
				file = $(file_template);
				if(files[i].type == "adir"){
					file.addClass("folder");
				}
				file.find(".file_icon").
					addClass(files[i].type + " share_" + files[i].isshare).
					data("file_id",files[i].id).
					data("node_id",files[i].tId).
					attr("title",files[i].name);
			
				file.find(".file_name").html(strLimit(files[i].name,20));
				folder.append(file);
			}
		}
		
		/*上传或新建文件夹时更新界面*/
		var addFile = function(data){
			if(data.type == "adir"){
				data.isParent = true;
			}else{
				data.icon = "/image/filetype/" + data.type+".gif";
			}
			
			var tarNode = zTree.getNodeByTId($("#folder").data("node_id")),
    			file = $(file_template),
    			newNode = zTree.addNodes(tarNode,data,true);
			if(data.type == "adir"){
				file.addClass("folder");
			}
    		file.find(".file_icon").
	    		data("file_id",data.id).
	    		data("node_id",newNode[0].tId).
	    		addClass(data.type + " share_0").
	    		attr("title",data.name);

			file.find(".file_name").html(strLimit(data.name,20));
			$("#folder ul").append(file);
		}
		
		/*打开文件*/
		var openFile = function(f){
			var tNode = zTree.getNodeByTId(f.data("node_id"));
			if(f.hasClass("lock_1") && !f.find("#input_pwd")[0]){
				unlockFile(f);
			}else if(tNode.zAsync == false){
				zTree.reAsyncChildNodes(tNode,"refresh",true);
				tNode.isClick = true;
			}else{
				listFiles(tNode);
			}
		}
		/*文件分享*/
		var share = function(f){
			var url = "disk!share.action",
				data = {"fileId":f.data("file_id")};
				
			$.post(url,data,function(data){
				if(data.success){
					var tNode = zTree.getNodeByTId(f.data("node_id"));
					tNode.isShare = 1;
					zTree.updateNode(tNode);
					f.removeClass("share_0").addClass("share_1");
					Ext.Msg.alert("提示信息","分享成功！");
				}else{
					Ext.Msg.alert("提示信息",data.msg);
				}
			}); 
		}
		/*取消分享*/
		 var cancelShare = function(f){
			var url = "disk!cancelShare.action",
				data = {"fileId":f.data("file_id")};

			$.post(url,data,function(data){
				if(data.success){
					var tNode = zTree.getNodeByTId(f.data("node_id"));
					tNode.isShare = 0;
					zTree.updateNode(tNode);
					f.removeClass("share_1").addClass("share_0");
					Ext.Msg.alert("提示信息",data.msg);
				}else{
					Ext.Msg.alert("提示信息",data.msg);
				}
			}); 	
		}
		
		 /*重命名文件*/
			var rename = function(f){
				var text = $("<textarea type='text' style='text-align:center;resize:none;width:80px;height:26px;font-size:11px;'></textarea>");
				text.blur(function(){
					var url = "disk!rename.action";
					var data = {"fileName":text.val(),"fileId":f.data("file_id")};
					$.post(url,data,function(data){
						var tNode = zTree.getNodeByTId(f.data("node_id"));
						if(data.success){
							tNode.name = text.val();
							zTree.updateNode(tNode);
							f.attr("title",text.val());
							text.parent().html(strLimit(tNode.name,20));
						}else {
							Ext.Msg.alert('提示信息',data.msg)
							text.parent().html(strLimit(tNode.name,20));
						}
						text.remove();
					});
				});
				text.val(f.attr("title"));
				f.next().html(text);
				text.focus().select();
			}
			/*删除文件*/
			var deleteFile = function(f){
				url = "disk!delete.action";
				data ={"fileId":$(f).data("file_id")} ;
					$.post(url,data,function(data){
						if(data.success){
							var tNode = zTree.getNodeByTId(f.data("node_id"));
							zTree.removeNode(tNode);
							f.parent(".file").remove();
							var newSize = Number(data/(1024)).toFixed(0);
							pBar.setProgress(newSize);
						}else{
							Ext.Msg.alert('提示信息',data.msg);
						}
					});
			}

			$("#folder").delegate(".file_name","dblclick",function(){
				rename($(this).prev(".file_icon"));
			});


			//文件右键
			var fileItems = [{
				text:"下载",
				icon:"${path}/image/disk/download.png",
				action:function(tar){
					//window.location.href = "disk!download.action?fileId=" + $(tar).data("file_id");
					window.open("disk!download.action?fileId="+$(tar).data("file_id"));
				}
			},{
				text:"分享",
				icon:"${path}/image/disk/share.png",
				action:function(tar){share($(tar));}
			},{
				text:"重命名",
				icon:"${path}/image/disk/edit.png",
				action:function(tar){rename($(tar));}
			},{
				text:"删除",
				icon:"${path}/image/disk/delete.png",
				action:function(tar){
					Ext.MessageBox.confirm('提示信息', '删除的文件不能恢复，您确认是否删除该文件？', function(btn){if(btn == 'yes'){
						deleteFile($(tar));
						}
					});
				}
			}];
		
			var folderItems = [{
				text : "打开",
				icon : "${path}/image/disk/open.png",
				action: function(tar) {openFile($(tar));}
			},{
				text : "重命名",
				icon : "${path}/image/disk/edit.png",
				action: function(tar){rename($(tar));}
			},{type:"split"},{
				text : "删除",
				icon : "${path}/image/disk/delete.png",
				action: function(tar){
					Ext.MessageBox.confirm('提示信息', '文件夹可能涉及多个文件，请谨慎操作。', function(btn){if(btn == 'yes'){
						deleteFile($(tar));
						}
					});
				}
			}];
		/*文件的右键菜单*/
		$(".share_0:not(.adir)").contextmenu({
			items : fileItems
		});
		$(".share_1").contextmenu({
			items : function(){
				fileItems[1] = {
					text:"取消分享",
					icon:"${path}/image/disk/cancel_share.png",
					action:function(tar){cancelShare($(tar));}
				};
				return fileItems;
			}()
		});
		/*文件夹右键菜单*/
		$(".adir").contextmenu({
			items : folderItems
		});
		/*双击右边文件夹，显示文件夹的内容*/
		$("#folder ul").delegate(".adir","dblclick",function(){
			openFile($(this));
		});
		/*双击下载文件*/
		$("#folder ul").delegate(".file_icon:not(.adir)","dblclick",function(e){
			window.open("disk!download.action?fileId="+$(e.target).data("file_id"));
		});
		
		/*点击路径列出目录的内容*/
		$("#file_path").delegate("#children_path span","click",function(){
			listFiles(zTree.getNodeByTId($(this).data("node_id")));
		});
		$("#root").click(function(){
			listFiles(zTree.getNodeByTId("my_file_tree_1"));
		});
       
    	$("#mkdir").click(function(){
    		var folderWin = Ext.create('Ext.window.Window', {
    			title:'新建文件夹',
    			modal: true,
       			resizable:false,
				items:[{
					height:50,
					width: 300,
					xtype:'form',
					defaultType : 'textfield',
					items:[{
						name : 'folderId',
						id : 'folderId',
						fieldLabel : '父级文件id',
						allowBlank : false,
						value:$("#folder").data("folder_id"),
						hidden:true
	    			},{
	    				labelAlign : 'right',
	    				margin:'10 0 10 0',
						name : 'folderName',
						id : 'folderName',
						fieldLabel : '文件名',
						regex:/^[\u4e00-\u9fa5a-zA-Z\d]{1,10}$/,
						regexText:'不超过10字符，不能包含空格',
						allowBlank : false
	    			}]
				}],
    			buttons:[{
    				text:'确定',
    				formBind:true,
    				disable:true,
					handler:function(){
						var win = this.up('window');
						var form =win.down('form').getForm();
						if(form.isValid()){
							form.submit({
								waitTitle : '请稍候',
								waitMsg : '正在执行操作...',
								url : 'disk!mkdir.action',
								method : 'POST',
								submitEmptyText : false,
								success : function(form, action) {//正确提示，返回的json必须要有success项 
									win.close();
									addFile(action.result.msg);
									Ext.Msg.alert('提示信息','操作成功');
								},
								failure : function(form, action) {//错误提示
									console.log(action)
									Ext.Msg.alert('提示信息',action.result.msg);
								}
							});
						}
					}
    			}],
    			renderTo:Ext.getBody()
    		}).show();
    	});
    	/*进度条*/
    	$("#space_bar").progressBar({
			width:265,
	        height:15,
	        unit:"KB",
	        totalProgress:Number(${diskInfo.totalsize}/(1024)).toFixed(0),
	        currentProgress:0
		});
    	var pBar = $("#space_bar").getProgressBar();
    	pBar.setProgress(Number(${diskInfo.usedsize}/(1024)).toFixed(0));
 
    	var pop = popbox({
			width:400,
			height:240,
			title:"文件上传",
			auto:false,
			content:$("#upload_queue")
		});
		
		$("#upload_button").uploadify({
			height      : 22,
			width       : 64,
			swf        	: '${path}/uploadify/uploadify.swf',
			auto 		: true,
			//queueSizeLimit : 3,
			uploader:"disk!upload.action",
			fileTypeExts :"*.*",
			fileSizeLimit	: 1024+"KB",
			queueID		: 'upload_queue',
			onSelect : function(file){
				var id = $("#folder").data("folder_id");
				var newSize = file.size/(1024)+ parseInt(pBar.getCurrent());
				console.log(newSize)
				if(newSize > pBar.getTotal()){
					Ext.Msg.alert("提示信息","您的空间不够");
					return false;
				}else{
					var element={"folderId":id}
					$("#upload_button").uploadify("settings","formData",element);
					//file.uploadUrl = "disk!upload.action";
					pop.show();
					return true;
				}
			},
			/* onUploadStart:function(file){
				var newSize = file.size/(1024)+ parseInt(pBar.getCurrent());
				if(newSize > pBar.getTotal()){
					Ext.Msg.alert("提示信息","您的空间不够");
					return false;
				}else{
					return true;
				}
			}, */
			onUploadSuccess : function(file, data, response) {
				var info = Ext.decode(data);
				if(!info.success){
					Ext.Msg.alert("提示信息",info.msg);
				}else{
					addFile(info.msg);
					var newSize = Number(${diskInfo.usedsize}/(1024)).toFixed(0);
					pBar.setProgress(newSize);
				}
			},
			onUploadError : function(file, errorCode, errorMsg, errorString) {}
		});
		
		$(".file").dragble({handler:".file_icon"});
        
        $(".folder,#file_path span").droppable({
            accept:".file",
            activeClass:"active",
            onClass : "on",
            onDrop:function(drag,drop){
            	var tarF = drop.hasClass("file")? drop.find(".file_icon"): drop;
            	
            	var souF = drag.find(".file_icon");
            	
            	if($("#folder").data("folder_id") != tarF.data("file_id")){
            		var url = "disk!moveFile.action";
    				var data = {"targetId":tarF.data("file_id"),"sourceId":souF.data("file_id")};
    				$.post(url,data,function(data){
    					if(data.success){
    						var tarN = zTree.getNodeByTId(tarF.data("node_id")),
    						souN = zTree.getNodeByTId(souF.data("node_id"));
	    					drag.remove();
	    					if(!tarN.zAsync){
	    						zTree.removeNode(souN);
	    					}else if(tarN.zAsync){
	    						zTree.moveNode(tarN,souN,"inner",true);
	    					}
    					}
    				});
            	}
            }
        });
	</script>
</body>
</html>