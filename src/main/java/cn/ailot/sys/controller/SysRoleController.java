package cn.ailot.sys.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.SysRole;
import cn.ailot.sys.service.SysRoleService;
import cn.ailot.util.DateUtil;

/**
 * @author litao
 *
 */
@Controller
public class SysRoleController extends BaseController<SysRole>{
	
	@Autowired//自动set
	private SysRoleService sysRoleService;
	private static Logger logger = LoggerFactory.getLogger(SysRoleController.class);
	
	/**
	 * 查询全部
	 * @param sysRole
	 * @param req
	 * @return
	 */
	@RequestMapping("/role!selectAll.action")
	@ResponseBody
	public Object selectAll(SysRole sysRole,HttpServletRequest req){
		sysRole.setBs(getBsData(req));
		extData.setList(sysRoleService.selectAll(sysRole));
		extData.setTotalCount(sysRoleService.selectCount(sysRole));
		return extData;
	}
	
	/**
	 * 角色新增
	 * @param sysRole
	 * @param req
	 * @return
	 */
	@RequestMapping("/role!add.action")
	@ResponseBody
	public ExtResult add(SysRole sysRole){
		sysRole.setRoleid(DateUtil.getUUID());
		sysRoleService.save(sysRole);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 角色修改
	 * @param sysRole
	 * @param req
	 * @return
	 */
	@RequestMapping("/role!update.action")
	@ResponseBody
	public ExtResult update(SysRole sysRole){
		sysRoleService.update(sysRole);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 角色删除
	 * @param sysRole
	 * @param req
	 * @return
	 */
	@RequestMapping("/role!delete.action")
	@ResponseBody
	public ExtResult delete(String ids,HttpServletRequest req){
		String[] roleids = ids.split(",");
		sysRoleService.delete(roleids);
		return new ExtResult(true,General.SUCCESSFUL);
	}
}
