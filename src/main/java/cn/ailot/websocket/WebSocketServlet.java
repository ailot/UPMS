package cn.ailot.websocket;

import java.io.IOException;

import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import cn.ailot.sys.entity.SysUser;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@ServerEndpoint(value="/chat",configurator=GetHttpSessionConfigurator.class)
public class WebSocketServlet{
	ObjectMapper mapper = new ObjectMapper();  
    ObjectNode root = mapper.createObjectNode();
    private String nickname;
    public Session session;
    public HttpSession httpSession;
    
	public String getNickname() {
		return nickname;
	}

	@OnOpen
	public void onOpen(Session session,EndpointConfig config) throws IOException {
		this.session = session;
		this.httpSession = (HttpSession)config.getUserProperties().get(HttpSession.class.getName());
		SysUser sysUser = (SysUser)httpSession.getAttribute("CURRENT_USER");
		this.nickname = sysUser.getUsername();
		String message = String.format("* %s %s",nickname, "加入了.");
		root.put("type", "join");
		root.put("user",nickname);
		root.put("msg", message);
		WebSocketPool.broadcast(root.toString());
		
		root = mapper.createObjectNode();
		root.put("type", "online");
		WebSocketPool.addMessagePool(this);
		root.put("list", mapper.writeValueAsString(WebSocketPool.getOnlineUser().toArray()));
		WebSocketPool.broadcast(root.toString());
	}

	@OnMessage
	public void onMessage(String message){
		System.out.println("onmessage:"+message);
		WebSocketPool.broadcast(message);
	}

	@OnClose
	public void onClose() {
		WebSocketPool.removeMessage(this);
		String message = String.format("* %s %s",nickname, "has disconnected.");
		root.put("type", "leave");
		root.put("user",nickname);
		root.put("msg", message);
		System.out.println("onclose:"+message);
		WebSocketPool.broadcast(root.toString());
	}
	
	@OnError
    public void onError(Throwable t) throws Throwable {
		t.printStackTrace();
		System.out.println("chat error:"+t.toString());
    }
}
