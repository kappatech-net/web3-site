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

async function resolveDID() {
  console.log('resolveDID function called');
  const didInput = document.getElementById('did-input');
  if (!didInput) {
    console.error('did-input element not found');
    return;
  }
  const didValue = didInput.value;
  console.log('DID to resolve:', didValue);
  try {
    const resolution = await resolver.resolve(didValue);
    console.log('DID resolution result:', resolution);
    updateDIDInfo(JSON.stringify(resolution, null, 2));
  } catch (error) {
    console.error('DID resolution failed', error);
    updateDIDInfo('Error: Failed to resolve DID');
  }
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
  
  const resolveBtn = document.getElementById('resolve-btn');
  if (resolveBtn) {
    console.log('Adding click event listener to resolve-btn');
    resolveBtn.addEventListener('click', resolveDID);
  } else {
    console.error('resolve-btn element not found');
  }

  const ceramicLoginBtn = document.getElementById('ceramic-login-btn');
  if (ceramicLoginBtn) {
    console.log('Adding click event listener to ceramic-login-btn');
    ceramicLoginBtn.addEventListener('click', loginWithCeramicDID);
  } else {
    console.error('ceramic-login-btn element not found');
  }

  const jwtVerifyBtn = document.getElementById('jwt-verify-btn');
  if (jwtVerifyBtn) {
    console.log('Adding click event listener to jwt-verify-btn');
    jwtVerifyBtn.addEventListener('click', verifyDIDJWT);
  } else {
    console.error('jwt-verify-btn element not found');
  }
}

// Ensure the DOM is fully loaded before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}