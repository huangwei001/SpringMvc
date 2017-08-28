package com.test.hw.service.serviceImpl;

import com.test.hw.entity.TUser;
import com.test.hw.service.UserService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.springframework.stereotype.Service;

/**
 * Created by huangwei on 2017/8/28.
 */
@Service
public class UserServiceImpl implements UserService{


    public boolean saveUser() throws Exception {
        TUser user = new TUser();

        user.setAddress("测试地址");

        user.setName("测试人员");

        user.setOld("15");

        user.setPassWord("password");

        user.setPhone("150000000");

        user.setSalt("1545");

        user.setUserName("admin");
        Configuration cfg = new Configuration();
        cfg.configure("spring.xml");
        StandardServiceRegistryBuilder serviceRegistryBuilder = new StandardServiceRegistryBuilder();
        ServiceRegistry serviceRegistry = serviceRegistryBuilder.build();
        SessionFactory sf = cfg.buildSessionFactory(serviceRegistry);
        Session session = sf.openSession();
        Transaction transaction = session.beginTransaction();
        session.save(user);
        transaction.commit();
        session.close();
        return true;
    }
}
