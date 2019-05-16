'use strict'

const { ipcRenderer } = require('electron')
const fs = require('fs')
const skill = require('../data/skill')

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
        return Object.setPrototypeOf(instance, JsonManager.prototype)
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
            fs.exists(this.dataPath, (isExists) => {
                if (!isExists) {
                    //폴더가 없으면 만든다.
                    fs.mkdirSync(this.dataPath)
                }

                fs.exists(path, (isExists) => {

                    if (!isExists) {
                        //파일이 없으면 다운로드
                        this.downloadJson(path, callback)
                    }
                    else {
                        callback()
                    }
    
                })
            })
        }
        catch (e) {
            if (e.code != 'EEXIST'){
                throw e
            }                
        }
    }

    downloadJson(path, callback){
        ipcRenderer.send('req_heroData')

        ipcRenderer.on('res_heroData', (event, arg) => {
            let decodeContent = decodeURIComponent(escape(atob(arg.content)))
            let decodeJson = JSON.parse(decodeContent)
            console.log(decodeJson);

            fs.writeFile(path, JSON.stringify(decodeJson, null, 4), 'utf8', callback)
        })
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

    updateJsonManager() {
        ipcRenderer.send('update_single_instance', [this, this.constructor.name])
    }

    getRefinedHeroData(index){
        let heroTableData = this.heroTable[index]

        for (let i in heroTableData.skillArray) {
            let skillData = heroTableData.skillArray[i]
            skillData = Object.setPrototypeOf(skillData, skill.BaseSkill.prototype)
            heroTableData.skillArray[i] = skillData
        }

        return heroTableData
    }
}

module.exports = {
    instance: new JsonManager()
}