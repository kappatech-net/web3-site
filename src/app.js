import './styles.css';
import { Resolver } from 'did-resolver';
import { getResolver as getEthrResolver } from 'ethr-did-resolver';

// Use environment variable for Infura Project ID
const infuraProjectId = process.env.INFURA_PROJECT_ID || 'default_project_id';

// Configure the Ethereum DID resolver
const providerConfig = {
  networks: [
    { name: 'mainnet', rpcUrl: `https://mainnet.infura.io/v3/${infuraProjectId}` }
  ]
};

const ethrDidResolver = getEthrResolver(providerConfig);
const resolver = new Resolver(ethrDidResolver);

function resolveDID() {
  console.log('resolveDID function called');
  const didInput = document.getElementById('did-input');
  if (!didInput) {
    console.error('did-input element not found');
    return;
  }
  const didValue = didInput.value;
  console.log('DID to resolve:', didValue);
  resolver.resolve(didValue)
    .then(resolution => {
      console.log('DID resolution result:', resolution);
      updateDIDInfo(JSON.stringify(resolution, null, 2));
    })
    .catch(error => {
      console.error('DID resolution failed', error);
      updateDIDInfo('Error: Failed to resolve DID');
    });
}

function loginWithCeramicDID() {
  console.log('Ceramic DID login attempted');
  updateDIDInfo('Ceramic DID login functionality not implemented yet');
}

function verifyDIDJWT() {
  console.log('DID JWT verification attempted');
  updateDIDInfo('DID JWT verification functionality not implemented yet');
}

function updateDIDInfo(message) {
  const didInfoElement = document.getElementById('did-info');
  if (didInfoElement) {
    didInfoElement.innerText = message;
  } else {
    console.error('did-info element not found');
  }
}

function initializeApp() {
  console.log('Initializing app');
  
  const elements = [
    { id: 'resolve-btn', handler: resolveDID },
    { id: 'ceramic-login-btn', handler: loginWithCeramicDID },
    { id: 'jwt-verify-btn', handler: verifyDIDJWT }
  ];

  elements.forEach(({ id, handler }) => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`Adding click event listener to ${id}`);
      element.addEventListener('click', handler);
    } else {
      console.error(`${id} element not found`);
    }
  });

  console.log('App initialization complete');
}

// Ensure the DOM is fully loaded before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

console.log('Script loaded');