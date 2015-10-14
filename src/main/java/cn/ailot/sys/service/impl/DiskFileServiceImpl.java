package cn.ailot.sys.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.ailot.common.base.BaseDao;
import cn.ailot.common.base.BaseServiceImpl;
import cn.ailot.sys.dao.DiskFileDao;
import cn.ailot.sys.entity.DiskFile;
import cn.ailot.sys.service.DiskFileService;

@Service("diskFileService")
public class DiskFileServiceImpl extends BaseServiceImpl<DiskFile> implements DiskFileService{
	
	@Autowired
	private DiskFileDao diskFileDao;

	@Override
	public BaseDao<DiskFile> getBaseDao() {
		// TODO Auto-generated method stub
		return diskFileDao;
	}

	@Override
	public String getHomeId(String userid) {
		// TODO Auto-generated method stub
		return diskFileDao.getHomeId(userid);
	}

	@Override
	public List<DiskFile> selectByFolderId(String id) {
		// TODO Auto-generated method stub
		return diskFileDao.selectByFolderId(id);
	}

	@Override
	public String getPath(String id) {
		// TODO Auto-generated method stub
		return diskFileDao.getPath(id);
	}

	@Override
	public String getFileName(String id) {
		// TODO Auto-generated method stub
		return diskFileDao.getFileName(id);
	}

	@Override
	public void deleteFile(DiskFile diskfile) {
		// TODO Auto-generated method stub
		diskFileDao.deleteFile(diskfile);
	}

	@Override
	public void rename(DiskFile diskfile) {
		// TODO Auto-generated method stub
		diskFileDao.rename(diskfile);
	}

	@Override
	public void share(DiskFile diskfile) {
		// TODO Auto-generated method stub
		diskFileDao.share(diskfile);
	}

	@Override
	public void cancelShare(String id) {
		// TODO Auto-generated method stub
		diskFileDao.cancelShare(id);
	}

	@Override
	public List<DiskFile> loadAllShareFiles() {
		// TODO Auto-generated method stub
		return diskFileDao.loadAllShareFiles();
	}

	@Override
	public void updateShareDownload(String userid) {
		// TODO Auto-generated method stub
		diskFileDao.updateShareDownload(userid);
	}

	@Override
	public List<DiskFile> selectByPath(String path) {
		// TODO Auto-generated method stub
		return diskFileDao.selectByPath(path);
	}

	@Override
	public void moveFile(String sourcePath, String targetPath, String likePath) {
		// TODO Auto-generated method stub
		diskFileDao.moveFile(sourcePath, targetPath, likePath);
	}
}
