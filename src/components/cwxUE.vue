<template>
  <div>
    <!--editor的div为富文本的承载容器-->

    <div id="editor"></div>

    <button type @click="gettext">点击</button>
  </div>
</template>

　　　　<script>
export default {
  data() {
    return {
      editor: null
    };
  },

  mounted() {
    // 引入url
    UEDITOR_CONFIG.UEDITOR_HOME_URL = "../../static/ue/"; // 实例化editor编辑器

    this.editor = window.UE.getEditor("editor"); // console.log(this.editor.setContent("1223"))
  },

  methods: {
    gettext() {
      // 获取editor中的文本
      console.log(this.editor.getContent());
    }
  },

  destroyed() {
    // 将editor进行销毁

    this.editor.destroy();
  }
};
</script>