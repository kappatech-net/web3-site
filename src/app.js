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
  const didInput = document.getElementById('did-input').value;
  try {
    const resolution = await resolver.resolve(didInput);
    document.getElementById('did-info').innerText = JSON.stringify(resolution, null, 2);
  } catch (error) {
    console.error('DID resolution failed', error);
    document.getElementById('did-info').innerText = 'Error: Failed to resolve DID';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('resolve-btn').addEventListener('click', resolveDID);
});