package cn.ailot.sys.entity;

/**
 * 新基础类，集成 分页、数据权限
 * 请勿继承此类，以免数据被传到前台
 * 使用方法： 需用的此类的，private BaseData bs   （get/set） sql语句中 bs.*使用
 *
 */
public class BsData {
	private String condition;
	private SysUser sysuser;
	
	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public SysUser getSysuser() {
		return sysuser;
	}

	public void setSysuser(SysUser sysuser) {
		this.sysuser = sysuser;
	}

	@Override
	public String toString() {
		return "BsData [condition=" + condition + ", sysuser=" + sysuser.getUsername() + "]";
	}
	
	
}
