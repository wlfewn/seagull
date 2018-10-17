package com.github.geng.admin.dto;

import com.github.geng.admin.entity.SysUser;
import com.github.geng.constant.DataConstants;
import com.github.geng.dto.DtoEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@ApiModel
public class SysUserDto extends DtoEntity {

    // fields ----------------------------------------------------
    @ApiModelProperty(value = "用户名")
    private String userName;
    @ApiModelProperty(value = "邮箱")
    private String email;
    @ApiModelProperty(value = "头像")
    private String avatar;
    @ApiModelProperty(value = "登录名")
    private String loginName;
    @ApiModelProperty(value = "状态标志")
    private int status = DataConstants.ENABLE;

    // constructors ----------------------------------------------
    public SysUserDto(SysUser sysUser) {
        super(sysUser);
        BeanUtils.copyProperties(sysUser, this);
    }
    // -----------------------------------------------------------

}
