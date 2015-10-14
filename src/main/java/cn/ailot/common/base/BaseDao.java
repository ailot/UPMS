package cn.ailot.common.base;

import java.util.List;
import java.util.Map;


/**
 * 基础DAO接口
 * @author litao
 *
 * @param <T>
 */
public interface BaseDao<T> {
	
	/**
	 * 对对象持久化操作，如果成功则返回持久化后的ID
	 * 失败则返回NULL
	 * @param obj
	 * @rentrn
	 */
	public void save(T obj);
	
	/**
	 * 删除指定ID的持久化对象
	 * @param obj
	 */
	public void delete(String[] ids);
	
	/**
	 * 修改指定的持久化对象
	 * @param obj
	 */
	public void update(T obj);
	/**
	 * 根据ID查询
	 * @param id
	 * @return
	 */
	public T selectById(String id);
	
	/**
	 * 根据条件查询全部
	 */
	public List<T> selectAll(T obj);
	
	/**
	 * 查询总的记录数
	 * @param obj
	 * @return
	 */
	public Integer selectCount(T obj);
	
	/**
	 * 改变制定字段的状态
	 * @param obj
	 */
	public void change(Map<String, Object> map);

}
