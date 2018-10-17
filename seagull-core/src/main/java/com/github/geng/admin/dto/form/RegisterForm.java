package com.github.geng.admin.dto.form;


import com.github.geng.dto.BaseForm;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel
public class RegisterForm extends BaseForm {

    // fields ----------------------------------------------------
    @ApiModelProperty(value = "用户名")
    private String userName;
    @ApiModelProperty(value = "密码")
    private String password;
    @ApiModelProperty(value = "邮箱")
    private String email;
    @ApiModelProperty(value = "头像")
    private String avatar;
    @ApiModelProperty(value = "登录名")
    private String loginName;
    // -----------------------------------------------------------

}
