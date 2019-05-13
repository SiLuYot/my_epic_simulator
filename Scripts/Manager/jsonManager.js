const fs = require('fs');

class JsonManager {
    constructor() {
        this.dataPath = './Json'
        this.heroDataPath = './Json/heroData.txt'

        this.addCommand = null
        this.heroTable = []
    }

    init(callback) {
        this.initProcess(this.heroDataPath, (readTable) => {
            this.heroTable = readTable

            if (callback != null)
                callback()
        })
    }

    initProcess(path, callback) {
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
        finally{
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
}

const instance = new JsonManager()

module.exports = {
    instance: instance
}