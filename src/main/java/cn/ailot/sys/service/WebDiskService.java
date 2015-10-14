package cn.ailot.sys.service;

import cn.ailot.common.base.BaseService;
import cn.ailot.sys.entity.WebDisk;

public interface WebDiskService extends BaseService<WebDisk>{
	
	public void updateParam(String userid);
	
	public void updateNum(WebDisk webDisk);
}
