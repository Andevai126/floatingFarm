import { ref } from 'vue'

export const store = {
  msalInstance: null,
  accountId: "",
  authenticated: ref(false),
  accessToken: "",
  username: ref(""),

  roleId: ref(-1),
  roleTitle: ref("")
};