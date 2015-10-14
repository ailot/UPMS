package cn.ailot.interceptor;

import javax.servlet.ServletContextEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ContextLoaderListener;

/**
 * spring监听
 * @author litao
 *
 */
public class SessionListener extends ContextLoaderListener {
	
	private static Logger logger = LoggerFactory.getLogger(SessionListener.class);
	
    /**
     * 服务器销毁
     */
	public void contextDestroyed(ServletContextEvent event) {
		// TODO Auto-generated method stub
		super.contextDestroyed(event);
		logger.info("服务器停止了。。。。。。。。");
	}


	/**
	 * 服务器启动
	 * 复写父类的方法，但是必须调用父类方法super.,否则会报错
	 */
	public void contextInitialized(ServletContextEvent event) {
		// TODO Auto-generated method stub
		super.contextInitialized(event);
		logger.info("服务器开始了。。。。。。。。");
	}

}

