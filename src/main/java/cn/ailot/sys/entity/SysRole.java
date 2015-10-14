package cn.ailot.sys.entity;

/**
 * 角色类
 * @author LiTao
 *
 */
public class SysRole {
	private BsData bs;
    private String roleid;

    private String rolename;

    private String roletype;
    

    public BsData getBs() {
		return bs;
	}

	public void setBs(BsData bs) {
		this.bs = bs;
	}

	public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid == null ? null : roleid.trim();
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename == null ? null : rolename.trim();
    }

    public String getRoletype() {
        return roletype;
    }

    public void setRoletype(String roletype) {
        this.roletype = roletype == null ? null : roletype.trim();
    }
}