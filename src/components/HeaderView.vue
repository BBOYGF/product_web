<script setup lang="ts" name="HeaderView">
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleCommand = (command: string | number | object) => {
  ElMessage(`跳转到 ${command}`)
  router.push(command.toString())
}

</script>

<template>
  <div class="header">
    <el-icon><Avatar /></el-icon>
    <el-dropdown :hide-on-click="false" @command="handleCommand">
    <span class="el-dropdown-link">
      更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="/">产品功能</el-dropdown-item>
          <el-dropdown-item command="/quick_start_View">快速开始</el-dropdown-item>
          <el-dropdown-item command="提交Bug">提交Bug</el-dropdown-item>
          <el-dropdown-item command="商务合作" disabled>商务合作</el-dropdown-item>
          <el-dropdown-item command="联系我们" divided>联系我们</el-dropdown-item>
          <el-dropdown-item command="打赏" divided>打赏</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 40px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}




.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  font-size: 18px;
  color: #000000;
  margin-left: 10px;
  margin-right: 10px;
}




</style>