package cn.ailot.sys.service;

import java.util.List;

import cn.ailot.common.base.BaseService;
import cn.ailot.sys.entity.DiskFile;

public interface DiskFileService extends BaseService<DiskFile>{
	
	/**
	 * 获取根目录id
	 * @param userid
	 * @return
	 */
	public String getHomeId(String userid);
	
	/**
	 * 获取文件夹里面的东西
	 * @param id
	 * @return
	 */
	public List<DiskFile> selectByFolderId(String id);
	
	/**
	 * 获取路径
	 * @param id
	 * @return
	 */
	public String getPath(String id);
	
	/**
	 * 获取文件名
	 * @param id
	 * @return
	 */
	public String getFileName(String id);
	
	/**
	 * 删除文件
	 * @param id
	 * @param userid
	 */
	public void deleteFile(DiskFile diskfile);
	
	/**
	 * 文件重命名
	 * @param diskfile
	 */
	public void rename(DiskFile diskfile);
	
	/**
	 * 文件分享
	 * @param diskfile
	 */
	public void share(DiskFile diskfile);
	
	/**
	 * 取消分享
	 * @param diskfile
	 */
	public void cancelShare(String id);
	
	/**
	 * 返回所有共享文件
	 * @param userid
	 * @return
	 */
	public List<DiskFile> loadAllShareFiles();
	
	/**
	 * 更新分享下载数
	 * @param userid
	 */
	public void updateShareDownload(String userid);
	
	public List<DiskFile> selectByPath(String path);
	
	public void moveFile(String sourcePath, String targetPath, String likePath);
}
