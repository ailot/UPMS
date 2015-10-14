package cn.ailot.sys.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.Combobox;
import cn.ailot.sys.entity.DiskFile;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.SysUser;
import cn.ailot.sys.entity.WebDisk;
import cn.ailot.sys.service.DiskFileService;
import cn.ailot.sys.service.SysUserService;
import cn.ailot.sys.service.WebDiskService;
import cn.ailot.util.DateUtil;
import cn.ailot.util.MD5Util;

/**
 * @author litao
 *
 */
@Controller
public class SysUserController extends BaseController<SysUser>{
	
	@Autowired//自动set
	private SysUserService sysUserService;
	@Autowired//自动set
	private WebDiskService webDiskService;
	@Autowired//自动set
	private DiskFileService diskFileService;
	private static Logger logger = LoggerFactory.getLogger(SysUserController.class);
	
	/**
	 * 查询全部用户
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!selectAll.action")
	@ResponseBody
	public Object selectAll(SysUser sysUser,HttpServletRequest req){
		sysUser.setBs(getBsData(req));
		sysUser.setRoleid(getUserInfo().getRoleid());
		extData.setList(sysUserService.selectAll(sysUser));
		extData.setTotalCount(sysUserService.selectCount(sysUser));
		return extData;
	}
	
	/**
	 * 新增用户
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!add.action")
	@ResponseBody
	public ExtResult add(SysUser sysUser,HttpServletRequest req){
			sysUser.setUserid(DateUtil.getUUID());
			sysUser.setUserpwd(MD5Util.MD5Encode(sysUser.getUserpwd()));
			sysUserService.save(sysUser);
			WebDisk webdisk = new WebDisk();
			webdisk.setId(DateUtil.getShortUuid());
			webdisk.setUserid(sysUser.getUserid());
			webdisk.setTotalsize(1024*1024*5);
			webdisk.setUsedsize(0);
			webdisk.setFilenumber(0);
			webDiskService.save(webdisk);
			DiskFile diskfile = new DiskFile();
			diskfile.setId(DateUtil.getShortUuid());
			diskfile.setUserid(sysUser.getUserid());
			diskfile.setName("#"+sysUser.getUserid());
			diskfile.setType("adir");
			diskfile.setPath("/");
			diskfile.setCreatetime(DateUtil.dataNow());
			diskFileService.save(diskfile);
			return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 修改用户
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!update.action")
	@ResponseBody
	public ExtResult update(SysUser sysUser){
			sysUserService.update(sysUser);
			return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 用户删除
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!delete.action")
	@ResponseBody
	public ExtResult delete(String ids){
		String[] deptids = ids.split(",");
		sysUserService.delete(deptids);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 用户注销
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!stop.action")
	@ResponseBody
	public ExtResult stop(String ids){
		String[] userids = ids.split(",");
		map.put("userids", userids);
		map.put("state", "0");
		sysUserService.change(map);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 用户启用
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!start.action")
	@ResponseBody
	public ExtResult start(String ids){
		String[] userids = ids.split(",");
		map.put("userids", userids);
		map.put("state", "1");
		sysUserService.change(map);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 查询下拉字典表视图
	 * @param sysUser
	 * @return
	 */
	@RequestMapping("/user!checkLoginName.action")
	@ResponseBody
	public ExtResult checkLoginName(SysUser sysUser){
			int check = sysUserService.checkLoginName(sysUser);
			if(check==0){
				return new ExtResult(true,General.SUCCESSFUL);
			}else{
				return new ExtResult(false,General.FAILURE);
			}
	}
	
	/**
	 * 检查登录名
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!getCombobox.action")
	@ResponseBody
	public Object getCombobox(String label){
		List<Combobox> comlist = sysUserService.getCombobox(label);
		return comlist;
	}
	
	/**
	 * 重置密码
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!resetPwd.action")
	@ResponseBody
	public Object resetPwd(String ids){
		sysUserService.resetPwd(MD5Util.MD5Encode("123456"), ids);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 修改稿密码
	 * @param sysUser
	 * @param req
	 * @return
	 */
	@RequestMapping("/user!changePwd.action")
	@ResponseBody
	public Object changePwd(HttpServletRequest req){
		SysUser sysUser = (SysUser) req.getSession().getAttribute("CURRENT_USER");
		String oldPwd = MD5Util.MD5Encode(req.getParameter("oldPwd"));
		String userpwd = sysUser.getUserpwd();
		if(oldPwd == userpwd || oldPwd.equals(userpwd)){
			sysUser.setUserpwd(MD5Util.MD5Encode(req.getParameter("newPwd")));
			sysUserService.update(sysUser);
			return new ExtResult(true,General.SUCCESSFUL);
		}else{
			return new ExtResult(General.FAILURE);
		}
	}
	
}
