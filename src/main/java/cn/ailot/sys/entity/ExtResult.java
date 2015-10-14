package cn.ailot.sys.entity;

public class ExtResult {
	
	private boolean success;
	private Object msg;
	
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public Object getMsg() {
		return msg;
	}

	public void setMsg(Object msg) {
		this.msg = msg;
	}
	
	/**
	 * 无参构造函数
	 */
	public ExtResult(){}

	/**
	 * EXTJS消息提示
	 * @param success
	 * @param msg
	 */
	public ExtResult(boolean success,Object msg){
		this.success = success;
		this.msg = msg;
	}

	/**
	 * 异常消息提示
	 */
	public ExtResult(Object errorMsg){
		this.success = false;
		this.msg = errorMsg;
	}
}
