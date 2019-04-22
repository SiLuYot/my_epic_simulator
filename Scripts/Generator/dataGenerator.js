const hero = require('../Data/hero')
const fs = require('fs');
const jsonFilePath = './Json/heroData.txt'

document.getElementById('create').onclick = () => {
    let name = document.getElementById('name').value
    let element = document.getElementById('element').value

    let att_rate_1 = document.getElementById('att_rate_1').value
    let pow_1 = document.getElementById('pow_1').value
    let soul_burn_1 = document.getElementById('soul_burn_1').value

    let att_rate_2 = document.getElementById('att_rate_2').value
    let pow_2 = document.getElementById('pow_2').value
    let soul_burn_2 = document.getElementById('soul_burn_2').value

    let att_rate_3 = document.getElementById('att_rate_3').value
    let pow_3 = document.getElementById('pow_3').value
    let soul_burn_3 = document.getElementById('soul_burn_3').value

    let newHero = new hero.HeroData(name, element,
        att_rate_1, pow_1, soul_burn_1,
        att_rate_2, pow_2, soul_burn_2,
        att_rate_3, pow_3, soul_burn_3)

    //json 미리보기에 표시
    document.getElementById('result').value = JSON.stringify(newHero, null, 4)

    //데이터 작성
    // writeJsonToFile(newHero, (err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         alert('생성완료');
    //     }
    // })
    dataGenerateProcess(newHero)
}

async function dataGenerateProcess(newHero) {
    checkJson(() => {
        readJson((table) => {
            addJson(newHero, table, (newTable) => {
                writeJson(newTable)
            })
        })
    })
}

function checkJson(callback) {
    fs.exists(jsonFilePath, (isExists) => {
        if (!isExists) {
            let table = []
            fs.writeFile(jsonFilePath, JSON.stringify(table, null, 4), 'utf8', callback)
        }
        else {
            callback()
        }
    })
}

function readJson(callback) {
    let table = []
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
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

function addJson(newHero, table, callback) {
    table.push(newHero)
    callback(table)
}

function writeJson(table) {
    newJson = JSON.stringify(table, null, 4)
    fs.writeFile(jsonFilePath, newJson, 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
        else {
            alert('생성완료');
        }
    })
}

function writeJsonToFile(newHero, callback) {
    let table = []

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            fs.exists(jsonFilePath, (isExists) => {
                if (!isExists) {
                    table.push(newHero)
                    newJson = JSON.stringify(table, null, 4)
                    fs.writeFile(jsonFilePath, newJson, 'utf8', callback)
                }
            })
        }
        else {
            if (data !== null) {
                table = JSON.parse(data)
            }

            table.push(newHero)
            newJson = JSON.stringify(table, null, 4)
            fs.writeFile(jsonFilePath, newJson, 'utf8', callback)
        }
    })
}