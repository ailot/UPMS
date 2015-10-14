package cn.ailot.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Pattern;

public class DateUtil {
	
	public static String[] chars = new String[] { "a", "b", "c", "d", "e", "f",
		"g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
		"t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5",
		"6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I",
		"J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
		"W", "X", "Y", "Z" };

	/**
	 * 短UUID
	 * @return
	 */
	public static String getShortUuid() {
		StringBuffer shortBuffer = new StringBuffer();
		String uuid = UUID.randomUUID().toString().replace("-", "");
		for (int i = 0; i < 8; i++) {
			String str = uuid.substring(i * 4, i * 4 + 4);
			int x = Integer.parseInt(str, 16);
			shortBuffer.append(chars[x % 0x3E]);
		}
		return shortBuffer.toString();
	}
	/**
	 * 时间序列
	 * @return
	 */
	public static String getUUID(){ 
    	SimpleDateFormat format = new SimpleDateFormat("yyMMddHHmmss");  
    	Date date = new Date();  
        //格式化日期  
        StringBuffer datestr = new StringBuffer(format.format(date));
        int number = new Random().nextInt(9);
        return datestr.append(number).toString();
     }
	/** 返回当前时间 */
	public static String dataNow() { 
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = String.valueOf(df.format(new Date()));
		return now;
	}
	
	/** 返回当前日期 */
	public static String today() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = String.valueOf(df.format(new Date()));
		return now.substring(0, 10);
	}
	/** 返回当前年(YYYY)*/
	public static String getyear() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = String.valueOf(df.format(new Date()));
		now = now.substring(0, 4);
		return now;
	}
	/** 返回当前月 */
	public static String getmonth() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = String.valueOf(df.format(new Date()));
		now = now.substring(5, 7);
		return now;
	}
	/** 返回当前年*/
	public String getyear_month() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String now = String.valueOf(df.format(new Date()));
		now = now.substring(0, 7);
		return now;
	}
	/** 返回当前日期 */
	public static String getday() {
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHH:mm:ss");
		String now = String.valueOf(df.format(new Date()));
		return now;
	}
	
	public static String jenerateSqlInCondition(String[] queryArray){
		return joinArray(queryArray,"','");
	}
	
    public static String joinArrayList(List<String> array,String join){
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<array.size();i++){
             if(i==(array.size()-1)){
                 sb.append(array.get(i));
             }else{
                 sb.append(array.get(i)).append(join);
             }
        } 
        return new String(sb);
    }
    
    public static String joinArray(String[] array,String join){
        StringBuffer sb=new StringBuffer();
        for(int i=0;i<array.length;i++){
             if(i == (array.length - 1)){
                 sb.append(array[i]);
             }else{
                 sb.append(array[i]).append(join);
             }
        } 
        return new String(sb);
    }
    
    /**
     * DATE1 在   DATA2 后  -1  eg:DATE1(2013-01-01) DATE2(2012-12-31)
     * DATE1 在   DATA2 之前 1  eg:DATE1(2012-12-31) DATE2(2013-01-01)
     * DATE1 等于 DATA2 返回 0 eg:DATE1(2013-01-01) DATE2(2013-01-01)
     * @param DATE1
     * @param DATE2
     * @return
     * @throws java.text.ParseException 
     */
	public static int compare_date(String DATE1, String DATE2) throws ParseException {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		
		Date dt1 = df.parse(DATE1);
		Date dt2 = df.parse(DATE2);
		if(dt1.getTime() > dt2.getTime()) {
			//System.out.println("dt1 在dt2前");
			return 1;
		}else if (dt1.getTime() < dt2.getTime()) {
			//System.out.println("dt1在dt2后");
			return -1;
		} 

		return 0;
	}
	
	/**
	 * 日期操作
	 * @param dataString 日期字符串 yyyy-MM-dd 格式
	 * @param operField 操作的field  年:Calendar.YEAR 日:Calendar.DAY_OF_MONTH  月:Calendar.MONTH 
	 * @param amount 加减数量 该数字为负则相应的field减去该值,同理amount为正
	 * @return 放回操作的日期对象
	 * @throws java.text.ParseException
	 */
	public static Date dateOper(String dataString,int operField,int amount) throws ParseException{
		// 将当前职务级别终止时间置为新职务级别的开始时间减1		
		SimpleDateFormat dateFmt  =new SimpleDateFormat("yyyy-MM-dd");
		GregorianCalendar gc = new GregorianCalendar();	
		
		Date date = dateFmt.parse(dataString);
		gc.setTime(date);
		
		gc.add(operField,amount);  
		
		return gc.getTime();
	}
    
	/**
	 * 
	 * @param dateStr -日期：字符串
	 * @param addDate -相减天数：Integer
	 * @return
	 */
	public static String dateSub(String dateStr, Integer addDate) {
		String reDateStr = "";
		try {
			Date date = new Date();  
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");   
			date = dateformat.parse(dateStr);
			reDateStr = dateformat.format(new Date(date.getTime() - (addDate * 24 * 60 * 60 * 1000)));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return reDateStr;
    }
	public static Boolean dateEquals(String dateStr1, String dateStr2) {
		Boolean isTrue = false;
		try {
			Date date1 = new Date(); 
			Date date2 = new Date();  
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");   
			date1 = dateformat.parse(dateStr1);  
			date2 = dateformat.parse(dateStr2);
			if(date1.equals(date2)){
				isTrue = true;
			} else{
				isTrue = false;
			}
        } catch (Exception e) {
            e.printStackTrace();
            isTrue = false;
        }
        return isTrue;
    }

	public static Boolean dateAfter(String dateStrAf, String dateStrBf) {
		Boolean isTrue = false;
		try {
			Date dateAf = new Date(); 
			Date dateBf = new Date();  
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd");   
			dateAf = dateformat.parse(dateStrAf);  
			dateBf = dateformat.parse(dateStrBf);
			if(dateAf.after(dateBf)){
				isTrue = true;
			} else{
				isTrue = false;
			}
        } catch (Exception e) {
            e.printStackTrace();
            isTrue = false;
        }
        return isTrue;
    }

	public static Boolean dateBefore(String dateStrBf, String dateStrAf) {
		Boolean isTrue = false;
		try {
			Date dateBf = new Date(); 
			Date dateAf = new Date();  
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd"); 
			dateBf = dateformat.parse(dateStrBf);  
			dateAf = dateformat.parse(dateStrAf);  
			if(dateBf.before(dateAf)){
				isTrue = true;
			} else{
				isTrue = false;
			}
        } catch (Exception e) {
            e.printStackTrace();
            isTrue = false;
        }
        return isTrue;
    }
	
	public static void main(String[] args) {
		//System.out.println(Integer.valueOf("15101412312"));
		System.out.println(Integer.MAX_VALUE);
	}
}


