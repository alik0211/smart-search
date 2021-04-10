<template>
  <div class="uk-padding">
    <div class="uk-card uk-card-default uk-width-1-2@m uk-align-center">
      <div v-if="isLoading" class="uk-padding uk-flex uk-flex-center">
        <div uk-spinner="ratio: 3"></div>
      </div>
      <template v-else>
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
              <img
                class="uk-border-circle"
                width="40"
                height="40"
                :src="user.avatar"
              />
            </div>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">
                {{ user.fullName }}
              </h3>
              <p class="uk-text-meta uk-margin-remove-top">{{ user.ip }}</p>
            </div>
          </div>
        </div>
        <div class="uk-card-body">
          <p>
            <strong>Nickname: </strong>
            <span>{{ user.nickname }}</span>
          </p>
          <p>
            <strong>Phone: </strong>
            <span>{{ user.phone }}</span>
          </p>
          <p>
            <strong>Email: </strong>
            <span>{{ user.email }}</span>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.users.byId[this.id];
    },
  },
  async created() {
    if (this.user) {
      return;
    }

    this.isLoading = true;

    try {
      await this.$store.dispatch("users/getById", this.id);
    } catch (error) {
      // Handle error
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style></style>
