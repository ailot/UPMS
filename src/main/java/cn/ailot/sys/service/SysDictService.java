package cn.ailot.sys.service;

import java.util.List;

import cn.ailot.common.base.BaseService;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysDict;

public interface SysDictService extends BaseService<SysDict>{
	
	public List<SysDict> selectByLabel(String label);
	
	public List<ExtTree> getDictTree(String label);
	
	public List<SysDict> selectDistinctDictList();
	
	public List<SysDict> selectTreeGrid(SysDict dict);

	public Integer getMaxRow();
}
