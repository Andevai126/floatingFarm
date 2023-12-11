import { store } from './store';
import { b2cScopes, b2cPolicies, setAccount, authenticateAccount, clearCredentials, getTokenPopup } from './msalConfig';
const axios = require('axios');
const env = require('./../environment');

export function signIn() {
  (store.msalInstance).loginRedirect({
    scopes: b2cScopes,
    onRedirectNavigate: () => {location.reload();}
  }).then(setAccount).then(authenticateAccount).catch(() => {
    console.error("User cancelled login flow");
  });
}

export function signOut() {
  (store.msalInstance).logoutRedirect({
    account: (store.msalInstance).getAccountByHomeId(store.accountId)
  }).then(() => {
    store.authenticated.value = false;
    store.accessToken = "";
    clearCredentials();
  });
}

export function editProfile() {
  (store.msalInstance).loginRedirect({
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

function simplePostApi(endpoint, accessToken, body) {
  return new Promise((resolve, reject) => {
    axios.post(endpoint, body, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }).then(() => {
      console.log("Success");
      resolve();
    }).catch((error) => {
      console.log("Failed: ", error);
      reject();
    });
  });
}

export async function getUsers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getUsers", store.accessToken).then((users) => {
      resolve(users);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi(env.apiBase + "/api/website/getUsers", store.accessToken).then((users) => {
        resolve(users);
      }).catch((error) => {
        console.error("Failed to get users: ", error);
        reject();
      })
    });
  });
}

export async function getRoles() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getRoles", store.accessToken).then((roles) => {
      resolve(roles);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi(env.apiBase + "/api/website/getRoles", store.accessToken).then((roles) => {
        resolve(roles);
      }).catch((error) => {
        console.error("Failed to get roles: ", error);
        reject();
      })
    });
  });
}

export async function getSuppliers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getSuppliers", store.accessToken).then((suppliers) => {
      resolve(suppliers);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi(env.apiBase + "/api/website/getSuppliers", store.accessToken).then((suppliers) => {
        resolve(suppliers);
      }).catch((error) => {
        console.error("Failed to get suppliers: ", error);
        reject();
      })
    });
  });
}

export async function updateUser(id, role, supplier) {
  // Try with stored access token
  simplePostApi(env.apiBase + "/api/website/updateUser", store.accessToken, {id: id, role: role, supplier: supplier})
  // Try with acquired access token
  .catch(async () => {
    await getTokenPopup();
    simplePostApi(env.apiBase + "/api/website/updateUser", store.accessToken, {id: id, role: role, supplier: supplier})
    .catch((error) => {
      console.log("Failed to update user: ", error);
    });
  });
}

export function deleteUser(id) {
  // Try with stored access token
  simplePostApi(env.apiBase + "/api/website/deleteUser", store.accessToken, {id: id})
  // Try with acquired access token
  .catch(async () => {
    await getTokenPopup();
    simplePostApi(env.apiBase + "/api/website/deleteUser", store.accessToken, {id: id})
    .catch((error) => {
      console.error("Failed to delete user: ", error);
    });
  });
}

export function getProducts() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getProducts", store.accessToken).then((products) => {
      resolve(products);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi(env.apiBase + "/api/website/getProducts", store.accessToken).then((products) => {
        resolve(products);
      }).catch((error) => {
        console.error("Failed to get products: ", error);
        reject();
      });
    });
  });
}

export function addMix(productsInMix, dateTime, notes) {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simplePostApi(env.apiBase + "/api/website/addMix", store.accessToken, {productsInMix: productsInMix, dateTime: dateTime, notes: notes})
    .then(() => {
      resolve();
    })
    // Try with acquired access token
    .catch(async () => {
      await getTokenPopup();
      simplePostApi(env.apiBase + "/api/website/addMix", store.accessToken, {productsInMix: productsInMix, dateTime: dateTime, notes: notes})
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Failed to add mix: ", error);
        reject();
      });
    });
  });
}

export function getContainers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getContainers", store.accessToken).then((containers) => {
      resolve(containers);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenPopup();
      simpleGetApi(env.apiBase + "/api/website/getContainers", store.accessToken).then((containers) => {
        resolve(containers);
      }).catch((error) => {
        console.error("Failed to get containers: ", error);
        reject();
      });
    });
  });
}

export function addContribution(productsInContribution, dateTime, isDelivery, notes) {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simplePostApi(env.apiBase + "/api/website/addContribution", store.accessToken, {productsInContribution: productsInContribution, dateTime: dateTime, isDelivery: isDelivery, notes: notes})
    .then(() => {
      resolve();
    })
    // Try with acquired access token
    .catch(async () => {
      await getTokenPopup();
      simplePostApi(env.apiBase + "/api/website/addContribution", store.accessToken, {productsInContribution: productsInContribution, dateTime: dateTime, isDelivery: isDelivery, notes: notes})
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Failed to add contribution: ", error);
        reject();
      });
    });
  });
}