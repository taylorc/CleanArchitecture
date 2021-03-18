<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
export default defineComponent({
  setup() {
    const auth = new AuthService();
    auth.signinRedirectCallback();
  }
});
</script>
