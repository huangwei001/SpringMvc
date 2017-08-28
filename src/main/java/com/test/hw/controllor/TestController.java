package com.test.hw.controllor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by huangwei on 2017/7/17.
 */
@Controller
@RequestMapping(value = "/test")
public class TestController {

    @RequestMapping(value = "/test")
    public ModelAndView getTest(){

        ModelAndView modelAndView = new ModelAndView("/test");

        return modelAndView;
    }


}
