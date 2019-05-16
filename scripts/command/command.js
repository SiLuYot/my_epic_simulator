'use strict'

const jsonInstance = require('../manager/jsonManager').instance

class Command{
    execute(){
        throw new Error('execute must be implement.')
    }
}

class HeroAddCommand extends Command{
    execute(newHero){
        //영웅 데이터 추가 후
        jsonInstance.heroTable.push(newHero)
        //추가된 테이블 새로 작성
        jsonInstance.writeJson(jsonInstance.heroDataPath)
        //변경사항 메인 프로세스에 알림
        jsonInstance.updateJsonManager()
    }
}

module.exports = {
    Command: Command,
    HeroAddCommand: HeroAddCommand,
}