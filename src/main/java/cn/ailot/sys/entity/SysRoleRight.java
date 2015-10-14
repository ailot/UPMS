package cn.ailot.sys.entity;

/**
 * 角色权限类
 * @author LiTao
 *
 */
public class SysRoleRight {
    private String rightid;

    private String roleid;

    public String getRightid() {
        return rightid;
    }

    public void setRightid(String rightid) {
        this.rightid = rightid == null ? null : rightid.trim();
    }

    public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid == null ? null : roleid.trim();
    }
}