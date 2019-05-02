const fs = require('fs');
const heroDataPath = './Json/heroData.txt'

class DataManager{
    constructor(){
        if(!!DataManager.instance){
            return DataManager.instance;
        }
        DataManager.instance = this;

        this.heroTable = []
        this.init();

        return this;
    }

    init() {
        this.checkJson(heroDataPath, () =>
            this.readJson(heroDataPath, (table) => {
                this.heroTable = table;
            }))
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

    addData(newData, callback = null) {
        this.heroTable.push(newData)

        if (callback !== null)
            callback(table)
    }
}

module.exports = {
    DataManager: DataManager,
}