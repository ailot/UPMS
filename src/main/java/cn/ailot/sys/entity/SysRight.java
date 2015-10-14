package cn.ailot.sys.entity;

/**
 * 权限类
 *
 */
public class SysRight {
    private String rightid;

    private String rightname;

    private String menuurl;

    private String parentid;

    private String rightsort;

    public String getRightid() {
        return rightid;
    }

    public void setRightid(String rightid) {
        this.rightid = rightid == null ? null : rightid.trim();
    }

    public String getRightname() {
        return rightname;
    }

    public void setRightname(String rightname) {
        this.rightname = rightname == null ? null : rightname.trim();
    }

    public String getMenuurl() {
        return menuurl;
    }

    public void setMenuurl(String menuurl) {
        this.menuurl = menuurl == null ? null : menuurl.trim();
    }

    public String getParentid() {
        return parentid;
    }

    public void setParentid(String parentid) {
        this.parentid = parentid == null ? null : parentid.trim();
    }

    public String getRightsort() {
        return rightsort;
    }

    public void setRightsort(String rightsort) {
        this.rightsort = rightsort == null ? null : rightsort.trim();
    }
}