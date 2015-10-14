package cn.ailot.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.SysDictDao;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysDict;
import cn.ailot.sys.service.SysDictService;

@Service("sysDictService")
public class SysDictServiceImpl extends BaseServiceImpl<SysDict> implements SysDictService{
	
	@Autowired
	private SysDictDao sysDictDao;

	@Override
	public BaseDao<SysDict> getBaseDao() {
		// TODO Auto-generated method stub
		return sysDictDao;
	}

	public List<SysDict> selectByLabel(String label){
		return sysDictDao.selectByLabel(label);
	}
	
	
	public List<ExtTree> getDictTree(String label) {
		// TODO Auto-generated method stub
		return sysDictDao.getDictTree(label);
	}

	/**
	 * 不同的
	 */
	public List<SysDict> selectDistinctDictList() {
		// TODO Auto-generated method stub
		return sysDictDao.selectDistinctDictList();
	}

	public List<SysDict> selectTreeGrid(SysDict dict) {
		// TODO Auto-generated method stub
		return sysDictDao.selectTreeGrid(dict);
	}

	public Integer getMaxRow(){
		return sysDictDao.getMaxRow();
	}
	
}
