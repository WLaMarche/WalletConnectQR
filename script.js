// Application id from moralis.io
Moralis.initialize('QN8QQv2FSjL0kiWmmqT1h4eVyWivduW7gDHfZOD1');
//Server url from moralis.io
Moralis.serverURL = 'https://t1djce0ncric.moralisweb3.com:2053/server';

const authButton = document.getElementById('btn-auth');
const enableButton = document.getElementById('btn-enable');
const logoutButton = document.getElementById('btn-logout');
const callButton = document.getElementById('btn-call');
const subheader = document.getElementById('subheader');
const resultBox = document.getElementById('result');

let user;
let web3;
let result = '';

const provider = 'walletconnect';

function renderApp() {
  user = Moralis.User.current();

  if (user) {
    authButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    subheader.innerText = `Welcome ${user.get('username')}`;

    if (web3) {
      callButton.style.display = 'inline-block';
      enableButton.style.display = 'none';
    } else {
      callButton.style.display = 'none';
      enableButton.style.display = 'inline-block';
    }
  } else {
    authButton.style.display = 'inline-block';
    callButton.style.display = 'none';
    logoutButton.style.display = 'none';
    subheader.innerText = '';
    enableButton.style.display = 'none';
  }

  resultBox.innerText = result;
}

async function authenticate() {
  try {
    user = await Moralis.Web3.authenticate({provider: 'walletconnect'}); //{provider: 'walletconnect'}
    web3 = await Moralis.Web3.enable({provider: 'walletconnect'}); //{provider: 'walletconnect'}
    alert('User has logged in!');
  } catch (error) {
    console.log('authenticate failed', error);
  }
  renderApp();
}

async function logout() {
  try {
    await Moralis.User.logOut();
  } catch (error) {
    console.log('logOut failed', error);
  }
  result = '';
  renderApp();
}

async function testCall() {
  try {
    result = await web3.eth.personal.sign('Your Test', user.get('ethAddress'));
  } catch (error) {
    console.log('testCall failed', error);
  }
  renderApp();
}

async function enableWeb3() {
  try {
    web3 = await Moralis.Web3.enable({provider: 'walletconnect'}); //{provider: 'walletconnect'}
  } catch (error) {
    console.log('testCall failed', error);
  }
  renderApp();
}

authButton.onclick = authenticate;
logoutButton.onclick = logout;
callButton.onclick = testCall;
enableButton.onclick = enableWeb3;

renderApp();
