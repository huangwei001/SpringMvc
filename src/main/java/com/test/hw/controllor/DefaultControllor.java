package com.test.hw.controllor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by huangwei on 2017/8/10.
 */
@Controller
public class DefaultControllor {

    @RequestMapping("/")
    public void rootPage(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.sendRedirect(request.getContextPath() + "/ECharts/ECharts");
        } catch (IOException e) {
            throw new RuntimeException("cannot redirct to /index.");
        }
    }
}
