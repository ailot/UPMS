package cn.ailot.sys.service;

import java.util.List;

import cn.ailot.common.base.BaseService;
import cn.ailot.sys.entity.SysNotice;

public interface SysNoticeService extends BaseService<SysNotice>{
	
	public List<SysNotice> selectAny();
	
}
