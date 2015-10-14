package cn.ailot.sys.dao;

import java.util.List;

import cn.ailot.common.base.BaseDao;
import cn.ailot.sys.entity.SysNotice;


public interface SysNoticeDao extends BaseDao<SysNotice>{
	
	/**
	 * 获取当前最新的几条记录
	 * @return
	 */
	public List<SysNotice> selectAny();
}
