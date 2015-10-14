<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="${path}/extjs/shared/include-ext.js"></script>
<script type="text/javascript">
	/* 设置自定义组件的存放路径 */
	Ext.Loader.setConfig({
	      enabled: true,
	      paths: {
	          'Ext.ux': '${path}/extjs/src/ux',
	          'Ext.app':'${path}/extjs/src/app'
	      }
	    });
</script>
<script src="${path}/extjs/packages/ext-locale/build/ext-locale-zh_CN.js"></script>
<script type="text/javascript" src="${path}/js/other/downMenu.js"></script>
<script type="text/javascript" src="${path}/js/other/util.js"></script>
<script type="text/javascript" src="${path}/js/other/jquery-1.7.min.js"></script>
<link rel="stylesheet" href="${path}/css/button.css" type="text/css" />
<input id="s_userid" type="hidden" value="${CURRENT_USER.userid}">
<input id="s_username" type="hidden" value="${CURRENT_USER.username }">
<input id="s_deptid" type="hidden" value="${CURRENT_USER.deptid }">
<input id="s_deptname" type="hidden" value="${CURRENT_USER.deptname }">
<input id="s_rolename" type="hidden" value="${CURRENT_USER.rolename }">
<input id="s_roleid" type="hidden" value="${CURRENT_USER.roleid }">
<input id="s_realname" type="hidden" value="${CURRENT_USER.realname }">
<input id="path" class="path" type="hidden" value="${path}" />
<input id="systitle" type="hidden" value="${systitle}" />
