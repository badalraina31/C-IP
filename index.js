const electron = require('electron');
const { app, Tray, Menu, BrowserWindow } = electron;
const path = require('path');
const iconPath = path.join(__dirname, 'iconTemplate@3x.png');
let appIcon = null;
let win = null;

const ip = require('ip');
const publicIp = require('public-ip');
var ExternalIP;
var ncp = require("copy-paste");

app.on('ready', () => {
    publicIp.v4().then(eip => {
        ExternalIP = eip;
        win = new BrowserWindow({show: false});
        appIcon = new Tray(iconPath);
        var contextMenu = Menu.buildFromTemplate([
            {
            label: "Copy WLAN: " + ip.address("public"),
            click: function() {
                ncp.copy(ip.address("public"));
                }
            },
            {
            label: "Copy Public: " + ExternalIP,
            click: function() {
                ncp.copy(ExternalIP);
                }
            },
            {type: 'separator'},
            { label: 'Quit',
            accelerator: 'CommandOrControl+Q',
            selector: 'terminate:',
            click: function() {
                    app.quit();
                    app.exit();
                }
            }
        ]);
        appIcon.setToolTip('View your IP information');
        appIcon.setContextMenu(contextMenu);
    });
})
app.on('quit', () => {
    app.quit();
    app.exit();
})