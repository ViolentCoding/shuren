<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <i v-if="isActive" class="el-icon-s-fold" />
    <i v-if="!isActive" class="el-icon-s-unfold" />
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger-container{
	font-size: 30px;
}
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
