<template>
  <div class="app">
    <el-container>
      <el-header>Vue pracel project</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <el-button>默认按钮</el-button>
          <el-link type="primary">主要链接</el-link>
          <el-link type="success">成功链接</el-link>
          <el-link type="warning">警告链接</el-link>
          <el-link type="danger">危险链接</el-link>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>