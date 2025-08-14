// test/import-test.js
// Test that the server module can be imported without errors

try {
  const app = require('../src/server');
  console.log('✅ Server module imported successfully');
  console.log('✅ Solid System is ready for use');
} catch (error) {
  console.error('❌ Error importing server module:', error.message);
  process.exit(1);
}