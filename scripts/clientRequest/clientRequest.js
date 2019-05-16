const { ipcMain, net } = require('electron')
const config = require('../config')

const baseOptions = {
    headers: {
        'User-Agent': 'epic_simulator',
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + config.PRIVATE_TOKEN
    },
    method: 'GET',
    protocol: 'https:',
    hostname: 'api.github.com',
    path: '/repos/SiLuYot/my_epic_simulator/contents/Json/heroData.txt'
}

ipcMain.on('req_heroData', (event, arg) => {

    baseOptions.method = 'GET'
    baseOptions.path = '/repos/SiLuYot/my_epic_simulator/contents/Json/heroData.txt'

    baseRequest(baseOptions, (body) => {
        event.sender.send('res_heroData', body);
    })
})


function baseRequest(arg, callback) {
    const request = net.request(arg)

    request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`)

        let body = ''
        response.on('data', (chunk) => {
            body += chunk
        })

        response.on('end', () => {
            console.log(body)
            callback(JSON.parse(body))
        })
    })
    request.end()
}
