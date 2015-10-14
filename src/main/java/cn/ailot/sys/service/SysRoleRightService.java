package cn.ailot.sys.service;

import java.util.List;

import cn.ailot.common.base.BaseService;
import cn.ailot.sys.entity.CheckBox;
import cn.ailot.sys.entity.SysRight;
import cn.ailot.sys.entity.SysRoleRight;

public interface SysRoleRightService extends BaseService<SysRoleRight>{

	 public void saveList(List<SysRoleRight> list);

	 public List<CheckBox> selectRight(String roleid);
	 
	 public List<SysRight> selectButton(String roleid, String parentid);

}
