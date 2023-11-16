import { store } from './store';
import { b2cScopes, b2cPolicies, setAccount, authenticateAccount, clearCredentials, getTokenPopup } from './msalConfig';
const axios = require('axios');

export function signIn() {
  (store.msalInstance).loginPopup({
    scopes: b2cScopes
  }).then(setAccount).then(authenticateAccount);
}

export function signOut() {
  (store.msalInstance).logoutPopup({
    account: (store.msalInstance).getAccountByHomeId(store.accountId)
  }).then(() => {
    store.authenticated.value = false;
    store.accessToken = "";
    clearCredentials();
  });
}

export function editProfile() {
  (store.msalInstance).loginPopup({
    authority: b2cPolicies.authorities.editProfile.authority
  }).then(setAccount).then(() => {
    store.authenticated.value = true;
    store.username.value = (store.msalInstance).getAccountByHomeId(store.accountId).idTokenClaims.name;
  }).catch(() => {
    console.error("User cancelled flow");
  });
}

function getUsersApi(accessToken) {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:5000/api/website/getUsers", {
      headers: { 'Authorization': `Bearer ${accessToken}`}
    }).then((response) => {
      resolve(response.data);
    }).catch(() => {
      reject();
    });
  });
}

export async function getUsers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    getUsersApi(store.accessToken).then((users) => {
      resolve(users);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      getUsersApi(store.accessToken).then((users) => {
        resolve(users);
      }).catch(() => {
        reject();
      })
    });
  });
}
