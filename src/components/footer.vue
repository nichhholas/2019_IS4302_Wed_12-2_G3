    
<template>
  <v-app id="inspire">
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
      name: "footer",
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>