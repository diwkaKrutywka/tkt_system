<template>
  <div class="h-screen w-full flex overflow-hidden relative bg-gradient-to-br from-blue-900 via-blue to-black bg-blur">
    <ChangeLanguageBox
      class="absolute rounded bg-[#232526] opacity-80 right-3 top-3 text-white w-10 h-6 flex justify-center items-center border border-[#444]" />
    <div class="w-full flex h-full">
      <div class="w-1/2 h-full flex justify-center items-center">
        <img class="object-cover m-auto opacity-80" src="../assets/il3.jpg" alt="login" />
      </div>
      <div class="w-1/2 h-full flex items-center justify-center">
        <div class="login-card glassmorphism w-96 z-10 flex flex-col gap-6 p-8 shadow-2xl">
          <div class="font-extrabold text-3xl text-white text-center tracking-wide mb-2">
            Sign In
          </div>
          <div>
            <Input id="username" size="large" class="input-dark" v-model:value="info.username" placeholder="Username" />
          </div>
          <div>
            <Input id="password" size="large" class="input-dark" v-model:value="info.password" placeholder="Password"
              type="password" />
          </div>

          <div
            class="login-btn text-center flex justify-center items-center bg-gradient-to-r from-[#7b2ff2] to-[#232526] text-white px-6 py-2 rounded-lg text-lg cursor-pointer font-semibold shadow-md hover:scale-105 transition-transform duration-200"
            @click="onLogin">
            {{ $t("l_Login") }}
          </div>
          <div class="forgot-password-link mb-2">
            <span class="forgot-link">Do not remember your password?</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Input } from "ant-design-vue";
import ChangeLanguageBox from "../components/change-language-box.vue";
import { useAuthActions } from "../store/authActions";

export default {
  components: {
    Button,
    Input,
    ChangeLanguageBox,
  },
  data() {
    return {
      info: {
        username: "",
        password: "",
        doctorsActions: null, // We'll assign this in `created`
      },
    };
  },

  methods: {
    // this.$router.replace({
    //   name: "AdminView",
    // });
    async onLogin() {
      if (!this.info.username || !this.info.password) return;

      try {
        await this.doctorsActions.login(this.info); // <-- Call the action here
        this.$router.replace({ name: "AdminView" }); // navigate after successful login
      } catch (err) {
        console.error("Login failed:", err);
      }

    },
  },
  created() {
    this.doctorsActions = useAuthActions(); // <-- Pinia composable or actions
  },
};
</script>

<style scoped>
.bg-blur::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  backdrop-filter: blur(12px);
}

.login-card {
  background: rgba(36, 37, 42, 0.85);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
}

.input-dark .ant-input {
  background: #232526;
  color: #fff;
  border: 1px solid #444;
  transition: border-color 0.2s, box-shadow 0.2s;
  opacity: 0.8;
}

.input-dark .ant-input::placeholder {
  color: #aaa;
}

.input-dark .ant-input:focus,
.input-dark .ant-input:hover {
  border-color: #7b2ff2;
  box-shadow: 0 0 0 2px rgba(123, 47, 242, 0.15);
}

.login-btn {
  background: linear-gradient(90deg, #7b2ff2 0%, #232526 100%);
  border: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-btn:hover {
  background: linear-gradient(90deg, #232526 0%, #7b2ff2 100%);
  transform: scale(1.07);
  box-shadow: 0 6px 24px 0 rgba(123, 47, 242, 0.25);
}

.forgot-link {
  color: #b39ddb;
  cursor: pointer;
  transition: color 0.2s, text-decoration 0.2s;
}

.forgot-link:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
