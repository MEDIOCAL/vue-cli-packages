<template>
  <div class="imp-layout">
    <div class="imp-header">
      <div class="imp-header__content">
        <div class="imp-header__user">
          欢迎你, <strong>renhong.xrh</strong><hello />
        </div>
      </div>
    </div>
    <div class="imp-layout__main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ImpApp'
  };
</script>

<style lang="scss">
  @include b(layout) {
    @include e(main) {
      margin: 20px;
    }
  }

  @include b(header) {
    background: $primary;
    height: 64px;
    border-bottom: 1px solid rgba(0, 21, 41, .08);
    display: flex;
    align-items: center;
    padding: 0 20px;

    @include e(logo) {
      width: 120px;
      height: 100%;

      img {
        height: 60px;
      }
    }

    @include e(content) {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    @include e(user) {
      width: 200px;
      text-align: right;
      font-size: 15px;
      color: #f1f1f1;
    }
  }
</style>
