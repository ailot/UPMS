package cn.ailot.interceptor;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import cn.ailot.common.general.General;

/**
 * 登录拦截器
 * @author litao
 *
 */
public class LoginInterceptor implements HandlerInterceptor {

	private static Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);
	
	//请求处理完成后调用
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse res, Object obj, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		logger.info("请求处理完成后执行");
	}

	
	//处理器执行后调用
	public void postHandle(HttpServletRequest req, HttpServletResponse res,
			Object obj, ModelAndView mv) throws Exception {
		// TODO Auto-generated method stub
		logger.info("处理器执行后调用");
	}

	
	//处理器执行前调用
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res,
			Object obj) throws Exception {
		// TODO Auto-generated method stub
		logger.info("处理器执行前调用");
		Object sysUser =  req.getSession().getAttribute(General.CURRENT_USER);
		logger.info("sysUser:{}",sysUser);
		//判断用户是否登录
		if(sysUser!=null){
			return true;
		}
		ServletContext ctx = req.getSession().getServletContext();
		res.sendRedirect(ctx.getContextPath()+"/index.action");
		return false;
	}

}
