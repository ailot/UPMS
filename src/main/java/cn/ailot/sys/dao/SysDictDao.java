package cn.ailot.sys.dao;

import java.util.List;

import cn.ailot.common.base.BaseDao;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysDict;

public interface SysDictDao extends BaseDao<SysDict>{
	
	public List<SysDict> selectByLabel(String label);
	
	public List<ExtTree> getDictTree(String label);
	
	public List<SysDict> selectDistinctDictList();
	
	public List<SysDict> selectTreeGrid(SysDict dict);
	
	public Integer getMaxRow();
}
