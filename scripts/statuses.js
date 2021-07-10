const F = require("func");
const S = this.global.STATUSES;
const C = this.global.COLORS;
const E = this.global.EFFECTS;

const s = name => {
	const eff = extendContent(StatusEffect, name, {});
    return eff;
};

const statusArray = (amount, value, startValue, name) => {
	var seq = new Seq();

    for(var i = 0; i < amount; i++) {
    	try{
	    	const val = startValue + value * ( i + 1.0);
	        const n = String(name+(i+1));
	    
			const e = extendContent(StatusEffect, n, {});
			e.speedMultiplier = name == "speedMul" ? val : 1.0;
			e.damageMultiplier = name == "damageMul" ? val : 1.0;
			e.armorMultiplier = name == "armorMul" ? val : 1.0;
			e.damage = name == "damage" ? val : 0.0;
			
			seq.add(e); 
		} catch(e) {
			print(e) 
		} 
	};
	
	return seq;
};

S.speedMul = statusArray(30, 0.1, 0.0, "speedMul");
S.damageMul = statusArray(30, 0.1, 0.0, "damageMul");
S.damage = statusArray(30, 0.1, 0.0, "damage");
S.armorMul = statusArray(30, 0.1, 0.0, "armorMul");


//custom slow = 0.4
const Slower = extendContent(StatusEffect, "slower", {
	speedMultiplier: 0.8, 
	color: Pal.lightishGray
});
S.Slower = Slower;

const Slowest = extendContent(StatusEffect, "slowest", {
	speedMultiplier: 0.15, 
	color: Color.valueOf("#706F74")
});
S.Slowest = Slowest;




const burningIntensive = extendContent(StatusEffect, "burning-intensive", {});
burningIntensive.damageMultiplier = 0.8;
burningIntensive.damage = 1.1;
burningIntensive.speedMultiplier = 0.9;
burningIntensive.armorMultiplier = 0.8;
burningIntensive.color = C.unitOrangeLight;
burningIntensive.effect = E.burningIntensiveEffect;
burningIntensive.init(run(() => {
	burningIntensive.opposite(StatusEffects.freezing, StatusEffects.wet);
	burningIntensive.trans(StatusEffects.melting, ((unit, time, newTime, result) => {
		unit.damagePierce(4.0);
		result.set(burningIntensive, Math.min(time + newTime, 360.0));
	}));
	burningIntensive.trans(StatusEffects.tarred, ((unit, time, newTime, result) => {
		unit.damagePierce(2.5);
		result.set(burningIntensive, Math.min(time + newTime, 360.0));
	}))
}));

S.burningIntensive = burningIntensive;




const burningIntensiver = extendContent(StatusEffect, "burning-intensiver", {});
burningIntensiver.damageMultiplier = 0.65;
burningIntensiver.damage = 1.3;
burningIntensiver.speedMultiplier = 0.8;
burningIntensiver.armorMultiplier = 0.7;
burningIntensiver.color = C.unitOrangeLight;
burningIntensiver.effect = E.burningIntensiverEffect;
burningIntensiver.init(run(() => {
	burningIntensiver.opposite(StatusEffects.freezing, StatusEffects.wet);
	burningIntensiver.trans(StatusEffects.melting, ((unit, time, newTime, result) => {
		unit.damagePierce(6.5);
		result.set(burningIntensiver, Math.min(time + newTime, 420.0));
	}));
	burningIntensiver.trans(StatusEffects.tarred, ((unit, time, newTime, result) => {
		unit.damagePierce(4.0);
		result.set(burningIntensiver, Math.min(time + newTime, 420.0));
	}))
	burningIntensiver.trans(burningIntensive, ((unit, time, newTime, result) => {
		unit.damagePierce(10.0);
		result.set(burningIntensiver, Math.min(time + newTime, 420.0));
	}))
}));

S.burningIntensiver = burningIntensiver;



const curse = extendContent(StatusEffect, "curse", {});
curse.damageMultiplier = 0.8;
curse.damage = 300.0/60.0;
curse.speedMultiplier = 0.75;
curse.armorMultiplier = 0.5;
curse.color = Pal.lightFlame;
curse.effect = Fx.burning;
curse.init(run(() => {
	curse.opposite(StatusEffects.freezing, StatusEffects.wet);
	curse.trans(StatusEffects.melting, ((unit, time, newTime, result) => {
		unit.damagePierce(8.0);
		result.set(curse, Math.min(time + newTime, 600.0));
	}));
	curse.trans(StatusEffects.tarred, ((unit, time, newTime, result) => {
		unit.damagePierce(5.0);
		result.set(curse, Math.min(time + newTime, 600.0));
	}));
	curse.trans(burningIntensive, ((unit, time, newTime, result) => {
		unit.damagePierce(16.0);
		result.set(curse, Math.min(time + newTime, 600.0));
	}))
	curse.trans(burningIntensiver, ((unit, time, newTime, result) => {
		unit.damagePierce(24.0);
		result.set(curse, Math.min(time + newTime, 600.0));
	}))
}));

S.curse = curse;

