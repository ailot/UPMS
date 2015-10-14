package cn.ailot.sys.service;

import java.util.List;

import cn.ailot.common.base.BaseService;
import cn.ailot.sys.entity.Combobox;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysUser;

public interface SysUserService extends BaseService<SysUser>{
	
	public SysUser checkLogin(String username, String userpwd);
	
	public List<ExtTree> findMenuInfo(String id); 
	
	public List<Combobox> getCombobox(String label);
	
	public int checkLoginName(SysUser sysUser);
	
	public void resetPwd(String userpwd, String userid);
}
