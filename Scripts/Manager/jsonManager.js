const fs = require('fs');

let instance = null

class JsonManager{
    constructor(){
        if(!!instance){
            return instance;
        }
        instance = this

        this.heroDataPath = './Json/heroData.txt'

        this.addCommand = null        
        this.heroTable = []

        this.init();

        return this
    }

    init() {
        this.initProcess(this.heroDataPath, (readTable) => {
            this.heroTable = readTable
        })
    }

    initProcess(path, callback) {
        this.checkJson(path, () =>
            this.readJson(path, callback))
    }

    setAddCommand(command){
        this.addCommand = command
    }

    addProcess(newHero) {
        let command = this.addCommand

        if (command !== null) {
            command.execute(newHero)
        }
    }

    checkJson(path, callback) {
        fs.exists(path, (isExists) => {

            if (!isExists) {
                let table = []
                fs.writeFile(path, JSON.stringify(table, null, 4), 'utf8', callback)
            }
            else {
                callback()
            }

        })
    }

    readJson(path, callback) {
        let table = []
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                if (data !== null) {
                    table = JSON.parse(data)
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
}

module.exports = {
    JsonManager: JsonManager,
}