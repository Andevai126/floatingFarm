import { store } from './store';
import { b2cScopes, b2cPolicies, setAccount, authenticateAccount, clearCredentials } from './msalConfig';
// const axios = require('axios');

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

// export async function getSomething(endpoint) {
// // TRY FIRST with accesstoken in account.idToken
//   const response = await getTokenPopup()
//   .catch(error => {
//     console.log(error);
//   });

//   const res = await axios.get(endpoint, {
//     headers: { 'Authorization': `Bearer ${response.accessToken}`}
//   });

//   return res;
// }

//create one or more helper functions?
//create api to get role of person for in the navbar.
//get username from not database?
//what if multiple accounts/emails from same supplier?
//get account name from store.msal.account?
//supplier id is from other table

// move signin signout edit profile AND GETTOKENPOPUP to msalconfig