package cn.ailot.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.SysUserDao;
import cn.ailot.sys.entity.Combobox;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysUser;
import cn.ailot.sys.service.SysUserService;

@Service("sysUserService")
public class SysUserServiceImpl extends BaseServiceImpl<SysUser> implements SysUserService{
	
	@Autowired
	private SysUserDao sysUserDao;

	@Override
	public BaseDao<SysUser> getBaseDao() {
		// TODO Auto-generated method stub
		return sysUserDao;
	}

	public SysUser checkLogin(String username, String userpwd) {
		// TODO Auto-generated method stub
		return sysUserDao.checkLogin(username, userpwd);
	}

	public List<ExtTree> findMenuInfo(String id) {
		// TODO Auto-generated method stub
		return sysUserDao.findMenuInfo(id);
	}
	
	public List<Combobox> getCombobox(String label){
		return sysUserDao.getCombobox(label);
	}

	@Override
	public int checkLoginName(SysUser sysUser) {
		// TODO Auto-generated method stub
		return sysUserDao.checkLoginName(sysUser);
	}
	
	public void resetPwd(String userpwd,String userid){
		sysUserDao.resetPwd(userpwd, userid);
	}
}
