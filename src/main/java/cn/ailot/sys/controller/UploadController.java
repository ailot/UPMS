package cn.ailot.sys.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import cn.ailot.common.general.General;
import cn.ailot.sys.entity.ExtResult;

@Controller
public class UploadController {
	
	private static Logger logger = LoggerFactory.getLogger(UploadController.class);
	/**
	 * 单个文件上传
	 * @param file
	 * @param req
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/upload.action")
	public Object upload(
			@RequestParam(value="file",required=false)
			MultipartFile file,
			HttpServletRequest req,
			ModelMap model){
		String path = req.getSession().getServletContext().getRealPath("upload");
		String fileName = file.getOriginalFilename();
		logger.info("path:{}",path);
		File targetFile = new File(path,fileName);
		if(!targetFile.exists()){
			targetFile.mkdirs();
		}
		//保存
		try {
			file.transferTo(targetFile);
			model.addAttribute("fileUrl", req.getContextPath()+"/upload/"+fileName);
			return new ExtResult(true, General.SUCCESSFUL);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			logger.info("Excepiton:{}",e.getMessage());
			return new ExtResult(e.getMessage());
		}
	}
	
	/**
	 * 多个文件上传
	 * @param files
	 * @param req
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/uploads.action")
	public String uploads(
			@RequestParam(value="file",required=false)
			MultipartFile[] files,
			HttpServletRequest req,
			ModelMap model){
		List<String> urls = new ArrayList<String>();
		for(MultipartFile file : files){
			String path = req.getSession().getServletContext().getRealPath("upload");
			String fileName = file.getOriginalFilename();
			System.out.println(path);
			File targetFile = new File(path,fileName);
			if(!targetFile.exists()){
				targetFile.mkdirs();
			}
			//保存
			try {
				file.transferTo(targetFile);
				urls.add(req.getContextPath()+"/upload/" + fileName);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		}
		model.addAttribute("fileUrls", urls);
		return "result";
	}

}
