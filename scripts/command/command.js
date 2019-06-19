'use strict'

const jsonInstance = require('../manager/jsonManager').instance

class Command {
    constructor(param) {
        this.setParameter(param)
    }

    setParameter(param) {
        this.param = param
    }

    execute() {
        throw new Error('execute must be implement.')
    }
}

//영웅 테이블 관련 부모 클래스
class HeroTableCommand extends Command {
    setParameter(param) {
        super.setParameter(param)
        
        if (param) {
            this.heroData = param[0]
            this.heroIndex = param[1]
        }
    }

    execute() {
        //변경된 테이블 새로 작성
        jsonInstance.writeJson(jsonInstance.heroDataPath)
        //변경사항 메인 프로세스에 알림
        jsonInstance.updateJsonManager()
    }
}

class HeroAddCommand extends HeroTableCommand {
    execute() {
        //영웅 데이터 추가
        jsonInstance.heroTable.push(this.heroData)
        //데이터 적용
        super.execute()
    }
}

class HeroEditCommand extends HeroTableCommand {
    execute() {
        //기존 영웅 데이터에 할당
        jsonInstance.heroTable[this.heroIndex] = this.heroData
        //데이터 적용    
        super.execute()
    }
}

class HeroDeleteCommand extends HeroTableCommand {
    execute() {
        //해당 요소 삭제
        jsonInstance.heroTable.splice(this.heroIndex, 1)
        //데이터 적용    
        super.execute()
    }
}

module.exports = {
    Command: Command,
    HeroAddCommand: HeroAddCommand,
    HeroEditCommand: HeroEditCommand,
    HeroDeleteCommand: HeroDeleteCommand,
}