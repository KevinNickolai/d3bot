import * as pth from 'path'

var Service = require('node-windows').Service;
var servicePath = pth.join(__dirname, 'index.js');

var svc = new Service({
    name: 'Distric 3 Skill Bot',
    description: 'Temple OSRS Discord Bot as a Windows service.',
    script: servicePath
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', () => {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

console.log(servicePath);

// Uninstall the service.
svc.uninstall();