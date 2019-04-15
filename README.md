# my_epic_simulator
>vscode, electron, nodejs
>>https://github.com/electron/electron-quick-start

### 시작  

"`
npm install electron --save-dev
npm start
"`

# Skill Data  
https://docs.google.com/spreadsheets/d/1aqL0Uj26PRW_jAUj8pYaSls_DOuFq30fvwQh8ol74-E/edit#gid=0


## 버프/디버프  


## 공식
* element = 속성 이점이 있을경우 1.1, 아니면 1
* hitType = 빗나감 : 0.75 / 일반 : 1.0 / 강타 : 1.3 / 크리티컬 : 캐릭터의 치명피해 (150% = 1.5)


* 일반  
attack * att_rate * element * (1.871*pow!) / (enemyDef / 300 + 1)* hitType

* 자신의 최대 체력 비례  
(attack * att_rate + health * hpScaling) * element * (1.871 * pow!) / (enemyDef / 300 + 1) * hitType

* 자신의 속도 비례  
(attack * att_rate) * ( 1 + speed * speed_rate) * element *(1.871 * pow!) / (enemyDef / 300 + 1) * hitType

* 대상의 잃은 체력 비례  

* 대상의 최대 체력 비례  




