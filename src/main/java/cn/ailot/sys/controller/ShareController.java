package cn.ailot.sys.controller;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.ailot.common.base.BaseController;
import cn.ailot.sys.entity.DiskFile;
import cn.ailot.sys.service.DiskFileService;
import cn.ailot.util.DownloadUtil;

@Controller
public class ShareController extends BaseController<DiskFile>{
	@Autowired//自动set
	private DiskFileService diskFileService;
	private static Logger logger = LoggerFactory.getLogger(ShareController.class);
	/**
	 * 查询所有分享的
	 */
	@RequestMapping("share!files.action")
	@ResponseBody
	public Object ShareFiles(){
		list = diskFileService.loadAllShareFiles();
		return list;
	}
	
	/**
	 * 分享下载
	 * @param response
	 * @param shareId
	 */
	@RequestMapping("share!download.action")
	public void download(HttpServletResponse response,String shareId){
		DiskFile myFile = diskFileService.selectById(shareId);
		DownloadUtil.download(response, myFile);
		diskFileService.updateShareDownload(shareId);
	}

}
