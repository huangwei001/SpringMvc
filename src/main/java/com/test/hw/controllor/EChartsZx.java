package com.test.hw.controllor;

import com.sun.org.apache.xpath.internal.operations.Mod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by huangwei on 2017/8/10.
 */
@Controller
@RequestMapping(value = "/ECharts")
public class EChartsZx {

    @RequestMapping(value = "/ECharts")
    public ModelAndView getZxECharts(){

        ModelAndView modelAndView = new ModelAndView("/ECharts/EChartsZx");

        return modelAndView;
    }


    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public String save(@RequestBody Map<String, Object> params){

        String name = (String) params.get("name");


        return "123213";
    }



}
