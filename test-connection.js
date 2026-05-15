const axios = require('axios');

async function testConnection() {
  try {
    console.log('Testing backend connection...');
    // Test server health
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✓ Server health check:', healthResponse.data);
    // Test courses endpoint
    const coursesResponse = await axios.get('http://localhost:5000/api/courses');
    console.log('✓ Courses endpoint working. Found:', Array.isArray(coursesResponse.data) ? coursesResponse.data.length : 'unknown', 'courses');
    console.log('✓ All endpoints working properly');
  } catch (error) {
    console.error('✗ Connection failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('Make sure your backend server is running on port 5000');
    }
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testConnection();
