import * as pth from 'path'

var Service = require('node-windows').Service;
var servicePath = pth.join(__dirname, 'index.js');

var svc = new Service({
    name: 'Distric 3 Skill Bot',
    description: 'Temple OSRS Discord Bot as a Windows service.',
    script: servicePath
});

svc.on('install', () => {
    console.log('Installation complete... starting service.');

    svc.start();
});

svc.on('alreadyinstalled', () => {
    console.log('Service already installed.');
});

console.log(servicePath);

svc.install();