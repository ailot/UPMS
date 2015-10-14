package cn.ailot.common.base;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * 抽象实现类
 * @author litao
 *
 * @param <T>
 */
@Service
public abstract class BaseServiceImpl<T> implements BaseService<T> {

	/**
	 * 抽象方法
	 * @return
	 */
	public abstract BaseDao<T> getBaseDao();
	public void save(T obj) {
		// TODO Auto-generated method stub
		getBaseDao().save(obj);
	}

	public void delete(String[] ids) {
		// TODO Auto-generated method stub
		getBaseDao().delete(ids);
	}
	
	public void change(Map<String,Object> map){
		getBaseDao().change(map);
	}

	public void update(T obj) {
		// TODO Auto-generated method stub
		getBaseDao().update(obj);
	}

	public T selectById(String id) {
		// TODO Auto-generated method stub
		return (T) getBaseDao().selectById(id);
	}

	public List<T> selectAll(T obj) {
		// TODO Auto-generated method stub
		return getBaseDao().selectAll(obj);
	}
	
	public Integer selectCount(T obj){
		return getBaseDao().selectCount(obj);
	}

}
