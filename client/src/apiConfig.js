import { store } from './store';
import { b2cScopes, b2cPolicies, setAccount, authenticateAccount, clearCredentials, getTokenPopup } from './msalConfig';
const axios = require('axios');

export function signIn() {
  (store.msalInstance).loginPopup({
    scopes: b2cScopes
  }).then(setAccount).then(authenticateAccount).catch(() => {
    console.error("User cancelled login flow");
  });
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
    console.error("User cancelled edit profile flow");
  });
}

function simpleGetApi(endpoint, accessToken) {
  return new Promise((resolve, reject) => {
    axios.get(endpoint, {
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
    simpleGetApi("http://localhost:5000/api/website/getUsers", store.accessToken).then((users) => {
      resolve(users);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi("http://localhost:5000/api/website/getUsers", store.accessToken).then((users) => {
        resolve(users);
      }).catch(() => {
        reject();
      })
    });
  });
}

export async function getRoles() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi("http://localhost:5000/api/website/getRoles", store.accessToken).then((roles) => {
      resolve(roles);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi("http://localhost:5000/api/website/getRoles", store.accessToken).then((roles) => {
        resolve(roles);
      }).catch(() => {
        reject();
      })
    });
  });
}

export async function getSuppliers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi("http://localhost:5000/api/website/getSuppliers", store.accessToken).then((suppliers) => {
      resolve(suppliers);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi("http://localhost:5000/api/website/getSuppliers", store.accessToken).then((suppliers) => {
        resolve(suppliers);
      }).catch(() => {
        reject();
      })
    });
  });
}