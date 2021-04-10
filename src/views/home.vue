<template>
  <div class="uk-padding">
    <form
      @submit.prevent="handleSubmit"
      class="uk-form-width-large uk-align-center"
    >
      <fieldset class="uk-fieldset">
        <legend class="uk-legend">Smart search</legend>

        <div class="uk-margin">
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: search"></span>
            <input
              class="uk-input"
              :class="{
                'uk-form-danger': displayError,
              }"
              type="search"
              ref="searchElement"
              @input="handleChange"
              :value="searchString"
            />
          </div>
        </div>

        <button
          class="uk-button uk-button-primary"
          :class="{
            'uk-button-danger': displayError,
          }"
          :disabled="isLoading || clearedSearchString.length === 0"
        >
          <div v-if="displayError" class="uk-text-normal">
            Unknown search type
          </div>
          <div v-else-if="isLoading" uk-spinner="ratio: 0.75"></div>
          <div v-else class="uk-text-normal">
            {{ this.searchType ? `Search by ${this.searchType}` : "Search" }}
          </div>
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { ROUTES } from "@/constants";
import { getSearchType } from "@/tools/search-type";

export default {
  data() {
    return {
      isLoading: false,
      displayError: false,
      searchString: "",
    };
  },
  computed: {
    clearedSearchString() {
      return this.searchString.trim();
    },
    searchType() {
      const result = getSearchType(this.clearedSearchString);

      return result;
    },
  },
  methods: {
    handleChange(event) {
      this.displayError = false;
      this.searchString = event.target.value;
    },
    async handleSubmit() {
      if (!this.searchType) {
        this.displayError = true;

        return;
      }

      this.isLoading = true;

      try {
        const user = await this.$store.dispatch("users/getBySearchString", {
          type: this.searchType,
          searchString: this.clearedSearchString,
        });

        this.$router.push({
          name: ROUTES.user.name,
          params: { id: user.id },
        });
      } catch (error) {
        // Handle error
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.$refs.searchElement.focus();
  },
};
</script>
