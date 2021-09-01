// import { startupMessage } from '../src/server/server.js'
const startupMessage = require('../src/server/server.js');
test('listen', () => {
    expect(startupMessage).toBeDefined();
});