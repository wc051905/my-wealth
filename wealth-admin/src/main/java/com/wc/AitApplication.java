package com.wc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

/**
 * 启动程序
 * 
 * @author ait
 */
@SpringBootApplication
public class AitApplication
{
    public static void main(String[] args)
    {
        // System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(AitApplication.class, args);
        System.out.println(   " _____ _   _ _____  _____  _____ _____ _____ \n" +
                "/  ___| | | /  __ \\/  __ \\|  ___/  ___/  ___|\n" +
                "\\ `--.| | | | /  \\/| /  \\/| |__ \\ `--.\\ `--. \n" +
                " `--. \\ | | | |    | |    |  __| `--. \\`--. \\\n" +
                "/\\__/ / |_| | \\__/\\| \\__/\\| |___/\\__/ /\\__/ /\n" +
                "\\____/ \\___/ \\____/ \\____/\\____/\\____/\\____/ \n" +
                "                                             \n" +
                "                                             ");
    }
}