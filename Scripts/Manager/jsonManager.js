'use strict'

const { ipcRenderer } = require('electron')
const fs = require('fs')

class JsonManager {
    constructor() {        
        let instance = ipcRenderer.sendSync('get_single_instance', this.constructor.name)
        if (!instance) {
            this.isInit = false

            this.dataPath = './Json'
            this.heroDataPath = './Json/heroData.txt'
    
            this.addCommand = null
            this.heroTable = []
            
            instance = this
        }

        let prototypeInstance = Object.setPrototypeOf(instance, JsonManager.prototype)
        return prototypeInstance
    }
    
    init(callback) {
        if (!this.isInit) {            
            this.isInit = true

            this.initJsonProcess(this.heroDataPath, (readTable) => {
                this.heroTable = readTable

                if (callback != null)
                    callback()
            })
        }

    }

    initJsonProcess(path, callback) {
        this.checkJson(path, () =>
            this.readJson(path, callback))
    }

    setAddCommand(command) {
        this.addCommand = command
    }

    addProcess(newHero) {
        let command = this.addCommand

        if (command !== null) {
            command.execute(newHero)
        }
    }

    checkJson(path, callback) {
        try {
            fs.mkdirSync(this.dataPath);
        }
        catch (e) {
            if (e.code != 'EEXIST') throw e; // 존재할경우 패스처리함. 
        }
        finally {
            fs.exists(path, (isExists) => {

                if (!isExists) {
                    let options = {
                        headers: {
                            'User-Agent': 'epic_simulator',
                            'Accept': 'application/vnd.github.v3+json',
                            'Authorization': 'token 945aec0ab3f9d3bb242a3d6d5505bde66132a726'
                        },
                        method: 'GET',
                        protocol: 'https:',
                        hostname: 'api.github.com',
                        path: '/repos/SiLuYot/my_epic_simulator/contents/Json/heroData.txt'
                    }

                    ipcRenderer.send('req_heroData', options)
                    ipcRenderer.on('res_heroData', (event, arg) => {
                        let decodeContent = decodeURIComponent(escape(atob(arg.content)))
                        let decodeJson = JSON.parse(decodeContent)
                        console.log(decodeJson);

                        fs.writeFile(path, JSON.stringify(decodeJson, null, 4), 'utf8', callback)
                    })

                }
                else {
                    callback()
                }

            })
        }
    }

    readJson(path, callback) {
        let table = []
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                alert('Json Read Error\n' + err)
                console.log(err)
            }
            else {
                if (data !== null) {
                    try {
                        table = JSON.parse(data)
                    } catch (error) {
                        alert('Json Read Error\n' + error)
                    }
                }
                callback(table)
            }
        })
    }

    writeJson(path, callback = null) {
        let newJson = JSON.stringify(this.heroTable, null, 4)
        fs.writeFile(path, newJson, 'utf8', (err) => {
            if (err) {
                console.log(err)
            }
            else {
                if (callback !== null)
                    callback();
            }
        })
    }

    updateJsonManager(){
        ipcRenderer.send('update_single_instance', [this, this.constructor.name])
    }
}

module.exports = {
    instance: new JsonManager(),
}