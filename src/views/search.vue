<template>
  <div class="uk-padding">
    <div v-if="isLoading" class="uk-flex uk-flex-center">
      <div uk-spinner="ratio: 3"></div>
    </div>
    <template v-else>
      <div class="uk-width-1-2@m uk-width-1-3@l uk-align-center">
        <router-link
          :to="{ name: ROUTES.home.name }"
          class="uk-icon-link"
          uk-icon="icon: arrow-left; ratio: 2"
        ></router-link>
      </div>
      <div
        v-for="user in users"
        :key="user.id"
        class="uk-card uk-card-default uk-width-1-2@m uk-width-1-3@l uk-align-center"
      >
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
      </div>
    </template>
  </div>
</template>

<script>
import { ROUTES } from "@/constants";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
      usersIds: [],

      ROUTES,
    };
  },
  computed: {
    usersById() {
      return this.$store.state.users.byId;
    },
    users() {
      return this.usersIds.map((userId) => this.usersById[userId]);
    },
  },
  async created() {
    this.isLoading = true;

    const { type, text } = this;

    const users = await this.$store.dispatch("users/getUsers", {
      type,
      text,
    });

    this.usersIds = users.map((user) => user.id);

    this.isLoading = false;
  },
};
</script>
