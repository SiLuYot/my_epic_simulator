const Hero = require('../Data/hero')

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

    let newHero = new Hero.HeroData(name, element, 
        att_rate_1, pow_1, soul_burn_1,
        att_rate_2, pow_2, soul_burn_2, 
        att_rate_3, pow_3, soul_burn_3)

    let newHerojson = newHero.toJson()
    
    document.getElementById('result').value = newHerojson
}