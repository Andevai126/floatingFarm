import { ref } from 'vue'
// import { PublicClientApplication } from '@azure/msal-browser';
const msal = require('@azure/msal-browser');

const env = require('./../environment');

export const b2cScopes = env.b2cScopes;

export const b2cPolicies = {
  names: {
    signUpSignIn: env.name_signUpSignIn,
    editProfile: env.name_editProfile
  },
  authorities: {
    signUpSignIn: {
      authority: env.authority_signUpSignIn,
    },
    editProfile: {
      authority: env.authority_editProfile
    }
  },
  authorityDomain: env.authorityDomain
}

export const msalConfig = {
  auth: {
    clientId: env.clientId, // This is the ONLY mandatory field; everything else is optional.
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
    knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
    redirectUri: env.redirectUri, // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
  },
  // system: {
  //   loggerOptions: {
  //     loggerCallback: (level, message, containsPii) => {
  //       if (containsPii) {
  //         return;
  //       }
  //       switch (level) {
  //         case msal.LogLevel.Error:
  //           console.error(message);
  //           return;
  //         case msal.LogLevel.Info:
  //           console.info(message);
  //           return;
  //         case msal.LogLevel.Verbose:
  //           console.debug(message);
  //           return;
  //         case msal.LogLevel.Warning:
  //           console.warn(message);
  //           return;
  //       }
  //     }
  //   }
  // }
};

export const store = {
  msalInstance: null,
  accountId: "",
  authenticated: ref(false),
  roleId: ref(-1),
  roleTitle: ref("")
};

export function handleResponse(resp) {
  if (resp !== null) {
    store.accountId = resp.account.homeAccountId;
    (store.msalInstance).setActiveAccount(resp.account);
  } else {
    const currentAccounts = (store.msalInstance).getAllAccounts();

    if (!currentAccounts || currentAccounts.length < 1) {
      return;

    } else if (currentAccounts.length > 1) {
      console.log("Warning! multiple accounts found!");
      const activeAccount = currentAccounts[0];
      (store.msalInstance).setActiveAccount(activeAccount);
      store.accountId = activeAccount.homeAccountId;

    } else if (currentAccounts.length === 1) {
      const activeAccount = currentAccounts[0];
      (store.msalInstance).setActiveAccount(activeAccount);
      store.accountId = activeAccount.homeAccountId;
    }
  }
}

function afterResponse() {
  store.msalInstance
  .acquireTokenSilent({
    account: (store.msalInstance).getAccountByHomeId(store.accountId),
    scopes: b2cScopes
  }).then(() => {
      store.authenticated.value = true
      console.log("silent token acquisition success. :::")

  })
  .catch(() => {
      store.authenticated.value = false
      console.log("silent token acquisition fails. :::");
  })
}

export function initializeMsal() {
  store.msalInstance = new msal.PublicClientApplication(msalConfig);

  store.msalInstance.initialize()
  .then(() => {
    store.msalInstance.handleRedirectPromise().then((resp) => handleResponse(resp)).then(afterResponse())
  });
}