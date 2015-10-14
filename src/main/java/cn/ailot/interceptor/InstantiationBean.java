package cn.ailot.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;

/**
 * 打印spring实例化的bean
 * @author litao
 *
 */
@Component
public class InstantiationBean implements BeanPostProcessor {

	private static Logger logger = LoggerFactory.getLogger(InstantiationBean.class);
	public Object postProcessBeforeInitialization(Object bean, String beanName)
			throws BeansException {
		// TODO Auto-generated method stub
		return bean;
	}

	public Object postProcessAfterInitialization(Object bean, String beanName)
			throws BeansException {
		// TODO Auto-generated method stub
		//打印spring加载的时候所实例化的bean
		logger.info("Bean:{}==>created:{}",beanName,bean.toString());
		//logger.info("Bean:{}",beanName);
		return bean;
	}

}
