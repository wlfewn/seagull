package com.github.geng.admin.entity;

import com.github.geng.admin.dto.form.RegisterForm;
import com.github.geng.constant.DataConstants;
import com.github.geng.entity.BaseLongIdTimeEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "sys_user")
public class SysUser extends BaseLongIdTimeEntity {

    // fields ----------------------------------------------------
    private String userName;                    // 用户名
    private String password;                    // 密码
    private String email;                       // 邮箱
    private Date lastLoginTime;                 // 最近一次登录时间
    private String avatar;                      // 头像
    private String loginName;                   // 登录名
    private int status = DataConstants.ENABLE;  // 状态标志

    // constructors ----------------------------------------------
    public SysUser(RegisterForm registerForm) {
        BeanUtils.copyProperties(registerForm, this, "password");
        Date date = new Date();
        this.setCreatedTime(date);
        this.setModifiedTime(date);
    }
}
