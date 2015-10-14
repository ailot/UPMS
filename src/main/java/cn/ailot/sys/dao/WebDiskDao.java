package cn.ailot.sys.dao;

import cn.ailot.common.base.BaseDao;
import cn.ailot.sys.entity.WebDisk;

public interface WebDiskDao extends BaseDao<WebDisk>{
	
	/**
	 * 修改网盘参数
	 * @param userid
	 */
	public void updateParam(String userid);
	
	
	public void updateNum(WebDisk webDisk);
}
