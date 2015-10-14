package cn.ailot.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.SysRoleDao;
import cn.ailot.sys.entity.SysRole;
import cn.ailot.sys.service.SysRoleService;

@Service("sysRoleService")
public class SysRoleServiceImpl extends BaseServiceImpl<SysRole> implements SysRoleService{
	
	@Autowired
	private SysRoleDao sysRoleDao;

	@Override
	public BaseDao<SysRole> getBaseDao() {
		// TODO Auto-generated method stub
		return sysRoleDao;
	}


}
