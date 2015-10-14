//用于展示用户的聊天信息
Ext.define('MessageContainer', {
	extend : 'Ext.view.View',
	trackOver : true,//当鼠标进入或离开目标元素时触发mouseover和mouseout事件
	multiSelect : false,
	itemCls : 'l-im-message',
	itemSelector : 'div.l-im-message',
	overItemCls : 'l-im-message-over',
	selectedItemCls : 'l-im-message-selected',
	style : {
		overflow : 'auto',
		backgroundColor : '#fff'
	},

	tpl : [
			'<div class="l-im-message-warn">​交谈中请勿轻信汇款、中奖信息、陌生电话。 请遵守相关法律法规。</div>',
			'<tpl for=".">',
			'<div class="l-im-message">',
			'<div class="l-im-message-header l-im-message-header-{source}">{from}  {timestamp}</div>',
			'<div id="remind" class="l-im-message-body">{content}</div>', '</div>',
			'</tpl>'],

	messages : [],

	initComponent : function() {
		var me = this;
		me.messageModel = Ext.define('MessageModel', {
					extend : 'Ext.data.Model',
					fields : ['from', 'timestamp', 'content', 'source']
				});
		me.store = Ext.create('Ext.data.Store', {
					model : 'MessageModel',
					data : me.messages
				});
		me.callParent();
	},

	//将服务器推送的信息展示到页面中
	receive : function(message) {
		var me = this;
		message['timestamp'] = Ext.Date.format(new Date(message['timestamp']),
				'H:i:s');
		if(message.from == user){
			message.source = 'self';
		}else{
			message.source = 'remote';
		}
		me.store.add(message);
		if (me.el.dom) {
			me.el.dom.scrollTop = me.el.dom.scrollHeight;
		}
	},
	remind:function(msg){
		var message={};
		Ext.apply(message, {
			from : '系统消息',
			content : msg,
			timestamp : Ext.Date.format(new Date(),'Y-m-d H:i:s')
		});
		this.store.add(message);
	}
});

Ext.onReady(function() {
			//创建用户输入框
			var input = Ext.create('Ext.form.field.HtmlEditor', {
				region : 'south',
				height : 120,
				enableFont : false,
				enableSourceEdit : false,
				enableAlignments : false,
				listeners : {
					initialize:function() {
						Ext.EventManager.on(input.getDoc(), {
								keyup : function(e) {
									if (e.ctrlKey === true && e.keyCode == 13) {
										e.preventDefault();
										e.stopPropagation();
										send();
									}
								}
							});
					}
				}
			});
			//创建消息展示容器
			var output = Ext.create('MessageContainer', {
						region : 'center'
					});

			var dialog = Ext.create('Ext.panel.Panel', {
						region : 'center',
						layout : 'border',
						items : [input, output],
						buttons : [{
									text : '发送（Ctrl+Enter）',
									handler : send
								}]
					});
			var websocket;
			//初始话WebSocket
			function initWebSocket() {
				if ('WebSocket' in window) {
					websocket = new WebSocket(encodeURI('ws://localhost:8080/UPMS/chat'));
					console.log(websocket)
					websocket.onopen = function() {
						//连接成功
						win.setTitle(title + '&nbsp;&nbsp;(已连接)');
					}
					websocket.onerror = function() {
						//连接失败
						win.setTitle(title + '&nbsp;&nbsp;(连接发生错误)');
						websocket=null;
					}
					websocket.onclose = function() {
						//连接断开
						win.setTitle(title + '&nbsp;&nbsp;(连接已经断开)');
						websocket=null;
					}
					//消息接收
					websocket.onmessage = function(message) {
						var message = Ext.decode(message.data);
						//console.log(message)
						//接收用户发送的消息
						if (message.type == 'message') {
							output.receive(message);
						} else if (message.type == 'online') {
							//获取在线用户列表
							var root = onlineUser.getRootNode();
							root.removeAll();
							var names = Ext.decode(message.list);
							console.log(names);
							Ext.Array.each(names,function(name){
								var node = root.createNode({
									id : name,
									text : name,
									iconCls : 'user',
									leaf : true
								});
								root.appendChild(node);
							});
						} else if (message.type == 'join') {
							//用户上线
							//console.log(message)
							/*var root = onlineUser.getRootNode();
							var user = message.user;
							var node = root.createNode({
								id : user,
								text : user,
								iconCls : 'user',
								leaf : true
							});
							root.appendChild(node);*/
							output.remind(message.msg);
						} else if (message.type == 'leave') {
							//用户下线
							var root = onlineUser.getRootNode();
							var user = message.user;
							var node = root.findChild('id',user);
							root.removeChild(node);
							output.remind(message.msg);
						}
					}
				}
			};

			//在线用户树
			var onlineUser = Ext.create('Ext.tree.Panel', {
						title : '在线用户',
						rootVisible : false,
						region : 'east',
						width : 150,
						lines : false,
						useArrows : true,
						autoScroll : true,
						split : true,
						iconCls : 'user-online',
						store : Ext.create('Ext.data.TreeStore', {
									root : {
										text : '在线用户',
										expanded : true,
										children : []
									}
								})
					});
			var title = '欢迎您：' + user;
			//展示窗口
			var win = Ext.create('Ext.window.Window', {
						title : title + '&nbsp;&nbsp;(未连接)',
						layout : 'border',
						iconCls : 'user-win',
						minWidth : 650,
						minHeight : 460,
						closable:false,
						width : 650,
						animateTarget : 'websocket_button',
						height : 460,
						items : [dialog,onlineUser],
						border : false,
						listeners : {
							render : function() {
								initWebSocket();
							}
						}
					});
			win.show();
			
			//发送消息
			function send() {
				var message = {};
				if (websocket != null) {
					if (input.getValue()) {
						Ext.apply(message, {
									from : user,
									content : input.getValue(),
									timestamp : new Date().getTime(),
									type : 'message'
								});
						websocket.send(Ext.encode(message));
						//output.receive(message);
						input.setValue('');
					}
				} else {
					Ext.Msg.alert('提示', '您已经掉线，无法发送消息!');
				}
			}
		});
