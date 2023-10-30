const msal = require('@azure/msal-browser');
const axios = require('axios');
import { store, handleResponse, b2cScopes, b2cPolicies } from './msalConfig';

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

// add authenticated stuff
async function getTokenPopup() {
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

  const res = await await axios.get(endpoint, {
    headers: { 'Authorization': `Bearer ${response.accessToken}`}
  });

  return res;
}

//create one or more helper functions?
//create api to get role of person for in the navbar.
//get username from not database?
//what if multiple accounts/emails from same supplier?
//get account name from store.msal.account?
//supplier id is from other table