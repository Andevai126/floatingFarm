// require('dotenv').config();
// require('dotenv').config({ path: './../../.env' });

import { createApp } from 'vue';
import App from './App.vue';
import { initializeMsal } from './msalConfig';

const app = createApp(App);
app.mount('#app');

initializeMsal();


// import store from './helpstuff/store';
// const msal = require('@azure/msal-browser');

// console.log(config);
// import { createApp } from 'vue';
// import App from './App.vue'



// import {store, msalConfig} from './msalConfig';


// Initialize and retrieve the MSAL instance
// var accountId = '';
// store.msalInstance = new msal.PublicClientApplication(msalConfig);


// var config = require('./helpstuff/authConfig');
// const b2cScopes = config.b2cScopes;
// const request = {
//     account: (store.msalInstance).getAccountByHomeId(store.accountId),
//     scopes: b2cScopes
//   };

// if (store.msalInstance == null) {
//     console.log("uninitialized");
// } else {
//     console.log("initialized!");
// }



// store.msalInstance.initialize()
// .then(() => {
//   store.msalInstance.handleRedirectPromise().then((resp) => {
//         if (resp !== null && resp !== undefined) {
//             // store.dispatch('setAccountId', resp.account.homeAccountId);
//             // (store.getters.getMsalInstance).setActiveAccount(resp.account);
//             store.accountId = resp.account.homeAccountId;
//             store.msalInstance.setActiveAccount(resp.account);
//         } else {
//             // const currentAccounts = (store.getters.getMsalInstance).getAllAccounts();
//             const currentAccounts = store.msalInstance.getAllAccounts();
    
//             if (!currentAccounts || currentAccounts.length < 1) {
//             return;
    
//             } else if (currentAccounts.length > 1) {
//             console.log("Warning! multiple accounts found!");
//             const activeAccount = currentAccounts[0];
//             // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
//             // store.dispatch('setAccountId', activeAccount.homeAccountId);
//             (store.msalInstance).setActiveAccount(activeAccount);
//             store.accountId = activeAccount.homeAccountId;
    
//             } else if (currentAccounts.length === 1) {
//             const activeAccount = currentAccounts[0];
//             // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
//             // store.dispatch('setAccountId', activeAccount.homeAccountId);
//             (store.msalInstance).setActiveAccount(activeAccount);
//             store.accountId = activeAccount.homeAccountId;
//             }
//         }
//     }).then(() => {
//         store.msalInstance
//         .acquireTokenSilent(request).then(() => {
//             store.authenticated.value = true
//             console.log("silent token acquisition success. :::")

//         })
//         .catch(() => {
//             store.authenticated.value = false
//             console.log("silent token acquisition fails. :::");
//         })
//     })
// });

//   .then(() => {
// //     The MSAL instance is fully initialized here
// //     // app.config.globalProperties.$msalInstance = msalInstance;
// //     // app.config.globalProperties.$accountId = accountId;

    
//   })
//   .catch((error) => {
//     console.error('MSAL initialization error:', error);
//   });

// var accountId = '';
// var msalInstance = new msal.PublicClientApplication(config.msalConfig);

// function handleResponse(resp) {
//     if (resp !== null && resp !== undefined) {
//         // store.dispatch('setAccountId', resp.account.homeAccountId);
//         // (store.getters.getMsalInstance).setActiveAccount(resp.account);
//         accountId = resp.account.homeAccountId;
//         msalInstance.setActiveAccount(resp.account);
//     } else {
//         // const currentAccounts = (store.getters.getMsalInstance).getAllAccounts();
//         const currentAccounts = msalInstance.getAllAccounts();

//         if (!currentAccounts || currentAccounts.length < 1) {
//         return;

//         } else if (currentAccounts.length > 1) {
//         console.log("Warning! multiple accounts found!");
//         const activeAccount = currentAccounts[0];
//         // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
//         // store.dispatch('setAccountId', activeAccount.homeAccountId);
//         (msalInstance).setActiveAccount(activeAccount);
//         accountId = activeAccount.homeAccountId;

//         } else if (currentAccounts.length === 1) {
//         const activeAccount = currentAccounts[0];
//         // (store.getters.getMsalInstance).setActiveAccount(activeAccount);
//         // store.dispatch('setAccountId', activeAccount.homeAccountId);
//         (msalInstance).setActiveAccount(activeAccount);
//         accountId = activeAccount.homeAccountId;
//         }
//     }
// }


// msalInstance.initialize().then(() => {
//     (msalInstance).handleRedirectPromise().then(handleResponse())
//     .then(() => {
//         store.msalInstance = config.msalConfig;
//         store.accountId = accountId;
//         config.print();

//         const app = createApp(App);
//         // app.use(config.store); // Use the store
//         app.mount('#app');
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });


// config.initializeMsalInstance().then(() => {
//     config.print();
// });




// const msalInstance = new msal.PublicClientApplication(config.msalConfig);
// const msalInstance = config.msalInstance;

// sessionStorage.setItem('msalInstance', new msal.PublicClientApplication(config.msalConfig));
// sessionStorage.setItem('accountId', '');

// config.initializeMsalInstance();

// function handleResponse(resp) {
//     if (resp !== null && resp !== undefined) {
//         store.dispatch('setAccountId', resp.account.homeAccountId);
//         msalInstance.setActiveAccount(resp.account);
        
//     } else {
//         const currentAccounts = msalInstance.getAllAccounts();
  
//         if (!currentAccounts || currentAccounts.length < 1) {
//             return;
  
//         } else if (currentAccounts.length > 1) {
//             console.log("Warning! multiple accounts found!");
//             const activeAccount = currentAccounts[0];
//             msalInstance.setActiveAccount(activeAccount);
//             store.dispatch('setAccountId', activeAccount.homeAccountId);
  
//         } else if (currentAccounts.length === 1) {
//             const activeAccount = currentAccounts[0];
//             msalInstance.setActiveAccount(activeAccount);
//             store.dispatch('setAccountId', activeAccount.homeAccountId);
//         }
//     }
//   }


// sessionStorage


// await msalInstance.initialize().then(() => {
//     msalInstance.handleRedirectPromise().then(handleResponse()).catch(err => {
//         console.error(err);
//     });
// })
// await store.dispatch('setMsalInstance', msalInstance);

// await store;
// import { createApp } from 'vue'

// import Vue from 'vue';
// Vue.prototype.$actionButton = 'Not Approved'


// var app = createApp(App);
// app.use(store);
// app.mount('#app')

// config.store.dispatch('setMsalInstance', new msal.PublicClientApplication(config.msalConfig));
//     config.initializeMsalInstance();
  // Now your store is initialized, and you can safely use globalVariable



// import store from './store';

// const app = createApp(App);
// app.use(config.store); // Use the store
// app.mount('#app');

// export default msalInstance
// try to use a plain js store :)

// just set login to true if logged in and false with accesstokencheck failed