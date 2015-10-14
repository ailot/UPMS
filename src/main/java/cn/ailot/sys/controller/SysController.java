package cn.ailot.sys.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysUser;
import cn.ailot.sys.service.SysUserService;
import cn.ailot.util.MD5Util;

/**
 * @author litao
 *
 */
@Controller
public class SysController extends BaseController<Object>{
	
	@Autowired//自动set
	private SysUserService sysUserService;
	private static Logger logger = LoggerFactory.getLogger(SysController.class);
	
	/**
	 * 登录验证
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "/login.action", method = RequestMethod.POST)
	@ResponseBody
	public Object loginAction(SysUser sysUser){
		if(sysUser != null){
			try{
				sysUser.setUserpwd(MD5Util.MD5Encode(sysUser.getUserpwd()));
				sysUser =  sysUserService.checkLogin(sysUser.getUsername(), sysUser.getUserpwd());
				session.setAttribute(General.CURRENT_USER, sysUser);
				logger.info("{}--->{},登录成功。。。",sysUser.getUsername(),sysUser.getRealname());
				return new ExtResult(true, General.SUCCESSFUL);
			}catch(Exception e){
				e.printStackTrace();
				logger.error("Exception:", e.getMessage());
				return new ExtResult("用户名或密码错误");
			}
		}
		return new ExtResult("系统错误，请联系管理员！");
	}
	
	@RequestMapping("/quit.action")
	public String loginOut(){
		session.removeAttribute(General.CURRENT_USER);
		session.invalidate();
		return "redirect:index.action";
	}
	
	/**
	 * 查询树形菜单
	 * @param req
	 * @return
	 */
	@RequestMapping("/queryMenu.action")
	@ResponseBody
	public List<ExtTree> queryMenu(HttpServletRequest req){
		SysUser sysUser = (SysUser) req.getSession().getAttribute(General.CURRENT_USER);
		//树形菜单组合算法
		List<ExtTree> jsonList = sysUserService.findMenuInfo(sysUser.getRoleid());
		List<ExtTree> list = new ArrayList<ExtTree>();
		for(int i=0;i<jsonList.size();i++){
			String id = jsonList.get(i).getId();
			for(ExtTree j2 : jsonList){
				if(id.equals(j2.getParentKey())){
					jsonList.get(i).setLeaf(false);
					j2.setLeaf(true);
					jsonList.get(i).getChildren().add(j2);
				}
			}
		}
		for(ExtTree j2 : jsonList){
			String key = j2.getParentKey();
			if(key==null||"".equals(key)){
				list.add(j2);
			}
		}
		return list;
	}
	
	@RequestMapping("/checkSession.action")
	@ResponseBody
	public Object checkLogin(){
		SysUser sysUser = (SysUser) session.getAttribute("CURRENT_USER");
		if(null==sysUser){
			return new ExtResult(General.FAILURE);
		}else{
			return new ExtResult(true,General.SUCCESSFUL);
		}
	}
		
}
