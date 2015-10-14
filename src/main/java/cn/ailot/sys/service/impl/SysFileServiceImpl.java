package cn.ailot.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.SysFileDao;
import cn.ailot.sys.entity.SysFile;
import cn.ailot.sys.service.SysFileService;

@Service("sysFileService")
public class SysFileServiceImpl extends BaseServiceImpl<SysFile> implements SysFileService{
	
	@Autowired
	private SysFileDao sysFileDao;

	@Override
	public BaseDao<SysFile> getBaseDao() {
		// TODO Auto-generated method stub
		return sysFileDao;
	}


}
