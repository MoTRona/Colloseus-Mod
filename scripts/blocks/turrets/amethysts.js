const C = this.global.COLORS;
const E = this.global.EFFECTS;
const F = require("func");

const RecoursiPlastanimBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight, C.magic, b.fin());
        Drawf.tri(b.x, b.y, 8.0, 8.0, Time.time + (360/b.time) * 6.0); 
    }
});
RecoursiPlastanimBullet.ammoMultiplier = 3.0;
RecoursiPlastanimBullet.reloadMultiplier = 0.9;
RecoursiPlastanimBullet.hitSize = 8;
RecoursiPlastanimBullet.knockback = 2.8;
RecoursiPlastanimBullet.damage = 56;
RecoursiPlastanimBullet.speed = 8.4;
RecoursiPlastanimBullet.lifetime = 30;
RecoursiPlastanimBullet.hitEffect = E.magicBulletHitSmall;
RecoursiPlastanimBullet.despawnEffect = E.magicBulletHitSmall;
RecoursiPlastanimBullet.hitColor = C.magicLight.cpy();
RecoursiPlastanimBullet.shootEffect = E.magicShootEffect;

const RecoursiAmethystBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight, C.magic, b.fin());
        Drawf.tri(b.x, b.y, 5.6, 5.6, Time.time + (360/b.time) * 6.0); 
    }
});
RecoursiAmethystBullet.damage = 36;
RecoursiAmethystBullet.knockback = 1.6;
RecoursiAmethystBullet.hitSize = 6;
RecoursiAmethystBullet.speed = 5.0;
RecoursiAmethystBullet.lifetime = 60;
RecoursiAmethystBullet.hitEffect = E.magicBulletHitSmall;
RecoursiAmethystBullet.despawnEffect = E.magicBulletHitSmall;
RecoursiAmethystBullet.hitColor = C.magicLight.cpy();
RecoursiAmethystBullet.shootEffect = E.magicShootEffect;

const RecoursiTitaniumBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight, C.magic, b.fin());
        Drawf.tri(b.x, b.y, 7.2, 7.2, Time.time + (360/b.time) * 6.0); 
    }
});
RecoursiTitaniumBullet.damage = 42;
RecoursiTitaniumBullet.knockback = 2.0;
RecoursiTitaniumBullet.hitSize = 7;
RecoursiTitaniumBullet.speed = 7.5;
RecoursiTitaniumBullet.lifetime = 35;
RecoursiTitaniumBullet.hitEffect = E.magicBulletHitSmall;
RecoursiTitaniumBullet.despawnEffect = E.magicBulletHitSmall;
RecoursiTitaniumBullet.hitColor = C.magicLight.cpy();
RecoursiTitaniumBullet.shootEffect = E.magicShootEffect;

////////

const ReflectionLaculisFragBullet = extend(LightningBulletType, {
    draw(b) {
        Draw.color(C.magicLight);
        Fill.circle(b.x, b.y, 4.0); 
    }
});
ReflectionLaculisFragBullet.damage = 280;
ReflectionLaculisFragBullet.lightningColor = C.magicLight;
ReflectionLaculisFragBullet.lightningLengthRand = 5;
ReflectionLaculisFragBullet.lightningLength = 10;
ReflectionLaculisFragBullet.hitEffect = E.magicBulletHit;
ReflectionLaculisFragBullet.hitColor = C.magicLight.cpy();
ReflectionLaculisFragBullet.shootEffect = E.magicShootEffect;

const ReflectionLaculisBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight, C.magicDark, b.fin());
        Fill.circle(b.x, b.y, 2.8 + b.fslope()); 
    }, 
    
    hit(b, x, y) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    
    	var v = new Vec2();
        v.trns(Mathf.random(360.0), Mathf.random(40.0, 100.0));
        
        Call.createBullet(ReflectionLaculisFragBullet, b.team, b.x + v.x, b.y + v.y, v.angle() - 180, 60, 1.0, 1.0);
    } 
});
ReflectionLaculisBullet.ammoMultiplier = 4.0;
ReflectionLaculisBullet.damage = 180;
ReflectionLaculisBullet.speed = 5.5;
ReflectionLaculisBullet.lifetime *= 1.2;
ReflectionLaculisBullet.reloadMultiplier = 0.75;
ReflectionLaculisBullet.ammoMultiplier = 2.0;
ReflectionLaculisBullet.hitEffect = E.magicBulletHit;
ReflectionLaculisBullet.despawnEffect = E.magicBulletHit;
ReflectionLaculisBullet.hitColor = C.magicLight.cpy();
ReflectionLaculisBullet.shootEffect = E.magicShootEffectBig;

const ReflectionSurgeFragBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight);
        Fill.circle(b.x, b.y, 3.0); 
    }
});
ReflectionSurgeFragBullet.damage = 180;
ReflectionSurgeFragBullet.speed = 10.0;
ReflectionSurgeFragBullet.lifetime = 20;
ReflectionSurgeFragBullet.hitEffect = E.magicBulletHit;
ReflectionSurgeFragBullet.despawnEffect = E.magicBulletHit;
ReflectionSurgeFragBullet.hitColor = C.magicLight.cpy();
ReflectionSurgeFragBullet.shootEffect = E.magicShootEffect;

const ReflectionSurgeBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight, C.magicDark, b.fin());
        Fill.circle(b.x, b.y, 2.8 + b.fslope()); 
    }, 
    
    hit(b, x, y) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
        
    	var v = new Vec2();
        v.trns(Mathf.random(360.0), Mathf.random(48.0, 120.0));
        
        Call.createBullet(ReflectionSurgeFragBullet, b.team, b.x + v.x, b.y + v.y, v.angle() - 180, 70, 1.0, 1.0);
    } 
});
ReflectionSurgeBullet.ammoMultiplier = 4.0;
ReflectionSurgeBullet.damage = 120;
ReflectionSurgeBullet.speed = 7.0;
ReflectionSurgeBullet.hitEffect = E.magicBulletHit;
ReflectionSurgeBullet.despawnEffect = E.magicBulletHit;
ReflectionSurgeBullet.hitColor = C.magicLight.cpy();
ReflectionSurgeBullet.shootEffect = E.magicShootEffectBig;

const ReflectionPhotoniteFragBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight);
        Fill.circle(b.x, b.y, 2.4); 
    }
});
ReflectionPhotoniteFragBullet.damage = 220;
ReflectionPhotoniteFragBullet.speed = 12.5;
ReflectionPhotoniteFragBullet.lifetime = 15;
ReflectionPhotoniteFragBullet.hitEffect = E.magicBulletHitSmall;
ReflectionPhotoniteFragBullet.despawnEffect = E.magicBulletHitSmall;
ReflectionPhotoniteFragBullet.hitColor = C.magicLight.cpy();
ReflectionPhotoniteFragBullet.shootEffect = E.magicShootEffect;

const ReflectionPhotoniteBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight, C.magicDark, b.fin());
        Fill.circle(b.x, b.y, 2.8 + b.fslope()); 
    }, 
    
    hit(b, x, y) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    
    	var v = new Vec2();
        for(var i = 0; i < 2; i++){
	        v.trns(Mathf.random(360.0), Mathf.random(80.0, 180.0));
	        
	        Call.createBullet(ReflectionPhotoniteFragBullet, b.team, b.x + v.x, b.y + v.y, v.angle() - 180, 60, 1.0, 1.0);
	     } 
    } 
});
ReflectionPhotoniteBullet.damage = 180;
ReflectionPhotoniteBullet.speed = 5.5;
ReflectionPhotoniteBullet.lifetime *= 1.2;
ReflectionPhotoniteBullet.reloadMultiplier = 0.75;
ReflectionPhotoniteBullet.ammoMultiplier = 2.0;
ReflectionPhotoniteBullet.hitEffect = E.magicBulletHit;
ReflectionPhotoniteBullet.despawnEffect = E.magicBulletHit;
ReflectionPhotoniteBullet.hitColor = C.magicLight.cpy();
ReflectionPhotoniteBullet.shootEffect = E.magicShootEffectBig;
ReflectionPhotoniteBullet.ammoMultiplier = 3.0;

////////////////

const MirrorAmethystBullet = extend(BasicBulletType, {
    update(b) {
    	b.vel.scl(1.03);
    } 
});
MirrorAmethystBullet.damage = 40;
MirrorAmethystBullet.speed = 0.625;
MirrorAmethystBullet.lifetime = 70;
MirrorAmethystBullet.homingPower = 1.0;
MirrorAmethystBullet.homingRange = 24.0;
MirrorAmethystBullet.frontColor = C.magicLight.cpy();
MirrorAmethystBullet.backColor = C.magicLight.cpy();
MirrorAmethystBullet.width = 8;
MirrorAmethystBullet.height = 8;
MirrorAmethystBullet.hitEffect = E.magicBulletHitSmall;
MirrorAmethystBullet.despawnEffect = E.magicBulletHitSmall;
MirrorAmethystBullet.hitColor = C.magicLight.cpy();
MirrorAmethystBullet.shootEffect = E.magicShootEffectSmall;

const Mirror = extendContent(ItemTurret, "mirror", {});
Mirror.size = 2;
Mirror.range = 155.0;
Mirror.reloadTime = 10;
Mirror.inaccuracy = 3;
Mirror.shootSound = Sounds.sap;
Mirror.requirements = ItemStack.with(F.fi("amethyst"), 120, Items.graphite, 90, Items.lead, 150);
Mirror.category = Category.turret;
Mirror.buildVisibility = BuildVisibility.shown;
Mirror.ammo(
    F.fi("amethyst"), MirrorAmethystBullet
);

const Recours = extendContent(ItemTurret, "recoursi", {});
Recours.size = 4;
Recours.reloadTime = 3;
Recours.range = 260;
Recours.inaccuracy = 0;
Recours.shootSound = Sounds.sap;
Recours.ammo(
    Items.plastanium, RecoursiPlastanimBullet, 
    F.fi("amethyst"), RecoursiAmethystBullet, 
    Items.titanium, RecoursiTitaniumBullet
);
Recours.requirements = ItemStack.with(F.fi("amethyst"), 260, F.fi("cutol"), 160, Items.silicon, 300, Items.plastanium, 140, Items.thorium, 235);
Recours.category = Category.turret;
Recours.buildVisibility = BuildVisibility.shown;

/////////////

const Reflection = extendContent(ItemTurret, "reflection", {
	load(){
	    this.super$load();

	    this.baseRegion = F.tex("block-6");
    }, 
	
	generateIcons: function(){
		return [
			F.tex("block-6"),
			F.tex("reflection")
		];
    }
});

Reflection.shots = 3;
Reflection.size = 6;
Reflection.reloadTime = 45;
Reflection.range = 320;
Reflection.inaccuracy = 0;
Reflection.velocityInaccuracy = 0.1;
Reflection.velocityRnd = 0.1;
Reflection.rotatespeed = 1.6;
Reflection.shootSound = Sounds.missile;
Reflection.category = Category.turret;
Reflection.ammo(
    Items.surgeAlloy, ReflectionSurgeBullet, 
    F.fi("photonite"), ReflectionPhotoniteBullet,
    F.fi("laculis"), ReflectionLaculisBullet
);
Reflection.requirements = ItemStack.with(F.fi("amethyst"), 610, F.fi("palladium"), 400, Items.silicon, 525, Items.surgeAlloy, 360, F.fi("orbon"), 180, F.fi("cutol"), 285, F.fi("photonite"), 350);
Reflection.buildVisibility = BuildVisibility.shown;

//////
//////
//////

const DecomposerLaculisBullet = extend(BasicBulletType, {
    draw(b) {
        Tmp.c1.set(C.magic.cpy().mul(1.2)).lerp(C.magicLight, b.fin());
        
    	b.data.draw(Tmp.c1, 2.0);
    }, 
    
    update(b) {
        if(this.homingPower > 0.0001 && b.time >= this.homingDelay){
            var target = Units.closestTarget(b.team, b.x, b.y, this.homingRange, boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)), boolf(t => this.collidesGround));
            if(target != null){
                b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), this.homingPower/5 + this.homingPower * 2 * b.fin()));
            }
        };
    
        var tx = Angles.trnsx(b.rotation, 0.0, 0.0) + b.x;
        var ty = Angles.trnsy(b.rotation, 0.0, 0.0) + b.y;
        b.data.update(tx, ty);
            
    	b.vel.scl(1.01);
    }, 
    
    despawned(b) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    
    	b.data = null;
    }, 
    
    hit(b, x, y) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    	//140 - урон
    	Lightning.create(b, C.magicLight, 140, b.x, b.y, b.rotation(), 15.0 + Mathf.random(10.0));
    	var target = Units.closestTarget(b.team, b.x, b.y, 40);
        
        if(target != null) {
        	var name = "";
        	var rot = 0;
            if(target instanceof Building) {
            	name = target.block.name
        	    rot = 0;
            } else if(target instanceof Unitc) {
            	name = target.type.name
        	    rot = 90;
            } else {
            	name = target.name;
        	    rot = 0;
            };
        
	        E.magicUnitDamage.at(target.x, target.y, target.rotation, [name, rot]);
	    } 
    } 
});
DecomposerLaculisBullet.damage = 215;
DecomposerLaculisBullet.knockback = 8.4;
DecomposerLaculisBullet.speed = 5.0;
DecomposerLaculisBullet.lifetime = 50;
DecomposerLaculisBullet.ammoMultiplier = 3.0;
DecomposerLaculisBullet.drawSize = 900;
DecomposerLaculisBullet.homingPower = 0.2;
DecomposerLaculisBullet.homingRange = 480.0;

DecomposerLaculisBullet.hitEffect = E.magicBulletHitBig;
DecomposerLaculisBullet.despawnEffect = E.magicBulletHitBig;
DecomposerLaculisBullet.hitColor = C.magicLight.cpy().mul(1.2);
DecomposerLaculisBullet.shootEffect = E.magicShootEffectBig;

const DecomposerContritumBullet = extend(BasicBulletType, {
    draw(b) {
        Tmp.c1.set(C.magic.cpy().mul(1.2)).lerp(C.magicLight, b.fin());
        
    	b.data.draw(Tmp.c1, 2.0);
    }, 
    
    update(b) {
        if(this.homingPower > 0.0001 && b.time >= this.homingDelay){
            var target = Units.closestTarget(b.team, b.x, b.y, this.homingRange, boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)), boolf(t => this.collidesGround));
            if(target != null){
                b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), this.homingPower/5 + this.homingPower * 2 * b.fin()));
            }
        };
    
        var tx = Angles.trnsx(b.rotation, 0.0, 0.0) + b.x;
        var ty = Angles.trnsy(b.rotation, 0.0, 0.0) + b.y;
        b.data.update(tx, ty);
            
    	b.vel.scl(1.01);
    }, 
    
    despawned(b) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    
    	b.data = null;
    }, 
    
    hit(b, x, y) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    	//200 - урон
    	Lightning.create(b, C.magicLight, 200, b.x, b.y, b.rotation(), 15.0 + Mathf.random(10.0));
    	var target = Units.closestTarget(b.team, b.x, b.y, 40);
        
        if(target != null) {
        	var name = "";
        	var rot = 0;
            if(target instanceof Building) {
            	name = target.block.name
        	    rot = 0;
            } else if(target instanceof Unitc) {
            	name = target.type.name
        	    rot = 90;
            } else {
            	name = target.name;
        	    rot = 0;
            };
        
	        E.magicUnitDamage.at(target.x, target.y, target.rotation, [name, rot]);
	     } 
    } 
});
DecomposerContritumBullet.damage = 260;
DecomposerContritumBullet.knockback = 10.2;
DecomposerContritumBullet.speed = 6.0;
DecomposerContritumBullet.lifetime = 50;
DecomposerContritumBullet.ammoMultiplier = 5.0;
DecomposerContritumBullet.drawSize = 900;
DecomposerContritumBullet.homingPower = 0.1;
DecomposerContritumBullet.homingRange = 480.0;

DecomposerContritumBullet.hitEffect = E.magicBulletHitBig;
DecomposerContritumBullet.despawnEffect = E.magicBulletHitBig;
DecomposerContritumBullet.hitColor = C.magicLight.cpy().mul(1.2);
DecomposerContritumBullet.shootEffect = E.magicShootEffectBig;

const Decomposer = extendContent(ItemTurret, "decomposer", {
	load(){
	    this.super$load();

	    this.baseRegion = F.tex("block-8");
    }, 
	
	generateIcons: function(){
		return [
			F.tex("block-8"),
			F.tex("decomposer")
		];
    }
});
Decomposer.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Decomposer, {
        bullet(type, angle){
            var lifeScl = type.scaleVelocity ? Mathf.clamp(Mathf.dst(this.x + this.block.tr.x, this.y + this.block.tr.y, this.targetPos.x, this.targetPos.y) / type.range(), this.block.minRange / type.range(), this.block.range / type.range()) : 1.0;

            var bu = type.create(this, this.team, this.x + this.block.tr.x, this.y + this.block.tr.y, angle, 1.0 + Mathf.range(this.block.velocityInaccuracy), lifeScl);
            bu.data = new Trail(5);
        }
	});
	return ent;
};
Decomposer.shots = 3;
Decomposer.size = 8;
Decomposer.reloadTime = 20;
Decomposer.range = 480;
Decomposer.inaccuracy = 20;
Decomposer.velocityInaccuracy = 0.2;
Decomposer.rotatespeed = 0.7;
Decomposer.shootSound = Sounds.missile;
Decomposer.category = Category.turret;
Decomposer.ammo(
    F.fi("laculis"), DecomposerLaculisBullet, 
    F.fi("contritum"), DecomposerContritumBullet
);
Decomposer.requirements = ItemStack.with(F.fi("amethyst"), 1250, F.fi("meteorite"), 800, Items.silicon, 750, Items.thorium, 925, F.fi("contritum"), 450, F.fi("laculis"), 650, F.fi("photonite"), 900);
Decomposer.buildVisibility = BuildVisibility.shown; 

//////////
//////////
//////////

F.techNode(Blocks.duo, Mirror, ItemStack.with(F.fi("amethyst"), 15000, Items.graphite, 10000, Items.lead, 18000));
F.techNode(Mirror, Recours, ItemStack.with(F.fi("amethyst"), 30000, F.fi("cutol"), 20000, Items.silicon, 35000, Items.plastanium, 16000, Items.thorium, 25000));
F.techNode(Recours, Reflection, ItemStack.with(F.fi("amethyst"), 70000, F.fi("palladium"), 45000, Items.silicon, 55000, Items.surgeAlloy, 40000, F.fi("orbon"), 20000, F.fi("cutol"), 30000, F.fi("photonite"), 40000));
F.techNode(Reflection, Decomposer, ItemStack.with(F.fi("amethyst"), 150000, F.fi("meteorite"), 90000, Items.silicon, 80000, Items.thorium, 97500, F.fi("contritum"), 50000, F.fi("laculis"), 70000, F.fi("photonite"), 100000));
