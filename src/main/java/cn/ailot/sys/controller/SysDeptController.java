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
import cn.ailot.sys.entity.SysDept;
import cn.ailot.sys.service.SysDeptService;
import cn.ailot.util.DateUtil;

/**
 * @author litao
 *
 */
@Controller
public class SysDeptController extends BaseController<SysDept> {

	@Autowired // 自动set
	private SysDeptService sysDeptService;
	private static Logger logger = LoggerFactory.getLogger(SysDeptController.class);

	/**
	 * 查询全部
	 * 
	 * @param sysDept
	 * @param req
	 * @return
	 */
	@RequestMapping("/dept!selectAll.action")
	@ResponseBody
	public Object selectAll(SysDept sysDept, HttpServletRequest req) {
		sysDept.setBs(getBsData(req));
		extData.setList(sysDeptService.selectAll(sysDept));
		extData.setTotalCount(sysDeptService.selectCount(sysDept));
		return extData;
	}

	/**
	 * 单位新增
	 * 
	 * @param sysDept
	 * @param req
	 * @return
	 */
	@RequestMapping("/dept!add.action")
	@ResponseBody
	public ExtResult add(SysDept sysDept, HttpServletRequest req) {
		sysDept.setDeptid(DateUtil.getUUID());
		sysDeptService.save(sysDept);
		return new ExtResult(true, General.SUCCESSFUL);
	}

	/**
	 * 单位修改
	 * 
	 * @param sysDept
	 * @param req
	 * @return
	 */
	@RequestMapping("/dept!update.action")
	@ResponseBody
	public ExtResult update(SysDept sysDept, HttpServletRequest req) {
		sysDeptService.update(sysDept);
		return new ExtResult(true, General.SUCCESSFUL);
	}

	/**
	 * 单位删除
	 * 
	 * @param sysDept
	 * @param req
	 * @return
	 */
	@RequestMapping("/dept!delete.action")
	@ResponseBody
	public ExtResult delete(String ids, HttpServletRequest req) {
		String[] deptids = ids.split(",");
		sysDeptService.delete(deptids);
		return new ExtResult(true, General.SUCCESSFUL);
	}

	/**
	 * 单位注销
	 * 
	 * @param sysDept
	 * @param req
	 * @return
	 */
	@RequestMapping("/dept!stop.action")
	@ResponseBody
	public ExtResult stop(String ids) {
		String[] deptids = ids.split(",");
		map.put("deptids", deptids);
		map.put("state", "0");
		sysDeptService.change(map);
		return new ExtResult(true, General.SUCCESSFUL);
	}

	/**
	 * 单位启用
	 * 
	 * @param sysDept
	 * @param req
	 * @return
	 */
	@RequestMapping("/dept!start.action")
	@ResponseBody
	public ExtResult start(String ids, HttpServletRequest req) {
		String[] deptids = ids.split(",");
		map.put("deptids", deptids);
		map.put("state", "1");
		sysDeptService.change(map);
		return new ExtResult(true, General.SUCCESSFUL);
	}
}
