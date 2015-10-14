package cn.ailot.sys.dao;

import java.util.List;

import cn.ailot.common.base.BaseDao;
import cn.ailot.sys.entity.Combobox;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysUser;

public interface SysUserDao extends BaseDao<SysUser>{
	
	/**
	 * 登录验证
	 * @param username
	 * @param userpwd
	 * @return
	 */
	public SysUser checkLogin(String username, String userpwd);
	
	/**
	 * 根据用户ID查询菜单
	 * @param id
	 * @return
	 */
	public List<ExtTree> findMenuInfo(String id); 
	
	/**
	 * 下拉列表方法
	 * @param table
	 * @return
	 */
	public List<Combobox> getCombobox(String label);
	
	/**
	 * 检查登录名是否重复
	 * @param sysUser
	 * @return
	 */
	public int checkLoginName(SysUser sysUser);
	
	/**
	 * 用户密码重置
	 */
	public void resetPwd(String userpwd, String userid);
	
}
