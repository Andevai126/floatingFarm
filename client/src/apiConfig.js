// require('dotenv').config({ path: '../../.env' });

const msal = require('@azure/msal-browser');
// import store from './store';
// import store from './../main';
// import { computed } from "vue";
// import { ref, watch, toRefs, getCurrentInstance } from "vue";
const axios = require('axios');
// import Vue from 'vue';
// import msalInstance from './../main';
// export {store};
import { store, handleResponse, b2cScopes, b2cPolicies } from './msalConfig';



// export const b2cScopes = ["openid", "https://domeinzelf.onmicrosoft.com/scopes/FullReadWriteAccess"];

// const b2cPolicies = {
//   names: {
//     signUpSignIn: "B2C_1_signup_signin",
//     editProfile: "B2C_1_edit_profile"
//   },
//   authorities: {
//     signUpSignIn: {
//       authority: "https://domeinzelf.b2clogin.com/domeinzelf.onmicrosoft.com/b2c_1_signup_signin",
//     },
//     editProfile: {
//       authority: "https://domeinzelf.b2clogin.com/domeinzelf.onmicrosoft.com/b2c_1_edit_profile"
//     }
//   },
//   authorityDomain: "domeinzelf.b2clogin.com"
// }

// export const msalConfig = {
//   auth: {
//     clientId: 'aa0b4d47-9770-44b6-84c0-c01698d9a5d3', // This is the ONLY mandatory field; everything else is optional.
//     authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
//     knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
//     redirectUri: "http://localhost:8080", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
//   },
//   cache: {
//     cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
//     storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
//   },
//   system: {
//     loggerOptions: {
//       loggerCallback: (level, message, containsPii) => {
//         if (containsPii) {
//           return;
//         }
//         switch (level) {
//           case msal.LogLevel.Error:
//             console.error(message);
//             return;
//           case msal.LogLevel.Info:
//             console.info(message);
//             return;
//           case msal.LogLevel.Verbose:
//             console.debug(message);
//             return;
//           case msal.LogLevel.Warning:
//             console.warn(message);
//             return;
//         }
//       }
//     }
//   }
// };

// export function handleResponse(resp) {
//   if (resp !== null) {
//     // store.dispatch('setAccountId', resp.account.homeAccountId);
//     // (store.getters.getMsalInstance).setActiveAccount(resp.account);
//     store.accountId = resp.account.homeAccountId;
//     (msalInstance).setActiveAccount(resp.account);
//   } else {
//     // const currentAccounts = (store.getters.getMsalInstance).getAllAccounts();
//     const currentAccounts = (msalInstance).getAllAccounts();

//     if (!currentAccounts || currentAccounts.length < 1) {
//       return;

//     } else if (currentAccounts.length > 1) {
//       console.log("Warning! multiple accounts found!");
//       const activeAccount = currentAccounts[0];
//       // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
//       // store.dispatch('setAccountId', activeAccount.homeAccountId);
//       (msalInstance).setActiveAccount(activeAccount);
//       store.accountId = activeAccount.homeAccountId;

//     } else if (currentAccounts.length === 1) {
//       const activeAccount = currentAccounts[0];
//       // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
//       // store.dispatch('setAccountId', activeAccount.homeAccountId);
//       (msalInstance).setActiveAccount(activeAccount);
//       store.accountId = activeAccount.homeAccountId;
//     }
//   }
// }

// export function initializeMsalInstance() {
//   (store.msalInstance).initialize().then(() => {
//     (store.msalInstance).handleRedirectPromise().then(handleResponse()).then(() => {store.authenticated.value = true}).catch(err => {
//       console.error(err);
//     });
//   })
// }


export function signIn() {
  console.log(store);
  (store.msalInstance).loginPopup({
    scopes: b2cScopes
  }).then(handleResponse).then(() => {store.authenticated.value = true}).catch(function (error) {
    console.log(error);
  });
}

export function signOut() {
  (store.msalInstance).logoutPopup({
    account: (store.msalInstance).getAccountByHomeId(store.accountId)
  }).then(() => {
    store.authenticated.value = false;
    // window.location.reload();
  });
}

export function editProfile() {
  (store.msalInstance).loginPopup({
    authority: b2cPolicies.authorities.editProfile.authority
  }).then(() => {store.authenticated.value = true});
}

// export function print() {
//   console.log("this should be 1");
//   console.log(store);
// }

// export const isUserLoggedIn = computed(async () => {
//   if (store.msalInstance === null){
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//   }
//   return msal.isAuthenticated;
//   // const currentAccounts = (store.msalInstance).getAllAccounts();
//   // return (store.msalInstance).accountId !== '';
//   // return false;
// });

// export async function isAuthenticated() {
//   if (store.msalInstance === null){
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//   }

  // console.log(store.authenticated.value);
  // initializeMsal()
  // .then(() => {
    // The MSAL instance is fully initialized here
    // app.config.globalProperties.$msalInstance = msalInstance;
    // app.config.globalProperties.$accountId = accountId;
    // const msalInstancesss = toRefs(store.msalInstance);
    // const internalInstance = getCurrentInstance();
    // const {accounts} = toRefs(internalInstance.appContext.config.globalProperties.$msal);
    // const accounts = (store.msalInstance).accountId;

    // const activeAccount = toRefs((store.msalInstance).getActiveAccount());
    // const isLoggedIn = ref(activeAccount !== null);

    // watch(activeAccount, () => {
    //   isLoggedIn.value = activeAccount !== null;
    // });

    // console.log("this should be 2");
    // console.log(store);

    // const isAuthenticated = ref(accounts.length > 0);

    // watch(accounts, () => {
    //     isAuthenticated.value = accounts.length > 0;
    // });

    // return isAuthenticated;

    // return isLoggedIn; 

    
  // })
  // .catch((error) => {
  //   console.error('MSAL initialization error:', error);
  //   return false;
  // });
  
  
  

//   return true;
// }

export async function getTokenPopup() {
  const request = {
    account: (store.msalInstance).getAccountByHomeId(store.accountId),
    scopes: b2cScopes
  };

  return await (store.msalInstance)
  .acquireTokenSilent(request)
  .catch(async (error) => {
    console.log("silent token acquisition fails.");

    if (error instanceof msal.InteractionRequiredAuthError) {
      console.log("acquiring token using popup");

      return await (store.msalInstance)
      .acquireTokenPopup(request)
      .catch((error) => {
        console.error(error);
      });
    } else {
      console.error(error);
    }
  });
}

export async function callApi(endpoint) {
  const response = await getTokenPopup()
  .catch(error => {
    console.log(error);
  });

  axios.get(endpoint, {headers: { 'Authorization': `Bearer ${response.accessToken}`}})
  .then(response => response.json())
  .then(response => {
    return response;
  }).catch(error => {
    console.error(error);
  });
}

//create one or more helper functions?
//create api to get role of person for in the navbar.
//get username from not database?
//what if multiple accounts/emails from same supplier?
//get account name from store.msal.account?
//supplier id is from other table