package cn.ailot.sys.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.ailot.sys.entity.SysUser;
import cn.ailot.sys.service.DiskFileService;
import cn.ailot.sys.service.WebDiskService;

/**
 * 页面引导
 * @author litao
 *
 */
@Controller
public class IndexController {
	
	@Autowired
	private DiskFileService diskFileService;
	@Autowired
	private WebDiskService webDiskService;
	private static Logger logger = LoggerFactory.getLogger(IndexController.class);
	
	@RequestMapping("/index.action")
	public String index() {
		logger.info("进入登录页面了。。。");
		return "login";
	}
	
	@RequestMapping("/main.action")
	public String main(){
		logger.info("进入系统了。。。");
		return "sys";
	}
	@RequestMapping("/chat.action")
	public String chat(){
		logger.info("进入聊天室了。。。");
		return "sys/chat";
	}
	@RequestMapping("/sysUser.action")
	public String sysUser(){
		logger.info("进入用户管理页面了。。。");
		return "sys/user";
	}
	
	@RequestMapping("/sysDict.action")
	public String sysDict(){
		logger.info("进入用户字典页面了。。。");
		return "sys/dict";
	}
	
	@RequestMapping("/sysDept.action")
	public String sysDept(){
		logger.info("进入单位管理页面了。。。");
		return "sys/dept";
	}
	
	@RequestMapping("/sysNotice.action")
	public String sysNotice(){
		logger.info("进入通知管理页面了。。。");
		return "sys/notice";
	}
	
	@RequestMapping("/sysFile.action")
	public String sysFile(){
		logger.info("进入文件管理页面了。。。");
		return "sys/file";
	}
	
	@RequestMapping("/sysRole.action")
	public String sysRole(){
		logger.info("进入文件管理页面了。。。");
		return "sys/role";
	}
	
	@RequestMapping("/welcome.action")
	public String welcome(){
		return "welcome";
	}
	@RequestMapping("/webdisk.action")
	public String webdisk(HttpSession session){
		StringBuffer diskname = new StringBuffer("#");
		
		SysUser sysUser = (SysUser) session.getAttribute("CURRENT_USER");
		diskname.append(sysUser.getUserid());
		//初始化网盘基本信息
		session.setAttribute("homeId", diskFileService.getHomeId(diskname.toString()));
		session.setAttribute("diskInfo", webDiskService.selectById(sysUser.getUserid()));
		logger.info("进入网络硬盘页面了。。。");
		return "sys/webdisk";
	}
	@RequestMapping("/error404.action")
	public String error404(){
		return "404";
	}
	@RequestMapping("/error500.action")
	public String error500(){
		return "500";
	}
	@RequestMapping("/WorkLog.action")
	public String worklog(){
		logger.info("进入日志页面。。。");
		return "base/WorkLog";
	}
}

