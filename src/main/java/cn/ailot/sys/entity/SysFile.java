package cn.ailot.sys.entity;



public class SysFile{
	
	private BsData bs;
	private String id;
	private String name;
	private String bz;
	private String time;
	
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public BsData getBs() {
		return bs;
	}
	public void setBs(BsData bs) {
		this.bs = bs;
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
