package cn.ailot.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class WebSocketPool{

	//保存连接的容器
	public static final Map<String,WebSocketServlet > connections = new HashMap<String,WebSocketServlet >();
	
	//向连接池中添加连接
	public static void addMessagePool(WebSocketServlet wss){
		//添加连接
		connections.put(wss.getNickname(),wss);
	}
	
	//获取所有的在线用户
	public static Set<String> getOnlineUser(){
		return connections.keySet();
	}
	
	public static void removeMessage(WebSocketServlet wss){
		//移除连接
		connections.remove(wss.getNickname());
	}
	
	public static void sendMessageToUser(String user,String message){}
	
	//向所有的用户发送消息
	 public static void broadcast(String msg) {
	        for (String key : connections.keySet()) {
	        	WebSocketServlet client = connections.get(key);
	            try {
	                synchronized (client) {
	                    client.session.getBasicRemote().sendText(msg);
	                }
	            } catch (IOException e) {
	                System.out.println("Chat Error: Failed to send message to client;"+ e);
	                connections.remove(client);
	                try {
						client.session.close();
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
	                String message = String.format("* %s %s",client.getNickname(), "has been disconnected.");
	                broadcast(message);
	            }
	        }
	    }
}
