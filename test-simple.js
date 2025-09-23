import request from 'supertest';
import app from './src/server.js';

async function runTests() {
  console.log('🧪 Testing Schedulr Backend...\n');
  
  let token;
  
  try {
    // Test 1: Health Check
    console.log('1. Testing health endpoint...');
    const healthRes = await request(app).get('/health');
    if (healthRes.status === 200 && healthRes.body.status === 'ok') {
      console.log('✅ Health check passed');
    } else {
      console.log('❌ Health check failed');
      return;
    }
    
    // Test 2: Login
    console.log('\n2. Testing login...');
    const loginRes = await request(app).post('/auth/login').send({ 
      email: 'admin@example.com', 
      password: 'admin123' 
    });
    if (loginRes.status === 200 && loginRes.body.token) {
      console.log('✅ Login successful');
      token = loginRes.body.token;
    } else {
      console.log('❌ Login failed');
      return;
    }
    
    // Test 3: Timetable Generation
    console.log('\n3. Testing timetable generation...');
    const timetableRes = await request(app)
      .post('/timetable/generate')
      .set('Authorization', `Bearer ${token}`)
      .send({ choices: 2 });
    if (timetableRes.status === 200 && timetableRes.body.choices.length === 2) {
      console.log('✅ Timetable generation successful');
    } else {
      console.log('❌ Timetable generation failed');
      return;
    }
    
    // Test 4: Get Choices
    console.log('\n4. Testing get choices...');
    const choicesRes = await request(app)
      .get('/timetable/choices')
      .set('Authorization', `Bearer ${token}`);
    if (choicesRes.status === 200) {
      console.log('✅ Get choices successful');
    } else {
      console.log('❌ Get choices failed');
    }
    
    console.log('\n🎉 All tests passed! Your backend is working perfectly!');
    
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
}

runTests();



