'use strict';
(()=>{
const W=32,H=24;
const TYPES={
inspect:{name:'Осмотр',cost:0,frame:14,desc:'Выберите здание, чтобы узнать о его состоянии.'},
road:{name:'Дорога',cost:3,frame:null,desc:'Соединяет дома и службы с ратушей. Можно рисовать непрерывно.'},
house:{name:'Дом',cost:45,frame:0,hp:150,desc:'Вода и еда → уровень 2. Посуда и красота → уровень 3.'},
well:{name:'Колодец',cost:65,frame:3,hp:160,desc:'Даёт воду 4 домам в пределах 8 клеток пути по дороге.'},
market:{name:'Рынок',cost:90,frame:4,hp:170,jobs:2,desc:'2 работника снабжают едой до 8 домов в пределах 10 клеток пути. Неполный состав обслуживает меньше домов.'},
farm:{name:'Ферма',cost:80,frame:5,hp:150,jobs:3,desc:'3 работника производят 6 еды за цикл.'},
fish:{name:'Рыбалка',cost:85,frame:6,hp:140,jobs:3,desc:'Строится у реки. 3 работника производят 6 еды за цикл.'},
pottery:{name:'Гончарная',cost:100,frame:7,hp:170,jobs:4,desc:'Работники делают посуду, необходимую для лучших домов.'},
tower:{name:'Башня',cost:120,frame:8,hp:260,jobs:2,desc:'Нужны 2 работника, улучшенной башне — 4. Без гарнизона не стреляет; неполный состав снижает скорострельность.'},
tree:{name:'Дерево',cost:12,frame:10,hp:60,desc:'Красота для домов в пределах 3 клеток.'},
demolish:{name:'Снести',cost:0,frame:null,desc:'Возвращает треть стоимости. Ратушу снести нельзя.'},
hall:{name:'Ратуша',cost:0,frame:15,hp:700,jobs:1,desc:'1 работник ведёт торговлю и собирает доход города. Сердце дорожной сети.'}
};
const key=(x,y)=>x+','+y,dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const riverX=y=>25+Math.round(Math.sin(y*.32)*1.3);
const terrain=(x,y)=>Math.abs(x-riverX(y))<=1?'water':Math.abs(x-riverX(y))===2?'sand':'grass';
class City{
constructor(saved){this.events=[];this.time=0;this.cycle=0;this.coins=660;this.food=65;this.pots=0;this.wave=0;this.kills=0;this.roads=new Set();this.buildings=[];this.enemies=[];this.waveActive=false;this.spawnLeft=0;this.spawnClock=0;this.nextId=1;this.lost=false;this.revision=0;
if(saved){this.coins=saved.coins;this.food=saved.food;this.pots=saved.pots;this.time=saved.time;this.cycle=saved.cycle;this.wave=saved.wave;this.kills=saved.kills;this.nextId=saved.nextId;this.roads=new Set(saved.roads);this.buildings=saved.buildings;this.lost=!this.buildings.some(b=>b.type==='hall');this.event('Город восстановлен. Незавершённая волна отменена.');}else this.seed();this.recompute();}
event(text){this.events.push(text);}
seed(){for(let x=7;x<=20;x++)this.roads.add(key(x,13));for(let y=6;y<=16;y++)this.roads.add(key(14,y));for(let x=10;x<=18;x++)this.roads.add(key(x,7));this.add('hall',13,12);this.add('house',9,12);this.add('house',11,12);this.add('house',9,14);this.add('house',11,14);this.add('well',12,14);this.add('market',15,12);this.add('farm',18,12);this.add('tower',12,6);this.add('tree',8,11);this.add('tree',8,15);}
add(type,x,y){const t=TYPES[type];const b={id:this.nextId++,type,x,y,level:1,hp:t.hp,maxHp:t.hp,progress:0,workers:0,cooldown:0};this.buildings.push(b);this.revision++;return b;}
at(x,y){return this.buildings.find(b=>b.x===x&&b.y===y);}
place(type,x,y){if(this.lost)return 'Ратуша разрушена. Начните новый город.';if(x<1||x>=W-1||y<1||y>=H-1)return 'Здесь проходит граница поселения.';const existing=this.at(x,y);
if(type==='demolish'){if(existing?.type==='hall')return 'Ратуша нужна городу.';if(existing){this.coins+=Math.floor(TYPES[existing.type].cost/3);this.buildings=this.buildings.filter(b=>b!==existing);this.revision++;}else if(this.roads.delete(key(x,y)))this.revision++;this.recompute();return null;}
if(existing||this.roads.has(key(x,y)))return 'Эта клетка уже занята.';if(terrain(x,y)==='water')return 'На воде строить нельзя.';if(type==='fish'&&![[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>terrain(x+dx,y+dy)==='water'))return 'Рыбацкому домику нужен берег реки.';if(this.coins<TYPES[type].cost)return 'Не хватает монет.';this.coins-=TYPES[type].cost;if(type==='road'){this.roads.add(key(x,y));this.revision++;}else this.add(type,x,y);this.recompute();return null;}
capacity(b){return b.type==='tower'&&b.level>=2?4:(TYPES[b.type].jobs||0);}
nearRoads(b){return [[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>key(b.x+dx,b.y+dy)).filter(k=>this.roads.has(k));}
bfs(starts){const d=new Map(),q=[];for(const k of starts){d.set(k,0);q.push(k);}for(let i=0;i<q.length;i++){const k=q[i], [x,y]=k.split(',').map(Number);for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const n=key(x+dx,y+dy);if(this.roads.has(n)&&!d.has(n)){d.set(n,d.get(k)+1);q.push(n);}}}return d;}
path(a,b){const goals=new Set(this.nearRoads(b)),starts=this.nearRoads(a).filter(k=>this.connected.has(k)),q=[...starts],parent=new Map(starts.map(k=>[k,null]));for(let i=0;i<q.length;i++){const k=q[i];if(goals.has(k)){const out=[];for(let p=k;p!==null;p=parent.get(p))out.push(p.split(',').map(Number));return out.reverse();}const[x,y]=k.split(',').map(Number);for(const[dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const n=key(x+dx,y+dy);if(this.connected.has(n)&&!parent.has(n)){parent.set(n,k);q.push(n);}}}return [];}
recompute(){
const hall=this.buildings.find(b=>b.type==='hall');this.connected=this.bfs(hall?this.nearRoads(hall):[]);for(const b of this.buildings)b.connected=b.type==='hall'||this.nearRoads(b).some(k=>this.connected.has(k));
const houses=this.buildings.filter(b=>b.type==='house');this.population=0;for(const b of houses){b.residents=b.connected?b.level*4:0;this.population+=b.residents;}
this.workforce=Math.floor(this.population*.5);let available=this.workforce;const jobs=this.buildings.filter(b=>this.capacity(b)>0);this.jobs=jobs.reduce((n,b)=>n+this.capacity(b),0);
for(const b of jobs){const reachable=b.connected&&houses.some(h=>{if(!h.residents)return false;const length=this.path(h,b).length;return length>0&&length<=18;});b.workers=reachable?Math.min(available,this.capacity(b)):0;available-=b.workers;}this.employed=this.workforce-available;
const services=this.buildings.filter(b=>b.connected&&(b.type==='well'||(b.type==='market'&&b.workers>0)));const maps=new Map(services.map(b=>[b.id,this.bfs(this.nearRoads(b))]));const load=new Map();
for(const b of houses){b.needs={road:b.connected,water:false,food:false,pots:false,beauty:this.buildings.some(t=>t.type==='tree'&&dist(t,b)<=3)};if(b.connected){for(const[type,need,range,cap]of [['well','water',8,4],['market','food',10,8]]){const candidates=services.filter(s=>s.type===type).map(s=>({s,d:Math.min(...this.nearRoads(b).map(k=>maps.get(s.id).get(k)??Infinity))})).filter(({s,d})=>d<=range&&(load.get(s.id)||0)<(s.type==='market'?Math.floor(cap*s.workers/this.capacity(s)):cap)).sort((a,b)=>a.d-b.d);if(candidates.length){const s=candidates[0].s;load.set(s.id,(load.get(s.id)||0)+1);b.needs[need]=need==='water'||this.food>0;}}b.needs.pots=this.pots>0;}}
this.serviceLoad=load;}
economy(){this.recompute();let produced=0;for(const b of this.buildings){if(b.type==='farm')produced+=b.workers*2;if(b.type==='fish')produced+=b.workers*2;if(b.type==='pottery')this.pots+=b.workers*.5;}
this.food=Math.min(500,this.food+produced);let income=0;for(const b of this.buildings.filter(b=>b.type==='house')){if(!b.residents)continue;const need=b.needs;if(need.food){if(this.food>=b.residents*.25)this.food-=b.residents*.25;else need.food=false;}const desired=need.water&&need.food?(need.pots&&need.beauty?3:2):1;if(desired>b.level){b.progress++;if(b.progress>=2){b.level++;b.progress=0;this.event('Дом вырос до уровня '+b.level+'!');this.revision++;}}else if(desired<b.level){b.progress--;if(b.progress<=-4){b.level--;b.progress=0;this.revision++;}}else b.progress=0;if(b.level===3)this.pots=Math.max(0,this.pots-.25);income+=b.level*4;}
const hall=this.buildings.find(b=>b.type==='hall');this.coins+=income*(hall?.workers?1:0);this.cycle++;this.recompute();}
startWave(){if(this.waveActive||this.lost)return false;this.wave++;this.waveActive=true;this.spawnLeft=4+this.wave*2;this.spawnClock=0;this.event('Волна '+this.wave+': монстры идут с северной опушки!');return true;}
step(dt){if(this.lost)return;const oldCycle=Math.floor(this.time/12);this.time+=dt;if(Math.floor(this.time/12)>oldCycle)this.economy();
if(this.waveActive){this.spawnClock-=dt;if(this.spawnLeft>0&&this.spawnClock<=0){this.spawnClock=1.8;this.spawnLeft--;const tank=this.wave>=2&&this.spawnLeft%3===0;this.enemies.push({id:this.nextId++,x:10+(this.spawnLeft%8),y:.3,hp:tank?100+this.wave*18:35+this.wave*10,maxHp:tank?100+this.wave*18:35+this.wave*10,speed:tank?.55:.8,tank,cooldown:0});}
for(const tower of this.buildings.filter(b=>b.type==='tower'&&b.connected&&b.workers>0)){tower.cooldown=Math.max(0,tower.cooldown-dt);const range=tower.level===1?5:6.5;const target=this.enemies.filter(e=>e.hp>0&&dist(e,tower)<range).sort((a,b)=>a.y-b.y).at(-1);if(target&&tower.cooldown===0){target.hp-=tower.level===1?15:27;tower.cooldown=(tower.level===1?.85:.65)*this.capacity(tower)/tower.workers;this.onShot?.(tower,target);}}
for(const e of this.enemies){if(e.hp<=0)continue;let target=this.buildings.find(b=>b.id===e.target);if(!target){target=this.buildings.filter(b=>b.type!=='tree').sort((a,b)=>dist(a,e)-dist(b,e))[0];e.target=target?.id;}if(!target)continue;const d=dist(e,target);if(d>.65){e.x+=(target.x-e.x)/d*e.speed*dt;e.y+=(target.y-e.y)/d*e.speed*dt;}else{e.cooldown-=dt;if(e.cooldown<=0){e.cooldown=1;target.hp-=e.tank?22:10;this.onHit?.(target);if(target.hp<=0){this.buildings=this.buildings.filter(b=>b!==target);this.revision++;this.recompute();this.event(TYPES[target.type].name+' разрушен.');if(target.type==='hall'){this.lost=true;this.waveActive=false;this.event('Ратуша пала. Начните заново — город можно построить иначе.');}}}}}
const dead=this.enemies.filter(e=>e.hp<=0);this.kills+=dead.length;this.coins+=dead.length*7;this.enemies=this.enemies.filter(e=>e.hp>0);if(!this.spawnLeft&&!this.enemies.length&&!this.lost){this.waveActive=false;this.coins+=50+this.wave*15;this.event('Волна отражена! Награда '+(50+this.wave*15)+' монет.');}}
}
upgrade(id){const b=this.buildings.find(b=>b.id===id);if(!b||b.type!=='tower'||b.level>=2)return false;if(this.coins<100)return false;this.coins-=100;b.level=2;b.maxHp=420;b.hp=420;this.revision++;this.recompute();return true;}
repair(id){const b=this.buildings.find(b=>b.id===id);if(!b)return false;const cost=Math.ceil((b.maxHp-b.hp)/5);if(this.coins<cost)return false;this.coins-=cost;b.hp=b.maxHp;return true;}
trade(action){if(this.lost||!this.buildings.some(b=>b.type==='hall'&&b.workers>0))return false;if(action==='buy'&&this.coins>=40){this.coins-=40;this.food+=30;return true;}if(action==='sell'&&this.pots>=10){this.pots-=10;this.coins+=65;return true;}return false;}
serialize(){return {version:1,coins:this.coins,food:this.food,pots:this.pots,time:this.time,cycle:this.cycle,wave:this.wave,kills:this.kills,nextId:this.nextId,roads:[...this.roads],buildings:this.buildings.map(b=>({...b}))};}
}
const api={City,TYPES,W,H,key,terrain,riverX};if(typeof module!=='undefined')module.exports=api;else window.TownSim=api;
})();
