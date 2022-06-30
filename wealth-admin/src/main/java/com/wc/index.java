package com.wc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class index {

     @RequestMapping("/index")
     public String test(){
         return "index";
     }
}
