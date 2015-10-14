package cn.ailot.sys.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.DiskFile;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.WebDisk;
import cn.ailot.sys.service.DiskFileService;
import cn.ailot.sys.service.WebDiskService;
import cn.ailot.util.DateUtil;
import cn.ailot.util.DownloadUtil;
import cn.ailot.util.UploadUtil;

@Controller
public class DiskFileController extends BaseController<DiskFile>{
	@Autowired//自动set
	private DiskFileService diskFileService;
	@Autowired
	private WebDiskService webDiskService;
	private static Logger logger = LoggerFactory.getLogger(DiskFileController.class);
	
	
	/**
	 * 查询文件夹内所有文件
	 * @param id
	 * @param re
	 * @return
	 */
	@RequestMapping("disk!selectByFolderId.action")
	@ResponseBody
	public Object selectByFolderId(String id){
		list = diskFileService.selectByFolderId(id);
		return list;
	}
	
	/**
	 * 新建文件夹
	 * @return
	 */
	@RequestMapping("disk!mkdir.action")
	@ResponseBody
	public Object mkdir(String folderId,String folderName){
		DiskFile dir = new DiskFile();
		dir.setId(DateUtil.getUUID());
		dir.setUserid(getUserInfo().getUserid());
		dir.setParentid(folderId);
		dir.setName(folderName);
		dir.setPath(diskFileService.getPath(folderId)+folderId+"/");
		dir.setType("adir");
		dir.setSize(0);
		dir.setCreatetime(DateUtil.today());
		diskFileService.save(dir);
		return new ExtResult(true,dir);
	}
	
	/**
	 * 重命名
	 * @return
	 */
	@RequestMapping("disk!rename.action")
	@ResponseBody
	public Object rename(String fileId,String fileName){
		DiskFile diskfile = new DiskFile();
		diskfile.setId(fileId);
		diskfile.setName(fileName);
		diskFileService.rename(diskfile);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 删除文件夹
	 * @return
	 */
	@RequestMapping("disk!delete.action")
	@ResponseBody
	public Object delete(String fileId){
		String userid = getUserInfo().getUserid();
		DiskFile diskfile = diskFileService.selectById(fileId);
		//如果是文件，直接删除
		if(!diskfile.getType().equals("adir")){
			diskFileService.deleteFile(diskfile);
			new File(diskfile.getLocation()).delete();
		}else{
			StringBuffer path = new StringBuffer(diskFileService.getPath(fileId));
			path.append(fileId).append("/");
			list = diskFileService.selectByPath(path.toString());
			//是文件夹就直接删除数据记录，是文件就把文件删除后再删除数据库记录
			if(list != null){
				for(DiskFile df : list){
					logger.info("删除文件：{}",df.getLocation());
					diskFileService.deleteFile(df);
					new File(df.getLocation()).delete();
				}
			}
			diskFileService.deleteFile(diskfile);
		}
		webDiskService.updateParam(userid);
		WebDisk diskInfo = webDiskService.selectById(userid);
		session.setAttribute("diskInfo", diskInfo);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 文件上传
	 * @param req
	 * @param folderId
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("disk!upload.action")
	@ResponseBody
	public Object upload(HttpServletRequest req,String folderId) throws IOException{
		String userid = getUserInfo().getUserid();
		WebDisk webDisk = null;
		DiskFile diskFile = null;
		//上传辅助类
		UploadUtil upload = new UploadUtil();
		List<MultipartFile> fileList = upload.getFiles(req);
		for(MultipartFile file : fileList){
			diskFile = new DiskFile();
			//获取文件名
			String fileName = file.getOriginalFilename();
			//获取文件后缀
			String suffix = fileName.substring(fileName.lastIndexOf(".")+1);
			diskFile.setUserid(userid);
			diskFile.setSize((int) file.getSize());
			webDisk = webDiskService.selectById(userid);
			if(webDisk.getTotalsize()>(webDisk.getUsedsize()+diskFile.getSize())){
				StringBuffer filePath = new StringBuffer(General.getFilePath());
				File targetFolder = new File(filePath.toString());
				if(!targetFolder.exists()){//如果文件夹不存在就重新创建
					targetFolder.mkdirs();
				}
				filePath.append(new Date().getTime()).append(".").append(suffix);
				logger.info("filePath:{}",filePath);
				upload.upload(file, filePath.toString());
				diskFile.setId(DateUtil.getUUID());
				diskFile.setCreatetime(DateUtil.dataNow());
				diskFile.setName(fileName);
				diskFile.setParentid(folderId);
				diskFile.setType(suffix.toLowerCase());
				diskFile.setPath(diskFileService.getPath(folderId)+folderId+"/");
				diskFile.setLocation(filePath.toString());
				diskFileService.save(diskFile);
				webDisk.setUsedsize(webDisk.getUsedsize()+diskFile.getSize());
				webDisk.setFilenumber(webDisk.getFilenumber()+1);
				webDiskService.updateNum(webDisk);
			}
		}
		/*同步网盘信息*/
		webDisk = webDiskService.selectById(userid);
		session.setAttribute("diskInfo",webDisk);
		return new ExtResult(true,diskFile);
	}
	
	/**
	 * 文件移动
	 * @param sourceId
	 * @param targetId
	 * @return
	 */
	@RequestMapping("disk!moveFile.action")
	@ResponseBody
	public Object moveFile(String sourceId,String targetId){
		logger.info("id:{},{}",sourceId,targetId);
		DiskFile sourceFile = diskFileService.selectById(sourceId);
		DiskFile targetFile = diskFileService.selectById(targetId);
		DiskFile diskFile = new DiskFile();
		StringBuffer targetPath = new StringBuffer(targetFile.getPath()).append(targetFile.getId()).append("/");
		if(sourceFile.getType().equals("adir")){
			StringBuffer likePath = new StringBuffer(sourceFile.getPath()).append(sourceFile.getId()).append("/%");
			diskFileService.moveFile(sourceFile.getPath(), targetPath.toString(), likePath.toString());
		}else{
			diskFile.setParentid(targetFile.getId());
			diskFile.setPath(targetPath.toString());
			diskFile.setId(sourceFile.getId());
			diskFileService.update(diskFile);
		}
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 文件下载
	 * @param fileId
	 * @param resp
	 */
	@RequestMapping("disk!download.action")
	@ResponseBody
	public void download(String fileId,HttpServletResponse resp){
		DiskFile diskFile = diskFileService.selectById(fileId);
		DownloadUtil.download(resp, diskFile);
	}
	
	/**
	 * 文件分享
	 * @param fileId
	 * @param req
	 * @return
	 */
	@RequestMapping("disk!share.action")
	@ResponseBody
	public Object share(String fileId,HttpServletRequest req){
		DiskFile diskFile = diskFileService.selectById(fileId);
		if(diskFile!=null){
			String url = (req.getRequestURL().toString()).replace(req.getServletPath(), "");
			StringBuffer shareurl = new StringBuffer(url).append("/share!download.action");
			diskFile.setShareurl(shareurl.toString());
			diskFileService.share(diskFile);
			return new ExtResult(true,shareurl.toString());
		}
		return new ExtResult(General.FAILURE);
	}
	
	/**
	 * 取消分享
	 * @param fileId
	 * @return
	 */
	@RequestMapping("disk!cancelShare.action")
	@ResponseBody
	public Object cancelShare(String fileId){
		diskFileService.cancelShare(fileId);
		return new ExtResult(true,General.SUCCESSFUL);
	}
}	