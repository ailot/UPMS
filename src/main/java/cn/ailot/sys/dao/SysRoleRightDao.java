package cn.ailot.sys.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.ailot.common.base.BaseDao;
import cn.ailot.sys.entity.CheckBox;
import cn.ailot.sys.entity.SysRight;
import cn.ailot.sys.entity.SysRoleRight;
public interface SysRoleRightDao extends BaseDao<SysRoleRight>{

    public void saveList(List<SysRoleRight> list);

    public List<CheckBox> selectRight(String roleid);
    
    public List<SysRight> selectButton(@Param(value = "roleid") String roleid, @Param(value = "parentid") String parentid);

}