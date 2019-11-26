const electron = require('electron');
const { app, Tray, Menu } = electron;
const path = require('path');
const ip = require('ip');
const publicIp = require('public-ip');
const ncp = require('clipboardy');
const iconPath = path.join(__dirname, 'iconTemplate@3x.png');
let appIcon = null;

app.on('ready', () => {
    publicIp.v4().then(eip => {
        appIcon = new Tray(iconPath);
        let contextMenu = Menu.buildFromTemplate([{
                label: "Copy WLAN: " + ip.address("public"),
                click: function () {
                    ncp.writeSync(ip.address("public"));
                }
            },
            {
                label: `Copy Public: ${eip}`,
                click: function () {
                    ncp.writeSync(eip);
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Quit',
                accelerator: 'CommandOrControl+Q',
                selector: 'terminate:',
                click: function () {
                    app.quit();
                    app.exit();
                }
            }
        ]);
        appIcon.setToolTip('View your IP information');
        appIcon.setContextMenu(contextMenu);
    });
});

app.on('quit', () => {
    app.quit();
    app.exit();
});