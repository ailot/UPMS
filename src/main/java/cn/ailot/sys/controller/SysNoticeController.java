package cn.ailot.sys.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.SysNotice;
import cn.ailot.sys.service.SysNoticeService;
import cn.ailot.util.DateUtil;

/**
 * @author litao
 *
 */
@Controller
public class SysNoticeController extends BaseController<SysNotice>{
	
	@Autowired//自动set
	private SysNoticeService sysNoticeService;
	private static Logger logger = LoggerFactory.getLogger(SysNoticeController.class);
	
	/**
	 * 查询全部
	 * @param sysNotice
	 * @param req
	 * @return
	 */
	@RequestMapping("/notice!selectAll.action")
	@ResponseBody
	public Object selectAll(SysNotice sysNotice,HttpServletRequest req){
		sysNotice.setBs(getBsData(req));
		list = sysNoticeService.selectAll(sysNotice);
		return list;
	}
	
	/**
	 * 新增通知公告
	 * @param sysNotice
	 * @return
	 */
	@RequestMapping("/notice!add.action")
	@ResponseBody
	public ExtResult add(SysNotice sysNotice){
		sysNotice.setId(DateUtil.getUUID());
		sysNotice.setTime(DateUtil.dataNow());
		sysNoticeService.save(sysNotice);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 修改通知公告
	 * @param sysNotice
	 * @return
	 */
	@RequestMapping("/notice!update.action")
	@ResponseBody
	public ExtResult update(SysNotice sysNotice){
		sysNoticeService.update(sysNotice);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 通知公告删除
	 * @param sysNotice
	 * @return
	 */
	@RequestMapping("/notice!delete.action")
	@ResponseBody
	public ExtResult delete(String ids){
		String[] deptids = ids.split(",");
		sysNoticeService.delete(deptids);
		return new ExtResult(true,General.SUCCESSFUL);
	}
	
	/**
	 * 通知公告查询
	 * @param sysNotice
	 * @param req
	 * @return
	 */
	@RequestMapping("/notice!selectAny.action")
	@ResponseBody
	public Object selectAny(){
		list = sysNoticeService.selectAny();
		return list;
	}
	
	/**
	 * 通知公告查询
	 * @param sysNotice
	 * @return
	 */
	@RequestMapping("/notice!selectById.action")
	public Object selectById(String id,HttpServletRequest req){
		req.setAttribute("notice", sysNoticeService.selectById(id));
		return "sys/noticeshow";
	}
	
}
