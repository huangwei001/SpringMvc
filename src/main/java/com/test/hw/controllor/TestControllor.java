package com.test.hw.controllor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by huangwei on 2017/7/5.
 */
@Controller
public class TestControllor {


    @RequestMapping("/")
    public void rootPage(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.sendRedirect(request.getContextPath() + "/test/test");
        } catch (IOException e) {
            throw new RuntimeException("cannot redirct to /index.");
        }
    }


    @RequestMapping(value = "/test/test", method = RequestMethod.GET)
    public String indexPage(HttpServletRequest request, HttpServletResponse response) {
        return "index";
    }

}
