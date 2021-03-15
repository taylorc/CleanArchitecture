<script lang="ts">
import { UserManager, WebStorageStateStore } from "node_modules/oidc-client";
import { useRouter } from "node_modules/vue-router/dist/vue-router";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const router = useRouter();
    const manager = new UserManager({
      userStore: new WebStorageStateStore({})
    });

    manager
      .signinRedirectCallback()
      .then(() => router.push("/"))
      .catch(err => console.log(err));
  }
});
</script>
