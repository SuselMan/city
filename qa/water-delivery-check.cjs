const fs=require('node:fs'),a=require('node:assert/strict'),{City,key}=require('../sim');
const c=new City(null,{legacy:true});c.fireClock=1e9;c.buildings.find(b=>b.type==='hall').level=2;
const carrier=c.add('watercarrier',15,12);c.recompute();a(carrier.workers>0);const homes=c.buildings.filter(h=>h.type==='house'&&h.watercarrierId===carrier.id);a(homes.length);a(homes.every(h=>!h.needs.watercarrier));
let sawFetch=false,sawCargo=false,sawOut=false;
for(let i=0;i<1200;i++){c.step(.1);sawFetch ||= c.waterCarriers.some(w=>w.state==='fetch');sawCargo ||= c.waterCarriers.some(w=>w.water>0);sawOut ||= c.waterCarriers.some(w=>w.state==='out');if(homes.every(h=>h.waterDeliveryUntil>c.time))break;}
a(sawFetch&&sawCargo&&sawOut);a(homes.every(h=>h.waterDeliveryUntil>c.time));c.recompute();a(homes.every(h=>h.needs.watercarrier===1));
const restored=new City(JSON.parse(JSON.stringify(c.serialize())));a.equal(restored.waterCarriers.length,c.waterCarriers.length);a(restored.buildings.some(h=>h.waterDeliveryUntil>restored.time));
for(const w of restored.waterCarriers)w.state='idle';restored.buildings.find(b=>b.id===carrier.id).fire={intensity:1};restored.time+=49;restored.recompute();a(restored.buildings.filter(h=>h.type==='house').every(h=>!h.needs.watercarrier));
fs.writeFileSync('qa/water-delivery-result.json',JSON.stringify({ok:true,physicalWellFetch:true,visibleWaterCargo:true,creditsOnlyAfterArrival:true,allAssignedHomesServed:true,saveRoundtrip:true,deliveryExpires:true},null,2));console.log('water delivery passed');
