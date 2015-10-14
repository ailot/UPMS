package cn.ailot.sys.entity;

public class SysDict {
	private BsData bs;
    private Integer id;

    private String label;

    private String name;

    private String key;

    private String value;

    private String parentkey;

    private String pinyin;

    private boolean leaf;
    private String parentvalue;
    
    public SysDict(){}
	public SysDict(String label) {
		this.label = label;
	}
	
    public BsData getBs() {
		return bs;
	}

	public void setBs(BsData bs) {
		this.bs = bs;
	}


	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getParentvalue() {
		return parentvalue;
	}
	public void setParentvalue(String parentvalue) {
		this.parentvalue = parentvalue;
	}
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label == null ? null : label.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key == null ? null : key.trim();
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value == null ? null : value.trim();
    }

    public String getParentkey() {
        return parentkey;
    }

    public void setParentkey(String parentkey) {
        this.parentkey = parentkey == null ? null : parentkey.trim();
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin == null ? null : pinyin.trim();
    }
}