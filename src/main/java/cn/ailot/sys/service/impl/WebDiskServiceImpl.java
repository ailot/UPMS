package cn.ailot.sys.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.WebDiskDao;
import cn.ailot.sys.entity.WebDisk;
import cn.ailot.sys.service.WebDiskService;

@Service("webDiskService")
public class WebDiskServiceImpl extends BaseServiceImpl<WebDisk> implements WebDiskService{
	
	@Autowired
	private WebDiskDao webDiskDao;

	@Override
	public BaseDao<WebDisk> getBaseDao() {
		// TODO Auto-generated method stub
		return webDiskDao;
	}

	@Override
	public void updateParam(String userid) {
		// TODO Auto-generated method stub
		webDiskDao.updateParam(userid);
	}

	@Override
	public void updateNum(WebDisk webDisk) {
		// TODO Auto-generated method stub
		webDiskDao.updateNum(webDisk);
	}
}
