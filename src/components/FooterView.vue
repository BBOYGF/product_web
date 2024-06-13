<script setup lang="ts" name="FooterView">

import GitHubView from '@/components/icons/GitHubView.vue'
import CopyrightView from '@/components/icons/CopyrightView.vue'
import PrivacyView from '@/components/icons/PrivacyView.vue'
</script>

<template>
  <div class="footer">
    <div class="item">
      <div>© 2022 - 2024 Tien Do Nam</div>
    </div>
    <div class="item">
      <div class="ite">
        <GitHubView class="icoStyle"></GitHubView>
        GitHub
      </div>
      <div class="ite">
        <el-icon class="icoStyle">
          <ChatDotRound />
        </el-icon>
        微信群
      </div>
      <div class="ite">
        <PrivacyView class="icoStyle"></PrivacyView>
        隐私条款
      </div>
      <div class="ite">
        <CopyrightView class="icoStyle"></CopyrightView>
        版权声明
      </div>
      <div class="ite">
          <Message class="icoStyle" />
        联系方式
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  width: 100%;
  height: 100px;
  background: #F3F4F6;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.item {
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.ite {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icoStyle {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}
</style>