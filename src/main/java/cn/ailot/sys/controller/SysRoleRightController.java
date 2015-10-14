package cn.ailot.sys.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.ailot.common.base.BaseController;
import cn.ailot.common.general.General;
import cn.ailot.sys.entity.CheckBox;
import cn.ailot.sys.entity.ExtResult;
import cn.ailot.sys.entity.SysRight;
import cn.ailot.sys.entity.SysRoleRight;
import cn.ailot.sys.service.SysRoleRightService;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * @author litao
 *
 */
@Controller
public class SysRoleRightController extends BaseController<SysRoleRight>{
	
	@Autowired//自动set
	private SysRoleRightService sysRoleRightService;
	private static Logger logger = LoggerFactory.getLogger(SysRoleRightController.class);


	/**
	 * 权限查找
	 * @param SysRoleRight
	 * @param req
	 * @return
	 */
	@RequestMapping("/right!selectRight.action")
	@ResponseBody
	public Object selectRight(String roleid,HttpServletRequest req){


		List<CheckBox> jsonList = sysRoleRightService.selectRight(roleid);
		List<CheckBox> list = new ArrayList<CheckBox>();
		for(int i=0;i<jsonList.size();i++){
			String id = jsonList.get(i).getId();
			for(CheckBox j2 : jsonList){
				if(id.equals(j2.getParentKey())){
					jsonList.get(i).setLeaf(false);
					j2.setLeaf(true);
					jsonList.get(i).getChildren().add(j2);
				}
			}
		}
		for(CheckBox j2 : jsonList){
			String key = j2.getParentKey();
			if(key==null||"".equals(key)){
				list.add(j2);
			}
		}
		return list;
	}
	
	/**
	 * 权限保存
	 * @param SysRoleRight
	 * @param req
	 * @return
	 * @throws IOException 
	 * @throws  
	 * @throws  
	 */
	@RequestMapping("/right!saveRight.action")
	@ResponseBody
	public ExtResult saveRight(HttpServletRequest req) throws IOException{
		String[] roleids = {req.getParameter("roleid")};
		String rights = req.getParameter("rights");

		ObjectMapper mapper = new ObjectMapper();
		List<SysRoleRight> rightList = mapper.readValue(rights, List.class);
		sysRoleRightService.delete(roleids);
		sysRoleRightService.saveList(rightList);
		return new ExtResult(true,General.SUCCESSFUL);
	
	}
	
	/**
	 * 按钮查询
	 * @return
	 */
	@RequestMapping("right!selectButton.action")
	@ResponseBody
	public ExtResult selectButton(String roleid,String parentid){
		List<SysRight> btnList = sysRoleRightService.selectButton(roleid, parentid);
		return new ExtResult(true,btnList);
	}
}
