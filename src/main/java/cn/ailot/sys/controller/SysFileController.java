package cn.ailot.sys.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.SysFile;
import cn.ailot.sys.service.SysFileService;
import cn.ailot.util.DateUtil;
import cn.ailot.util.UploadUtil;

/**
 * @author litao
 *
 */
@Controller
public class SysFileController extends BaseController<SysFile>{
	
	@Autowired//自动set
	private SysFileService sysFileService;
	private static Logger logger = LoggerFactory.getLogger(SysFileController.class);
	
	/**
	 * 查询全部
	 * @param sysFile
	 * @param req
	 * @return
	 */
	@RequestMapping("/file!selectAll.action")
	@ResponseBody
	public Object selectAll(SysFile sysFile,HttpServletRequest req){
		sysFile.setBs(getBsData(req));
		list = sysFileService.selectAll(sysFile);
		return list;
	}
	
	/**
	 * 新增政策文件
	 * @param sysFile
	 * @param req
	 * @return
	 * @throws IOException 
	 * @throws  
	 */
	
	@RequestMapping(value ="/file!add.action", method = RequestMethod.POST)
	@ResponseBody
	public Object add(
			@RequestParam(value="file",required=false)
			MultipartFile file,SysFile sysFile) throws IOException{
		Map<String, Object> result = new HashMap<String, Object>();
		//获取真实路径
		String path =General.getFilePath();
		String fileName = file.getOriginalFilename();	//获取文件名
		sysFile.setId(DateUtil.getUUID());
		sysFile.setName(fileName);
		sysFile.setTime(DateUtil.dataNow());
		File targetFile = new File(path,fileName);
		if(!targetFile.exists()){//如果文件夹不存在就重新创建
			logger.info("mkdir:{}",targetFile.mkdirs());
			targetFile.mkdirs();
		}

		file.transferTo(targetFile);
	
		sysFileService.save(sysFile);
		result.put("success", true);
		result.put("msg", "操作成功");
		result.put("url","file!download.action?filename="+fileName);
		result.put("fileName", fileName);
		return result;
	
	}
	
	/**
	 * 新增图片信息
	 * @param 
	 * @param req
	 * @return
	 */
	@RequestMapping(value ="/image!add.action", method = RequestMethod.POST)
	@ResponseBody
	public Object imageadd(
			@RequestParam(value="file",required=false)
			MultipartFile file,HttpServletRequest req){
				Map<String, Object> result = new HashMap<String, Object>();
				UploadUtil upload = new UploadUtil();
				//获取真实路径
				String path = req.getSession().getServletContext().getRealPath("imageupload");
				String fileName = file.getOriginalFilename();	//获取文件名
				String suffix = fileName.substring(fileName.lastIndexOf(".")+1);
				String newfileName ="IMG"+new Date().getTime()+"."+suffix;
				File targetFile = new File(path);
				if(!targetFile.exists()){//如果文件夹不存在就重新创建
					targetFile.mkdirs();
				}
				try {
					upload.upload(file, path+"/"+newfileName);
					/*获取文件路径*/
					//model.addAttribute("fileUrl", req.getContextPath()+"/upload/"+fileName);
					//logger.info("fileUrl:{}",model.get("fileUrl"));
					result.put("success", true);
					result.put("msg", "操作成功");
					result.put("fileName", fileName);
					result.put("newfileName",newfileName);
					return result;
				} catch (Exception e) {
					// TODO: handle exception
					logger.error("add Exception:", e.getMessage());
					return new ExtResult(false,General.FAILURE);
				}
			}
	
	public void upload(MultipartFile file,String path) throws IOException{
		FileOutputStream out = new FileOutputStream(path);
		FileCopyUtils.copy(file.getBytes(), out);
	}
	/**
	 * 政策文件删除
	 * @param sysFile
	 * @param req
	 * @return
	 */
	@RequestMapping("/file!delete.action")
	@ResponseBody
	public ExtResult delete(String ids,HttpServletRequest req){
		String[] deptids = ids.split(",");
		sysFileService.delete(deptids);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 政策文件下载
	 * @param sysFile
	 * @param req
	 * @return
	 * @throws java.io.IOException 
	 * @throws Exception 
	 */
	@RequestMapping("/file!download.action")
	@ResponseBody
	public void download(String filename,HttpServletRequest req,HttpServletResponse resp) throws IOException{
		req.setCharacterEncoding("UTF-8");
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		//获取文件存放的目录
		String ctxPath =General.getFilePath();
		StringBuffer downloadPath = new StringBuffer();
		downloadPath.append(ctxPath).append("/").append(filename);
		logger.info("downloadPath:{}",downloadPath);
		//获取文件长度
		long fileLength = new File(downloadPath.toString()).length();
		//设置文件输出类型
		resp.setContentType("application/octet-stream");
		resp.setHeader("Content-disposition", "attachment;filename="+ new String(filename.getBytes("UTF-8"),"ISO-8859-1"));
		//设置输出长度
		resp.setHeader("Content-Length", String.valueOf(fileLength));
		//获取输入流
		bis = new BufferedInputStream(new FileInputStream(downloadPath.toString()));
		//输出流
		bos = new BufferedOutputStream(resp.getOutputStream());
		byte[] buff = new byte[2048];
		int bytesRead;
		while(-1 != (bytesRead = bis.read(buff,0,buff.length))){
			bos.write(buff, 0, bytesRead);
		}
		//关闭流
		bis.close();
		bos.close();
	}
}
