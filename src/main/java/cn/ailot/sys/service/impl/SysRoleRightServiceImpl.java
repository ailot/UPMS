package cn.ailot.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.SysRoleRightDao;
import cn.ailot.sys.entity.CheckBox;
import cn.ailot.sys.entity.SysRight;
import cn.ailot.sys.entity.SysRoleRight;
import cn.ailot.sys.service.SysRoleRightService;

@Service("sysRoleRightService")
public class SysRoleRightServiceImpl extends BaseServiceImpl<SysRoleRight> implements SysRoleRightService{
	
	@Autowired
	private SysRoleRightDao sysRoleRightDao;

	@Override
	public BaseDao<SysRoleRight> getBaseDao() {
		// TODO Auto-generated method stub
		return sysRoleRightDao;
	}

	public void saveList(List<SysRoleRight> list) {
		// TODO Auto-generated method stub
		sysRoleRightDao.saveList(list);
	}

	@Override
	public List<CheckBox> selectRight(String roleid) {
		// TODO Auto-generated method stub
		return sysRoleRightDao.selectRight(roleid);
	}

	@Override
	public List<SysRight> selectButton(String roleid, String parentid) {
		// TODO Auto-generated method stub
		return sysRoleRightDao.selectButton(roleid, parentid);
	}


}
