// import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';
import { store } from './store';
const msal = require('@azure/msal-browser');
const axios = require('axios');

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
};

const msalConfig = {
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

// Initialize msal
export function initializeMsal() {
  // Set msal instance
  store.msalInstance = new msal.PublicClientApplication(msalConfig);

  // Configure msal
  store.msalInstance.initialize().then(() => {
    store.msalInstance.handleRedirectPromise().then(setAccount).then(authenticateAccount());
  }).catch((error) => {
    console.log("Initialization of msal failed:", error);
  });
}

// Set account
export function setAccount(resp) {
  // If called after request, set account with new info
  if (resp !== null) {
    store.accountId = resp.account.homeAccountId;
    (store.msalInstance).setActiveAccount(resp.account);
  
  // Otherwise, try to set account with data saved in session
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

// Check if account is still authenticated and set credentials
export function authenticateAccount() {
  const request = {
    account: (store.msalInstance).getAccountByHomeId(store.accountId),
    scopes: b2cScopes
  };

  store.msalInstance.acquireTokenSilent(request).then((response) => {
    store.authenticated.value = true;
    setCredentials(response.accessToken);
  }).catch(() => {
    store.authenticated.value = false;
    clearCredentials();
  })
}

// Set credentials
function setCredentials(accessToken) {
  // Set username
  store.username.value = (store.msalInstance).getAccountByHomeId(store.accountId).idTokenClaims.name;

  // Set role
  axios.get("http://localhost:5000/api/website/getRole", {
    headers: { 'Authorization': `Bearer ${accessToken}`}
  }).then((response) => {
    store.roleId.value = response.data[0].ID;
    store.roleTitle.value = response.data[0].title;
  }).catch((error) => {
    console.log("Could not get role:", error);
  });
}

// Clear all personal information
export function clearCredentials() {
  store.username.value = "";
  store.roleId.value = -1;
  store.roleTitle.value = "";
}

// Acquire access token
export async function getTokenPopup() {
  const request = {
    account: (store.msalInstance).getAccountByHomeId(store.accountId),
    scopes: b2cScopes
  };

  // Try to aquire token silently
  return await (store.msalInstance).acquireTokenSilent(request).then(() => {
    store.authenticated.value = true;

  // Otherwise, aquire token with popup
  }).catch(async (error) => {
    if (error instanceof msal.InteractionRequiredAuthError) {
      return await (store.msalInstance).acquireTokenPopup(request).then((response) => {
        store.authenticated.value = true;
        setCredentials(response.accessToken);
      }).catch((error) => {
        store.authenticated.value = false;
        clearCredentials();
        console.error(error);
      });
    } else {
      store.authenticated.value = false;
      clearCredentials();
      console.error(error);
    }
  });
}