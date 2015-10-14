package cn.ailot.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;

public class MD5Util {
	/**
	 * 利用MD5算法加密
	 */
	public static String MD5Encode(String str) {
		String encodeStr = null;
		try {
			MessageDigest md5Code = MessageDigest.getInstance("md5");
			byte[] bTmp = md5Code.digest(str.getBytes());
			// 采用Base64算法加密后的byte[]转换成string
			BASE64Encoder base64 = new BASE64Encoder();
			encodeStr = base64.encode(bTmp);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return encodeStr;
	}
	
	public static void main(String[] args) {
		System.out.println(MD5Util.MD5Encode("1"));
	}

}
