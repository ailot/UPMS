package cn.ailot.common.general;

import cn.ailot.util.PropertiesLoader;

public class General {
	
	/**
	 * 属性文件加载对象
	 */
	private static PropertiesLoader loader = new PropertiesLoader("jdbc.properties");
	
	/*全局session*/
	public static final String CURRENT_USER = "CURRENT_USER";
	
	/*全局信息提示*/
	public static final String SUCCESSFUL = "操作成功";
	/*全局信息提示*/
	public static final String FAILURE = "操作失败";
	
	/**
	 * 获取配置
	 */
	public static String getConfig(String key) {
		return loader.getProperty(key);
	}
	
	/**
	 * 读取配置文件，获得上传文件的根目录。
	 * @return
	 */
	public static String getFilePath(){
		return getConfig("file_path");
	}
	
}
