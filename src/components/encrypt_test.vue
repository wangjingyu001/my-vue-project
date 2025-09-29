<template>
  <div class="cyberchef-wrapper">
    <iframe
      :src="cyberchefUrl"
      class="cyberchef-iframe"
      title="CyberChef"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'CyberChefEmbed',
  data() {
    return {
      cyberchefUrl: 'https://gchq.github.io/CyberChef'
    }
  },
  mounted() {
   
  },
}
</script>

<style scoped>
.cyberchef-wrapper {
  width: 100%;
  height: 100vh; /* 或者使用 calc(100vh - 其他元素高度) */
  position: relative;
}

.cyberchef-iframe {
  width: 100%;
  height: 90%;
  border: none;
  display: block;
}
</style>