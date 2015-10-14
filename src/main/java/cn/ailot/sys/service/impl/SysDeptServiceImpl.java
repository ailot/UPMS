package cn.ailot.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.SysDeptDao;
import cn.ailot.sys.entity.SysDept;
import cn.ailot.sys.service.SysDeptService;

@Service("sysDeptService")
public class SysDeptServiceImpl extends BaseServiceImpl<SysDept> implements SysDeptService{
	
	@Autowired
	private SysDeptDao sysDeptDao;

	@Override
	public BaseDao<SysDept> getBaseDao() {
		// TODO Auto-generated method stub
		return sysDeptDao;
	}
}
