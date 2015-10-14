<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/view/include/head.jsp"%>
<style type="text/css">
.content{
	text-align: left;
	left: 20px
	}
</style>
</script>
</head>
<body>
<div style="width:100%; text-align:center; font-size:14px;"><br/>
			<p style=" font-weight:600; font-size:15px">${notice.title}</p>
			<span style=" font-size:12px; line-height:30px; color:#545A3E;">时间：${notice.time}</span>
			
			<div style="margin:0 auto; width:70%; text-align:left;">
		  		${notice.content}
		    </div>       
		 </div>
</body>
</html>