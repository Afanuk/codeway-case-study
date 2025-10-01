// Simple API test script
const BASE_URL = 'http://localhost:4000';

// Test function
async function testAPI() {
  console.log('🚀 Testing Backend API...\n');

  // Test 1: Health Check
  try {
    console.log('1️⃣ Testing Health Check...');
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    console.log('✅ Health Check:', data);
  } catch (error) {
    console.log('❌ Health Check failed:', error.message);
  }

  // Test 2: API Info
  try {
    console.log('\n2️⃣ Testing API Info...');
    const response = await fetch(`${BASE_URL}/api`);
    const data = await response.json();
    console.log('✅ API Info:', data);
  } catch (error) {
    console.log('❌ API Info failed:', error.message);
  }

  // Test 3: Create Parameter
  try {
    console.log('\n3️⃣ Testing Create Parameter...');
    const response = await fetch(`${BASE_URL}/api/parameters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parameterKey: 'theme',
        value: 'dark',
        description: 'UI theme setting'
      })
    });
    const data = await response.json();
    console.log('✅ Create Parameter:', data);
  } catch (error) {
    console.log('❌ Create Parameter failed:', error.message);
  }

  // Test 4: Get All Parameters
  try {
    console.log('\n4️⃣ Testing Get All Parameters...');
    const response = await fetch(`${BASE_URL}/api/parameters`);
    const data = await response.json();
    console.log('✅ Get All Parameters:', data);
  } catch (error) {
    console.log('❌ Get All Parameters failed:', error.message);
  }

  // Test 5: Get Parameter by Key
  try {
    console.log('\n5️⃣ Testing Get Parameter by Key...');
    const response = await fetch(`${BASE_URL}/api/parameters/key/theme`);
    const data = await response.json();
    console.log('✅ Get Parameter by Key:', data);
  } catch (error) {
    console.log('❌ Get Parameter by Key failed:', error.message);
  }
}

// Run tests
testAPI().catch(console.error);