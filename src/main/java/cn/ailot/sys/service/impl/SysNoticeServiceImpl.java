package cn.ailot.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.SysNoticeDao;
import cn.ailot.sys.entity.SysNotice;
import cn.ailot.sys.service.SysNoticeService;

@Service("sysNoticeService")
public class SysNoticeServiceImpl extends BaseServiceImpl<SysNotice> implements SysNoticeService{
	
	@Autowired
	private SysNoticeDao sysNoticeDao;

	@Override
	public BaseDao<SysNotice> getBaseDao() {
		// TODO Auto-generated method stub
		return sysNoticeDao;
	}

	@Override
	public List<SysNotice> selectAny() {
		// TODO Auto-generated method stub
		return sysNoticeDao.selectAny();
	}


}
