package cn.ailot.sys.entity;

import java.util.List;

public class ExtData {
	private Integer totalCount;		//数量
	private List<? extends Object> list;			//集合
	
	public Integer getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}
	public List<? extends Object> getList() {
		return list;
	}
	public void setList(List<? extends Object> list) {
		this.list = list;
	}
}
