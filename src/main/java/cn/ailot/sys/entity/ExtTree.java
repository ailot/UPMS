package cn.ailot.sys.entity;

import java.util.ArrayList;
import java.util.List;
/**
 * ext  树形结构
 * 功能菜单  等等
 *
 */
public class ExtTree {
	private String id; 						// 主键
	private String name; 					// 称
	private String url;
	private String parentKey; 					// 一级 *外键（单位.ID）
	private boolean leaf;						//是否为叶子节点
	private List<ExtTree> children = new ArrayList<ExtTree>();		//下级
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getParentKey() {
		return parentKey;
	}
	public void setParentKey(String parentKey) {
		this.parentKey = parentKey;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public List<ExtTree> getChildren() {
		return children;
	}
	public void setChildren(List<ExtTree> children) {
		this.children = children;
	}
}
