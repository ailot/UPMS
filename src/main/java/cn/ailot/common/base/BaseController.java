package cn.ailot.common.base;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.mybatis.spring.MyBatisSystemException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.ailot.sys.entity.BsData;
import cn.ailot.sys.entity.ExtData;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.SysUser;

@Controller
public class BaseController<T> {
	
	private static Logger logger = LoggerFactory.getLogger(BaseController.class);
	
	protected List<T> list; //公用list
	protected ExtData extData = new ExtData();//extjs类型数据对象
	protected Map<String,Object> map = new HashMap<String, Object>();
	@Autowired
	protected HttpSession session;
	public Map<String, Object> getMap() {
		return map;
	}
	public void setMap(Map<String, Object> map) {
		this.map = map;
	}
	public ExtData getExtData() {
		return extData;
	}
	public void setExtData(ExtData extData) {
		this.extData = extData;
	}
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}

	@ExceptionHandler
	@ResponseBody
	/**
	 * 全局异常捕获处理，无需在方法内部try catch
	 * @param e
	 * @return
	 */
	public ExtResult exception(Exception e){
		String erMsg = null;
		if(e instanceof DataAccessException){
			e.printStackTrace();
			erMsg = "数据库异常";
			logger.error("数据库异常。。。{}",e.getMessage());
		}else if(e instanceof SQLException){
			e.printStackTrace();
			erMsg = "数据库操作异常";
			logger.error("数据库操作异常。。。{}",e.getMessage());
		}else if(e instanceof NullPointerException){
			e.printStackTrace();
			erMsg = "空指针异常";
			logger.error("空指针异常。。。{}",e.getMessage());
		}else if(e instanceof IOException){
			e.printStackTrace();
			erMsg = "IO异常";
			logger.error("IO异常。。。{}",e.getMessage());
		}else if(e instanceof ClassNotFoundException){
			e.printStackTrace();
			erMsg = "指定的类没找到";
			logger.error("指定的类没找到。。。{}",e.getMessage());
		}else if(e instanceof ArithmeticException){
			e.printStackTrace();
			erMsg = "数学运算异常";
			logger.error("数学运算异常。。。{}",e.getMessage());
		}else if(e instanceof ArrayIndexOutOfBoundsException){
			e.printStackTrace();
			erMsg = "数组越界";
			logger.error("数组越界。。。{}",e.getMessage());
		}else if(e instanceof IllegalArgumentException){
			e.printStackTrace();
			erMsg = "方法参数错误";
			logger.error("方法参数错误。。。{}",e.getMessage());
		}else if(e instanceof IllegalStateException){
			e.printStackTrace();
			erMsg = "在非法或不适当的时间调用方法时产生的信号";
			logger.error("在非法或不适当的时间调用方法时产生的信号。。。{}",e.getMessage());
		}else if(e instanceof MyBatisSystemException){
			e.printStackTrace();
			erMsg = "mybatis异常";
			logger.error("mybatis异常。。。{}",e.getMessage());
		}
		else if(e instanceof ClassCastException){
			e.printStackTrace();
			erMsg = "强制类型转换错误";
			logger.error("强制类型转换错误。。。{}",e.getMessage());
		}else{
			e.printStackTrace();
			erMsg = "系统错误,请联系管理员！";
			logger.error("系统错误。。。{}",e.getMessage());
		}
		return new ExtResult(erMsg);
	}

	public SysUser getUserInfo(){
		return (SysUser)session.getAttribute("CURRENT_USER");
	}
	/**
	 * 获取分页参数
	 */
	public BsData getBsData(HttpServletRequest req){
		BsData bs = new BsData();
		bs.setSysuser(getUserInfo());
		StringBuffer condition = new StringBuffer();
		int page = Integer.parseInt(req.getParameter("page"));
		int limit = Integer.parseInt(req.getParameter("limit"));
		String sort = req.getParameter("sort");
		String dir = req.getParameter("dir");
		condition.append("order by ").append(sort).append(" ").append(dir).append(" limit ")
		.append((page-1)*limit).append(",").append(limit*page);
		bs.setCondition(condition.toString());
		logger.info("condition:{}",bs.toString());
		return bs;
	}
}
