package cn.ailot.sys.entity;

public class SysUser {
	private BsData bs;
    private String userid;

    private String deptid;
    private String deptname;
    
    private String username;
    private String realname;
    private String userpwd;

    private String state;

    private String roleid;
    private String rolename;
    private String areacode;
    
    public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getAreacode() {
		return areacode;
	}

	public void setAreacode(String areacode) {
		this.areacode = areacode;
	}

	public BsData getBs() {
		return bs;
	}

	public void setBs(BsData bs) {
		this.bs = bs;
	}
	
	public String getDeptname() {
		return deptname;
	}

	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid == null ? null : userid.trim();
    }

    public String getDeptid() {
        return deptid;
    }

    public void setDeptid(String deptid) {
        this.deptid = deptid == null ? null : deptid.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getUserpwd() {
        return userpwd;
    }

    public void setUserpwd(String userpwd) {
        this.userpwd = userpwd == null ? null : userpwd.trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }

    public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid == null ? null : roleid.trim();
    }

	@Override
	public String toString() {
		return "SysUser [userid=" + userid + ", deptid=" + deptid
				+ ", deptname=" + deptname + ", username=" + username
				+ ", realname=" + realname + ", userpwd=" + userpwd
				+ ", state=" + state + ", roleid=" + roleid + ", rolename="
				+ rolename + ", areacode=" + areacode + "]";
	}
}
