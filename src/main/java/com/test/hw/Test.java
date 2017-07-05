package com.test.hw;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.sql.DataSource;

/**
 * Created by huangwei on 2017/7/5.
 */
public class Test {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("Spring.xml");



        DataSource dataSource = context.getBean(DataSource.class);

        System.out.println(dataSource);
    }
}
