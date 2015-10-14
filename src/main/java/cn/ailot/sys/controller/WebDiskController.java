package cn.ailot.sys.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import cn.ailot.common.base.BaseController;
import cn.ailot.sys.entity.DiskFile;
import cn.ailot.sys.entity.WebDisk;
import cn.ailot.sys.service.WebDiskService;

@Controller
public class WebDiskController extends BaseController<WebDisk>{
	@Autowired//自动set
	private WebDiskService webDiskService;
	private static Logger logger = LoggerFactory.getLogger(WebDiskController.class);
	
	public boolean isEnoughSpace(DiskFile diskFile){
		WebDisk webDisk = webDiskService.selectById(getUserInfo().getUserid());
		if(webDisk.getTotalsize() > (webDisk.getUsedsize()+diskFile.getSize())){
			return true;
		}
		return false;
	}
}	
