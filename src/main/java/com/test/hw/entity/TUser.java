package com.test.hw.entity;



/**
 * Created by huangwei on 2017/8/25.
 */

import com.sun.org.apache.xml.internal.serializer.ToUnknownStream;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.cache.annotation.CachePut;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user")
public class TUser implements Serializable{

    @Id
    @GenericGenerator(
            name = "generator",
            strategy = "uuid.hex"
    )
    @GeneratedValue(
            generator = "generator"
    )
    @Column(name = "id",nullable = false)
    private String id;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Old", nullable = false)
    private String old;

    @Column(name = "Address")
    private String address;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Salt")
    private String salt;

    @Column(name = "User_Name")
    private String userName;

    @Column(name = "Pass_Word")
    private String passWord;

    public TUser(){

    }

    public TUser(String id){
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOld() {
        return old;
    }

    public void setOld(String old) {
        this.old = old;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
}
