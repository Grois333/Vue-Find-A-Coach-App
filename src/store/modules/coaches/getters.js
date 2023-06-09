export default {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },

    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      //console.log(coaches)
      //console.log(userId)
      console.log(coaches.some(coach => coach.id === userId))
      return coaches.some(coach => coach.id === userId);
    },

    //to check if is registered as coach to prevent path /register and button
    // isCoach(state, rootGetters) {
    //   return state.coaches.some((coach) => coach.id === rootGetters.userId);
    // },

    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    },
  };