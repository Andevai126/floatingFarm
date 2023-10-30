import { ref } from 'vue'
// import { PublicClientApplication } from '@azure/msal-browser';
const msal = require('@azure/msal-browser');


    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose sign-up/sign-in user-flow as your default.
    knownAuthorities: [b2cPolicies.authorityDomain], // You must identify your tenant's domain as a known authority.
    redirectUri: "http://localhost:8080", // You must register this URI on Azure Portal/App Registration. Defaults to "window.location.href".
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // If you wish to store cache items in cookies as well as browser cache, set this to "true".
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case msal.LogLevel.Error:
            console.error(message);
            return;
          case msal.LogLevel.Info:
            console.info(message);
            return;
          case msal.LogLevel.Verbose:
            console.debug(message);
            return;
          case msal.LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

export const store = {
    msalInstance: null,
    accountId: "",
    authenticated: ref(false),
    role: ref("")
};

export function afterResponse() {
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

export function handleResponse(resp) {
    if (resp !== null) {
      // store.dispatch('setAccountId', resp.account.homeAccountId);
      // (store.getters.getMsalInstance).setActiveAccount(resp.account);
      store.accountId = resp.account.homeAccountId;
      (store.msalInstance).setActiveAccount(resp.account);
    } else {
      // const currentAccounts = (store.getters.getMsalInstance).getAllAccounts();
      const currentAccounts = (store.msalInstance).getAllAccounts();
  
      if (!currentAccounts || currentAccounts.length < 1) {
        return;
  
      } else if (currentAccounts.length > 1) {
        console.log("Warning! multiple accounts found!");
        const activeAccount = currentAccounts[0];
        // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
        // store.dispatch('setAccountId', activeAccount.homeAccountId);
        (store.msalInstance).setActiveAccount(activeAccount);
        store.accountId = activeAccount.homeAccountId;
  
      } else if (currentAccounts.length === 1) {
        const activeAccount = currentAccounts[0];
        // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
        // store.dispatch('setAccountId', activeAccount.homeAccountId);
        (store.msalInstance).setActiveAccount(activeAccount);
        store.accountId = activeAccount.homeAccountId;
      }
    }
  }


  // var config = require('./helpstuff/authConfig');
  // const b2cScopes = config.b2cScopes;
  // const request = {
  //   account: (store.msalInstance).getAccountByHomeId(store.accountId),
  //   scopes: b2cScopes
  // };

// Create a Promise to initialize and return the MSAL instance
export function initializeMsal() {
        // var accountId = '';
        store.msalInstance = new msal.PublicClientApplication(msalConfig);

        store.msalInstance.initialize()
        .then(() => {
          store.msalInstance.handleRedirectPromise().then((resp) => {
                if (resp !== null && resp !== undefined) {
                    // store.dispatch('setAccountId', resp.account.homeAccountId);
                    // (store.getters.getMsalInstance).setActiveAccount(resp.account);
                    store.accountId = resp.account.homeAccountId;
                    store.msalInstance.setActiveAccount(resp.account);
                } else {
                    // const currentAccounts = (store.getters.getMsalInstance).getAllAccounts();
                    const currentAccounts = store.msalInstance.getAllAccounts();
            
                    if (!currentAccounts || currentAccounts.length < 1) {
                    return;
            
                    } else if (currentAccounts.length > 1) {
                    console.log("Warning! multiple accounts found!");
                    const activeAccount = currentAccounts[0];
                    // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
                    // store.dispatch('setAccountId', activeAccount.homeAccountId);
                    (store.msalInstance).setActiveAccount(activeAccount);
                    store.accountId = activeAccount.homeAccountId;
            
                    } else if (currentAccounts.length === 1) {
                    const activeAccount = currentAccounts[0];
                    // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
                    // store.dispatch('setAccountId', activeAccount.homeAccountId);
                    (store.msalInstance).setActiveAccount(activeAccount);
                    store.accountId = activeAccount.homeAccountId;
                    }
                }
            }).then(afterResponse())
        });
}