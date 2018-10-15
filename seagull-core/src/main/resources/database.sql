
/*==============================================================*/
/* Table: sys_user                                              */
/*==============================================================*/
create table sys_user
(
   id                   bigint not null auto_increment comment '主键',
   user_name            varchar(20) not null comment '用户名',
   password             varchar(50) not null comment '密码',
   email                varchar(50) not null comment '邮箱',
   created_time         timestamp default CURRENT_TIMESTAMP comment '创建时间',
   modified_time        timestamp comment '修改时间',
   last_login_time      timestamp comment '最近一次登录时间',
   avatar               varchar(255) comment '头像',
   login_name           varchar(20) not null comment '登录名',
   status               tinyint comment '状态标志',
   primary key (id)
);

alter table sys_user comment '系统用户';

/*==============================================================*/
/* Index: Index_login_name                                      */
/*==============================================================*/
create index Index_login_name on sys_user
(
   login_name
);
