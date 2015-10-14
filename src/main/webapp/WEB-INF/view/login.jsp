<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html class="background">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@include file="/WEB-INF/view/include/head.jsp"%>
<script type="text/javascript" src="${path}/js/sys/login.js"></script>
<title>
${systitle }
</title>
<style>
.user {
	background: url(static/image/btn/user.png) no-repeat 42px 2px;
}

.key {
	background: url(static/image/btn/key.png) no-repeat 42px 2px;
}

.vcode {
	background: url(static/image/btn/vcode.png) no-repeat 42px 2px;
}

#checkCode {
	float: left;
}

.x-form-code {
	width: 75px;
	height: 25px;
	vertical-align: middle;
	cursor: pointer;
	float: left;
	margin-left: 5px;
}

.acceptIcon {
	background-image: url(static/image/btn/accept.png) !important;
}

.resetIcon {
	background-image: url(static/image/btn/recharge.png) !important;
}

.x-panel-body p {
	margin: 10px;
	font-size: 12px;
}

.background {
	background-image: url(static/image/16.jpg);
}

html {
	height: 100%;
	background: -webkit-linear-gradient(top, rgba(111, 143, 160, 1) 0,
		rgba(161, 188, 203, 1) 53%, rgba(70, 105, 121, 1) 100%) no-repeat
		center center;
	background: -moz-linear-gradient(top, rgba(111, 143, 160, 1) 0,
		rgba(161, 188, 203, 1) 53%, rgba(70, 105, 121, 1) 100%) no-repeat
		center center;
	background: -o-linear-gradient(top, rgba(111, 143, 160, 1) 0,
		rgba(161, 188, 203, 1) 53%, rgba(70, 105, 121, 1) 100%) no-repeat
		center center;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	-moz-user-select: none;
	-khtml-user-select: none;
	-o-user-select: none;
	-ms-user-select: none;
	-webkit-user-select: none;
	user-select: none;
	overflow: hidden;
}
</style>
</head>
<body>

</body>
</html>