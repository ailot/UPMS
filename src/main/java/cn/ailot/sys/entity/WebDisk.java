package cn.ailot.sys.entity;

public class WebDisk {
	
	private String id;
	private String userid;
	private Integer totalsize;
	private Integer usedsize;
	private Integer filenumber;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public Integer getTotalsize() {
		return totalsize;
	}
	public void setTotalsize(Integer totalsize) {
		this.totalsize = totalsize;
	}
	public Integer getUsedsize() {
		return usedsize;
	}
	public void setUsedsize(Integer usedsize) {
		this.usedsize = usedsize;
	}
	public Integer getFilenumber() {
		return filenumber;
	}
	public void setFilenumber(Integer filenumber) {
		this.filenumber = filenumber;
	}
}
