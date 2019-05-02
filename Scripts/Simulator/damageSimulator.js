const skill = require('../Data/skill')
const hero = require('../Data/hero')
const element = require('../Data/element')

const heroManager = require('../Manager/heroManager')
const heroInstance = new heroManager.HeroManager();

const dataManager = require('../Manager/dataManager')
const dataInstance = new dataManager.DataManager();

// let skill1 = new skill.BaseSkill(1.5, 0.95, 0)
// let skill2 = new skill.BaseSkill(1.2, 0.95, 0)
// let skillSet = new skill.SkillSet(skill1, skill2, null)

// let testHero = new hero.BaseHero(2504.5,207,new element.LightElement(), skillSet)

// heroManager = new manager.HeroManager()
// let msg = heroManager.attackSimulate(testHero, 0)

// alert(msg)

window.onload = () => {
    setHeroList()
}

function setHeroList(){
    let heroListForm = document.heroListForm;

    let op = new Option()
    op.value = 1
    op.text = 'test'

    heroListForm.heroList.options.add(op)
}