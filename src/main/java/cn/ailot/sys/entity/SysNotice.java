package cn.ailot.sys.entity;


public class SysNotice{
	
	private BsData bs;
	private String id;
	private String title;
	private String content;
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
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
}
