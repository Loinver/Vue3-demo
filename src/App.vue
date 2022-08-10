<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-03-31 10:09:56
 * @LastEditors: Linyer
 * @LastEditTime: 2022-08-10 11:30:22
-->
<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>
