const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;
const SO = this.global.SOUNDS;

const MosquitoSapphireBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 40, 45, b.rotation()-90);
        Draw.color();
    } 
});
MosquitoSapphireBullet.speed = 10;
MosquitoSapphireBullet.lifetime = 14;
MosquitoSapphireBullet.damage = 30;
MosquitoSapphireBullet.homingRange = 100;
MosquitoSapphireBullet.homingPower = 0.05;
MosquitoSapphireBullet.splashDamageRadius = 12;
MosquitoSapphireBullet.splashDamage = 16;
MosquitoSapphireBullet.ammoMultiplier = 1.0;
MosquitoSapphireBullet.despawnEffect = E.mosquitoBulletHitEffect;
MosquitoSapphireBullet.hitEffect = E.mosquitoBulletHitEffect;

const MosquitoSiliconBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 48, 60, b.rotation()-90);
        Draw.color();
    } 
});
MosquitoSiliconBullet.speed = 7;
MosquitoSiliconBullet.lifetime = 20;
MosquitoSiliconBullet.damage = 45;
MosquitoSiliconBullet.homingRange = 70;
MosquitoSiliconBullet.homingPower = 0.1;
MosquitoSiliconBullet.splashDamageRadius = 24;
MosquitoSiliconBullet.splashDamage = 25;
MosquitoSiliconBullet.ammoMultiplier = 2.0;
MosquitoSiliconBullet.despawnEffect = E.mosquitoBulletHitEffect;
MosquitoSiliconBullet.hitEffect = E.mosquitoBulletHitEffect;

const Mosquito = extendContent(ItemTurret, "mosquito", {
	shootEffect: E.mosquitoShootEffect,
	smokeEffect: Fx.none,
	health: 1340,
	size: 2,
	reloadTime: 10,
	range: 140,
	ammoUseEffect: Fx.casing2,
	inaccuracy: 5,
	recoilAmount: 1.0,
	rotateSpeed: 4.5,
	category: Category.turret, 
	buildVisibility: BuildVisibility.shown,
	requirements: ItemStack.with(Items.metaglass, 30, F.fi("sapphire"), 45, Items.lead, 60, Items.silicon, 40)
});
Mosquito.ammo(
    Items.silicon, MosquitoSiliconBullet, 
    F.fi("sapphire"), MosquitoSapphireBullet
);

/////////////////////////

const WaspPhotoniteBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 120, 220, b.rotation()-90);
        Draw.color();
    } 
});
WaspPhotoniteBullet.trailChance = 0.5;
WaspPhotoniteBullet.hitSize = 12;
WaspPhotoniteBullet.lifetime = 17;
WaspPhotoniteBullet.speed = 50;
WaspPhotoniteBullet.damage = 1100;
WaspPhotoniteBullet.ammoMultiplier = 8.0;
WaspPhotoniteBullet.despawnEffect = E.waspBulletHitEffect;
WaspPhotoniteBullet.hitEffect = E.waspBulletHitEffect;

const WaspSiliconBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 90, 120, b.rotation()-90);
        Draw.color();
    } 
});
WaspSiliconBullet.trailChance = 0.5;
WaspSiliconBullet.hitSize = 10;
WaspSiliconBullet.lifetime = 850/30;
WaspSiliconBullet.speed = 30;
WaspSiliconBullet.damage = 550;
WaspSiliconBullet.homingRange = 450;
WaspSiliconBullet.homingPower = 5.0;
WaspSiliconBullet.ammoMultiplier = 2.0;
WaspSiliconBullet.despawnEffect = E.waspBulletHitEffect;
WaspSiliconBullet.hitEffect = E.waspBulletHitEffect;

const WaspPlastBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 90, 120, b.rotation()-90);
        Draw.color();
    } 
});
WaspPlastBullet.trailChance = 0.5;
WaspPlastBullet.hitSize = 9;
WaspPlastBullet.lifetime = 850/35;
WaspPlastBullet.speed = 35;
WaspPlastBullet.damage = 450;
WaspPlastBullet.homingRange = 450;
WaspPlastBullet.homingPower = 5.0;
WaspPlastBullet.ammoMultiplier = 3;
WaspPlastBullet.splashDamageRadius = 36;
WaspPlastBullet.splashDamage = 375;
WaspPlastBullet.despawnEffect = E.waspBulletHitEffect;
WaspPlastBullet.hitEffect = E.waspBulletHitEffect;

const WaspSurgeBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 50, 130, b.rotation()-90);
        Draw.color();
    } 
});
WaspSurgeBullet.trailChance = 0.5;
WaspSurgeBullet.hitSize = 10;
WaspSurgeBullet.lifetime = 850/40;
WaspSurgeBullet.speed = 40;
WaspSurgeBullet.damage = 875;
WaspSurgeBullet.ammoMultiplier = 5.0;
WaspSurgeBullet.despawnEffect = E.waspBulletHitEffect;
WaspSurgeBullet.hitEffect = E.waspBulletHitEffect;

const Wasp = extendContent(ItemTurret, "wasp", {
	shootEffect: E.waspShootEffect,
	shootSound: SO.missileFastestFlight, 
	smokeEffect: Fx.none,
	health: 4850,
	size: 4,
	reloadTime: 1800,
	range: 850,
	ammoUseEffect: Fx.casing3,
	buildVisibility: BuildVisibility.shown,
	targetAir: false,
	inaccuracy: 0,
	recoilAmount: 12.0,
	rotateSpeed: 0.5,
	category: Category.turret, 
	requirements: ItemStack.with(Items.metaglass, 250, F.fi("sapphire"), 320, Items.lead, 475, Items.silicon, 280, Items.surgeAlloy, 210, F.fi("cutol"), 160)
});
Wasp.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Wasp, {
	    shoot(type){
	        this.block.tr.trns(this.rotation, this.block.shootLength-6);
	        this.bullet(type, this.rotation);

            this.shotCounter++;

            this.recoil = this.block.recoilAmount;
            this.heat = 1.0;
            this.effects();
            this.useAmmo();
	    }
	});
	return ent;
};
Wasp.ammo(
    Items.silicon, WaspSiliconBullet, 
    F.fi("photonite"), WaspPhotoniteBullet, 
    Items.plastanium, WaspPlastBullet, 
    Items.surgeAlloy, WaspSurgeBullet
);

/////////////////////////

const ExecutionerPhotoniteBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 65, 80, b.rotation()-90);
        Draw.color();
    } 
});
ExecutionerPhotoniteBullet.hitSize = 12;
ExecutionerPhotoniteBullet.homingRange = 350.0;
ExecutionerPhotoniteBullet.homingPower = 0.5;
ExecutionerPhotoniteBullet.speed = 20;
ExecutionerPhotoniteBullet.damage = 185;
ExecutionerPhotoniteBullet.ammoMultiplier = 6.0;
ExecutionerPhotoniteBullet.lifetime = 18;
ExecutionerPhotoniteBullet.despawnEffect = E.executionerBulletHitEffect;
ExecutionerPhotoniteBullet.hitEffect = E.executionerBulletHitEffect;

const ExecutionerSiliconBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 50, 50, b.rotation()-90);
        Draw.color();
    } 
});
ExecutionerSiliconBullet.hitSize = 9;
ExecutionerSiliconBullet.speed = 10;
ExecutionerSiliconBullet.damage = 110;
ExecutionerSiliconBullet.homingRange = 200;
ExecutionerSiliconBullet.homingPower = 0.3;
ExecutionerSiliconBullet.ammoMultiplier = 3.0;
ExecutionerSiliconBullet.lifetime = 20;
ExecutionerSiliconBullet.despawnEffect = E.executionerBulletHitEffect;
ExecutionerSiliconBullet.hitEffect = E.executionerBulletHitEffect;

const ExecutionerPlastBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 55, 60, b.rotation()-90);
        Draw.color();
    } 
});
ExecutionerPlastBullet.hitSize = 8;
ExecutionerPlastBullet.speed = 12;
ExecutionerPlastBullet.damage = 150;
ExecutionerPlastBullet.homingRange = 270;
ExecutionerPlastBullet.homingPower = 0.4;
ExecutionerPlastBullet.ammoMultiplier = 5.0;
ExecutionerPlastBullet.lifetime = 30;
ExecutionerPlastBullet.despawnEffect = E.executionerBulletHitEffect;
ExecutionerPlastBullet.hitEffect = E.executionerBulletHitEffect;

const ExecutionerSurgeBullet = extend(MissileBulletType, {
    draw(b) {
        Draw.color(C.standartSapphire);
        Draw.rect(F.tex("sapphire-bullet1"), b.x, b.y, 50, 60, b.rotation()-90);
        Draw.color();
    } 
});
ExecutionerSurgeBullet.hitSize = 10;
ExecutionerSurgeBullet.speed = 15;
ExecutionerSurgeBullet.damage = 160;
ExecutionerSurgeBullet.ammoMultiplier = 8.0;
ExecutionerSurgeBullet.homingRange = 240;
ExecutionerSurgeBullet.homingPower = 0.5;
ExecutionerSurgeBullet.lifetime = 24;
ExecutionerSurgeBullet.despawnEffect = E.executionerBulletHitEffect;
ExecutionerSurgeBullet.hitEffect = E.executionerBulletHitEffect;

const Executioner = extendContent(ItemTurret, "executioner", {
	category: Category.turret, 
	shootEffect: E.executionerShootEffect,
	smokeEffect: Fx.none,
	health: 9350,
	size: 6,
	reloadTime: 15,
	range: 360,
	inaccuracy: 4,
	recoilAmount: 5.0,
	rotateSpeed: 0.8,
	buildVisibility: BuildVisibility.shown,
	requirements: ItemStack.with(Items.metaglass, 340, F.fi("sapphire"), 480, Items.lead, 840, Items.silicon, 325, Items.surgeAlloy, 225, F.fi("palladium"), 400, F.fi("orbon"), 300), 
    
	load(){
		this.super$load(),
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = F.tex("block-6");
	},
	
	icons(){
		return [
			F.tex("block-6"),
			Core.atlas.find(this.name)
		]
	}
});
Executioner.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Executioner, {
	    shoot(type){
	        var i = Mathf.round(Mathf.signs[this.shotCounter % 2]);
	
	        this.block.tr.trns(this.rotation - 90, 6.5 * i, 20);
	        this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy));

            this.shotCounter++;

            this.recoil = this.block.recoilAmount;
            this.heat = 1.0;
            this.effects();
            this.useAmmo();
	    }
	});
	return ent;
};
Executioner.ammo(
    Items.silicon, ExecutionerSiliconBullet, 
    F.fi("photonite"), ExecutionerPhotoniteBullet, 
    Items.plastanium, ExecutionerPlastBullet, 
    Items.surgeAlloy, ExecutionerSurgeBullet
);

const Sbullets = [
    ExecutionerSiliconBullet, 
    ExecutionerPhotoniteBullet, 
    ExecutionerPlastBullet, 
    ExecutionerSurgeBullet,
    WaspSiliconBullet,
    WaspPlastBullet, 
    WaspSurgeBullet, 
    WaspPhotoniteBullet, 
    MosquitoSiliconBullet, 
    MosquitoSapphireBullet 
];
for(var i = 0; i < Sbullets.length; i++) {
	let b = Sbullets[i];

    b.trailColor = b.hitColor = b.lightColor = C.standartSapphire;
    b.lightRadius = 24.0;
    b.lightOpacity = 0.5;
};

////

F.techNode(Blocks.duo, Mosquito, ItemStack.with(Items.metaglass, 2500, F.fi("sapphire"), 4000, Items.lead, 5000, Items.silicon, 3500));
F.techNode(Mosquito, Wasp, ItemStack.with(Items.metaglass, 24000, F.fi("sapphire"), 30000, Items.lead, 45000, Items.silicon, 25000, Items.surgeAlloy, 18500, F.fi("cutol"), 15000));
F.techNode(Wasp, Executioner, ItemStack.with(Items.metaglass, 52000, F.fi("sapphire"), 65000, Items.lead, 95000, Items.silicon, 44000, Items.surgeAlloy, 28000, F.fi("palladium"), 45000), F.fi("orbon"), 20000);

