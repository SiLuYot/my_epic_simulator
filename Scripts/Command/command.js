const jsonManager = require('../Manager/jsonManager').instance

class Command{
    execute(){
        throw new Error('execute must be implement.')
    }
}

class HeroAddCommand extends Command{
    execute(newHero){
        //영웅 데이터 추가 후
        jsonManager.heroTable.push(newHero)
        //추가된 테이블 새로 작성
        jsonManager.writeJson(jsonManager.heroDataPath)
    }
}

module.exports = {
    Command: Command,
    HeroAddCommand: HeroAddCommand,
}