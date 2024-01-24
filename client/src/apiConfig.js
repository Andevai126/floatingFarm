import { store } from './store';
import { b2cScopes, b2cPolicies, setAccount, authenticateAccount, clearCredentials, getTokenRedirect } from './msalConfig';
const axios = require('axios');
const env = require('./../environment');

// Redirect user to signIn page, retrieve and save accessToken
export function signIn() {
  (store.msalInstance).loginRedirect({
    scopes: b2cScopes,
    onRedirectNavigate: () => {location.reload();}
  }).then(setAccount).then(authenticateAccount).catch(() => {
    console.error("User cancelled login flow");
  });
}

// Redirect user to signOut page, remove all stored personal information
export function signOut() {
  (store.msalInstance).logoutRedirect({
    account: (store.msalInstance).getAccountByHomeId(store.accountId)
  }).then(() => {
    store.authenticated.value = false;
    store.accessToken = "";
    clearCredentials();
  });
}

// Redirect user to editProfile page, update username
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

// Call a GET endpoint and return a promise
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

// Call a POST endpoint and return a promise
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

// Retrieve users
export async function getUsers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getUsers", store.accessToken).then((users) => {
      resolve(users);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getUsers", store.accessToken).then((users) => {
        resolve(users);
      }).catch((error) => {
        console.error("Failed to get users: ", error);
        reject();
      })
    });
  });
}

// Retrieve roles
export async function getRoles() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getRoles", store.accessToken).then((roles) => {
      resolve(roles);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getRoles", store.accessToken).then((roles) => {
        resolve(roles);
      }).catch((error) => {
        console.error("Failed to get roles: ", error);
        reject();
      })
    });
  });
}

// Retrieve suppliers
export async function getSuppliers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getSuppliers", store.accessToken).then((suppliers) => {
      resolve(suppliers);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getSuppliers", store.accessToken).then((suppliers) => {
        resolve(suppliers);
      }).catch((error) => {
        console.error("Failed to get suppliers: ", error);
        reject();
      })
    });
  });
}

// Update a specified user
export async function updateUser(id, role, supplier) {
  // Try with stored access token
  simplePostApi(env.apiBase + "/api/website/updateUser", store.accessToken, {id: id, role: role, supplier: supplier})
  // Try with acquired access token
  .catch(async () => {
    await getTokenRedirect();
    simplePostApi(env.apiBase + "/api/website/updateUser", store.accessToken, {id: id, role: role, supplier: supplier})
    .catch((error) => {
      console.log("Failed to update user: ", error);
    });
  });
}

// Delete a specified user
export function deleteUser(id) {
  // Try with stored access token
  simplePostApi(env.apiBase + "/api/website/deleteUser", store.accessToken, {id: id})
  // Try with acquired access token
  .catch(async () => {
    await getTokenRedirect();
    simplePostApi(env.apiBase + "/api/website/deleteUser", store.accessToken, {id: id})
    .catch((error) => {
      console.error("Failed to delete user: ", error);
    });
  });
}

// Retrieve products
export function getProducts() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getProducts", store.accessToken).then((products) => {
      resolve(products);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getProducts", store.accessToken).then((products) => {
        resolve(products);
      }).catch((error) => {
        console.error("Failed to get products: ", error);
        reject();
      });
    });
  });
}

// Add a mix
export function addMix(productsInMix, dateTime, notes) {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simplePostApi(env.apiBase + "/api/website/addMix", store.accessToken, {productsInMix: productsInMix, dateTime: dateTime, notes: notes})
    .then(() => {
      resolve();
    })
    // Try with acquired access token
    .catch(async () => {
      await getTokenRedirect();
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

// Retrieve containers
export function getContainers() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getContainers", store.accessToken).then((containers) => {
      resolve(containers);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getContainers", store.accessToken).then((containers) => {
        resolve(containers);
      }).catch((error) => {
        console.error("Failed to get containers: ", error);
        reject();
      });
    });
  });
}

// Add a contribution
export function addContribution(productsInContribution, dateTime, isDelivery, supplierId, notes) {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simplePostApi(env.apiBase + "/api/website/addContribution", store.accessToken, {productsInContribution: productsInContribution, dateTime: dateTime, isDelivery: isDelivery, supplierId: supplierId, notes: notes})
    .then(() => {
      resolve();
    })
    // Try with acquired access token
    .catch(async () => {
      await getTokenRedirect();
      simplePostApi(env.apiBase + "/api/website/addContribution", store.accessToken, {productsInContribution: productsInContribution, dateTime: dateTime, isDelivery: isDelivery, supplierId: supplierId, notes: notes})
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

// Retrieve stock
export function getStock() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getStock", store.accessToken).then((stock) => {
      resolve(stock);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getStock", store.accessToken).then((stock) => {
        resolve(stock);
      }).catch((error) => {
        console.error("Failed to get stock: ", error);
        reject();
      });
    });
  });
}

// Update the stock
export function updateStock(stockProducts) {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simplePostApi(env.apiBase + "/api/website/updateStock", store.accessToken, {stockProducts: stockProducts})
    .then(() => {
      resolve();
    })
    // Try with acquired access token
    .catch(async () => {
      await getTokenRedirect();
      simplePostApi(env.apiBase + "/api/website/updateStock", store.accessToken, {stockProducts: stockProducts})
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error("Failed to update stock: ", error);
        reject();
      });
    });
  });
}

// Retrieve contributions
export function getContributions() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getContributions", store.accessToken).then((contributions) => {
      resolve(contributions);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getContributions", store.accessToken).then((contributions) => {
        resolve(contributions);
      }).catch((error) => {
        console.error("Failed to get contributions: ", error);
        reject();
      });
    });
  });
}

// Retrieve mixes
export function getMixes() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getMixes", store.accessToken).then((mixes) => {
      resolve(mixes);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getMixes", store.accessToken).then((mixes) => {
        resolve(mixes);
      }).catch((error) => {
        console.error("Failed to get mixes: ", error);
        reject();
      });
    });
  });
}

// Retrieve nutrients of mixes
export function getNutrientsOfMixes() {
  return new Promise((resolve, reject) => {
    // Try with stored access token
    simpleGetApi(env.apiBase + "/api/website/getNutrientsOfMixes", store.accessToken).then((nutrientsOfMixes) => {
      resolve(nutrientsOfMixes);
    // Try with acquired access token
    }).catch(async () => {
      await getTokenRedirect();
      simpleGetApi(env.apiBase + "/api/website/getNutrientsOfMixes", store.accessToken).then((nutrientsOfMixes) => {
        resolve(nutrientsOfMixes);
      }).catch((error) => {
        console.error("Failed to get nutrients of mixes: ", error);
        reject();
      });
    });
  });
}