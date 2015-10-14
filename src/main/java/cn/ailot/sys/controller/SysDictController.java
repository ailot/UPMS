package cn.ailot.sys.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mysql.jdbc.PreparedStatement.ParseInfo;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.ExtTree;
import cn.ailot.sys.entity.SysDict;
import cn.ailot.sys.service.SysDictService;
import cn.ailot.util.DateUtil;

/**
 * @author litao
 *
 */
@Controller
public class SysDictController extends BaseController<SysDict>{
	
	@Autowired//自动set
	private SysDictService sysDictService;
	private static Logger logger = LoggerFactory.getLogger(SysDictController.class);
	
	/**
	 * 查询字典项
	 * @param req
	 * @return
	 */
	@RequestMapping("/dict!selectDistinctDict.action")
	@ResponseBody
	public Object selectDistinctDict(HttpServletRequest req){
		list = sysDictService.selectDistinctDictList();
		return list;
	}
	@RequestMapping("/dict!selectTreeGrid.action")
	@ResponseBody
	public Object selectTreeGrid(HttpServletRequest req){
		String pid = req.getParameter("node");
		SysDict dict = new SysDict(req.getParameter("label"));
		dict.setValue(req.getParameter("value"));
		if(null==pid || "".equals(pid)){
		}else{
			dict.setParentkey(pid);
		}
		return sysDictService.selectTreeGrid(dict);
	} 
	/**
	 * 保存或新增字典
	 * @param req
	 * @return
	 */
	@RequestMapping("/dict!saveDict.action")
	@ResponseBody
	public Object saveDict(SysDict dict){
		if(dict.getId() == null){
			dict.setId(sysDictService.getMaxRow());
			sysDictService.save(dict);
		}else{
			sysDictService.update(dict);
		}
		return new ExtResult(true, General.SUCCESSFUL);
	} 
	/**
	 * 查询全部
	 * @param sysDict
	 * @param req
	 * @return
	 */
	@RequestMapping("/dict!selectAll.action")
	@ResponseBody
	public Object selectAll(SysDict sysDict,HttpServletRequest req){
		sysDict.setBs(getBsData(req));
		extData.setList(sysDictService.selectAll(sysDict));
		extData.setTotalCount(sysDictService.selectCount(sysDict));
		return extData;
	}
	
	/**
	 * 按label查询，普通下拉
	 * @param sysDict
	 * @param req
	 * @return
	 */
	@RequestMapping("/dict!selectByLabel.action")
	@ResponseBody
	public Object selectByLabel(HttpServletRequest req){
		list = sysDictService.selectByLabel(req.getParameter("label"));
		return list;
	}
	
	/**
	 * 按label查询,树形下拉
	 * @param sysDict
	 * @param req
	 * @return
	 */
	@RequestMapping("/dict!getDictTree.action")
	@ResponseBody
	public Object getDictTree(HttpServletRequest req){
		List<ExtTree> all  = sysDictService.getDictTree(req.getParameter("label"));
		//菜单组装
		List<ExtTree> trees = new ArrayList<ExtTree>();
		if(all != null && all.size()>0){
			for(int i=0;i<all.size();i++){
				String id = all.get(i).getId();
				for(int j=0;j<all.size();j++){
					if(id.equals(all.get(j).getParentKey())){
						all.get(i).getChildren().add(all.get(j));
					}
				}
			}
			for(int k=0;k<all.size();k++){
				if("0".equals(all.get(k).getParentKey())||null==all.get(k).getParentKey()||all.get(k).getParentKey().isEmpty()){
					trees.add(all.get(k));
				}
			}
		}
		return trees;
	}
	
	/**
	 * 删除
	 * @param sysDept
	 * @param req
	 * @return
	 */
	@RequestMapping("/dict!delete.action")
	@ResponseBody
	public ExtResult delete(String ids){
		String[] dictids = ids.split(",");
		sysDictService.delete(dictids);
		return new ExtResult(true,General.SUCCESSFUL);
	}
}
