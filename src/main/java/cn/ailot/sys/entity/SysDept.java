package cn.ailot.sys.entity;

/**
 * 部门基本类
 * @author LiTao
 *
 */
public class SysDept {
	private BsData bs;
	
    private String deptid;

    private String deptname;

    private String parentid;

    private String areacode;
    private String areaname;

    private String state;

    private String phone;

	public BsData getBs() {
		return bs;
	}

	public void setBs(BsData bs) {
		this.bs = bs;
	}

	public String getAreaname() {
		return areaname;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}
	
	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	public String getDeptname() {
		return deptname;
	}

	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getAreacode() {
		return areacode;
	}

	public void setAreacode(String areacode) {
		this.areacode = areacode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
}