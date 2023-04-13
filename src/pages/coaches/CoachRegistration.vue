<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  // created() {
  //   this.loadCocaches();
  // },
  methods: {
    // async loadCocaches(refresh = false) {
    //   this.isLoading = true;
    //   try {
    //     await this.$store.dispatch('coaches/loadCoaches', {
    //       forceRefresh: refresh,
    //     });
    //   } catch (error) {
    //     this.error = error.message || 'Something went wrong!';
    //   }
    //   this.isLoading = false;
    // },
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  }
};
</script>