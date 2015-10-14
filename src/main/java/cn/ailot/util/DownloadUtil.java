package cn.ailot.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

import cn.ailot.sys.entity.DiskFile;

public class DownloadUtil {
	public static void download(HttpServletResponse resp,DiskFile diskFile){
		String fileName = "unknown";
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;
		try {
			fileName = URLEncoder.encode(diskFile.getName(),"UTF-8").replace("+", "%20");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		resp.reset();
		resp.setContentType("application/octet-stream");
		resp.setHeader("Content-disposition", "attachment;filename="+ fileName);
		//设置输出长度
		resp.setHeader("Content-Length", diskFile.getSize().toString());
		try {
			bis = new BufferedInputStream(new FileInputStream(diskFile.getLocation()));
			bos = new BufferedOutputStream(resp.getOutputStream());
			byte[] buff = new byte[2048];
			int bytesRead;
			while(-1 != (bytesRead = bis.read(buff,0,buff.length))){
				bos.write(buff, 0, bytesRead);
			}
			//关闭流
			bis.close();
			bos.close();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
}
