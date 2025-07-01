// test-google-fetch.js
async function testGoogleFetch() {
  try {
    // Node.js v18+ has built-in fetch
    const response = await fetch('https://accounts.google.com/.well-known/openid-configuration');
    if (response.ok) {
      const data = await response.json();
      console.log('Successfully fetched Google OpenID configuration:');
      console.log(data);
    } else {
      console.error(`Failed to fetch. Status: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('An error occurred during fetch:', error);
  }
}

testGoogleFetch(); 