const crypto = require('crypto');

// Generate a secure random API key
const apiKey = crypto.randomBytes(32).toString('hex');

console.log('Generated API Key:');
console.log(apiKey);
console.log('\nAdd this to your .env.local file:');
console.log(`API_KEY=${apiKey}`);
console.log('\nExample usage:');
console.log(`curl -X POST http://localhost:3003/api/posts \\`);
console.log(`  -H "Content-Type: application/json" \\`);
console.log(`  -H "Authorization: Bearer ${apiKey}" \\`);
console.log(`  -d '{"slug": "test", "title": "Test", "content": "Content", "category": "technology"}'`);
