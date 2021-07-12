const E = this.global.EFFECTS;
const F = require("func");
const C = this.global.COLORS;
const S = this.global.STATUSES;

const spikeBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.diamond, C.diamondDark, b.fout());
        Drawf.tri(b.x, b.y, 4.0, 8.0, b.data == null ? b.rotation() : b.data[2]); 
        Drawf.tri(b.x, b.y, 4.0, 8.0, b.data == null ? b.rotation()-180 : b.data[2]-180); 
    }, 
    
    update(b) {
        if(this.homingPower > 0.0001 && b.time >= this.homingDelay){
            var target = Units.closestTarget(b.team, b.x, b.y, this.homingRange, boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)), boolf(t => this.collidesGround));
            if(target != null && b.data == null){
                b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), this.homingPower/5 + this.homingPower * 2 * b.fin()));
            } else if(b.data != null) {
            	if(b.data[1] && b.data[0] != null) {
                   b.data[2] = Mathf.slerpDelta(b.data[2], b.angleTo(b.data[0]), 0.05);
               	b.vel.scl(0.988);

                   if(b.data[2] > b.angleTo(b.data[0])-3 && b.data[2] < b.angleTo(b.data[0])+3) {
                   	b.vel.setAngle(b.data[2]);
                   	b.vel.scl(30.0);
                       b.data[1] = false;
		            } 
                }
            } 
        }
    } 
}); 
spikeBullet.damage = 80.0;
spikeBullet.homingPower = 0.15;
spikeBullet.homingRange = 160.0;
spikeBullet.speed = 5.0;
spikeBullet.knockback = 0.6;
spikeBullet.reflectable = false;
spikeBullet.hitEffect = E.spikeHit;
spikeBullet.despawnEffect = E.spikeHit;

spikeBullet.status = StatusEffects.slow;
spikeBullet.statusDuration = 60.0 * 3.0;
spikeBullet.splashDamage = 0.0;
spikeBullet.splashDamageRadius = 10.0;

const RapierPlastanium = extend(ShrapnelBulletType, {});
RapierPlastanium.hitEffect = E.spikeHit;
RapierPlastanium.ammoMultiplier = 3.0;
RapierPlastanium.despawnEffect = Fx.none;

RapierPlastanium.shootEffect = E.rapierShoot;
RapierPlastanium.smokeEffect = E.rapierSmoke;
RapierPlastanium.damage = 340;
RapierPlastanium.length = 140.0;
RapierPlastanium.width = 15.0;

RapierPlastanium.absorbable = false;
RapierPlastanium.reflectable = false;
RapierPlastanium.hittable = false;

RapierPlastanium.serrations = 7;
RapierPlastanium.serrationLenScl = 20.0;
RapierPlastanium.serrationSpacing = 10;
RapierPlastanium.serrationWidth = 6.0;
RapierPlastanium.serrationFadeOffset = 0.8;
RapierPlastanium.serrationSpaceOffset = (140.0 - (140.0/5.0));

RapierPlastanium.fromColor = C.diamond;
RapierPlastanium.toColor = C.diamondDark;

RapierPlastanium.hitSize = 8.0;
RapierPlastanium.hitShake = 4.0;

RapierPlastanium.status = StatusEffects.slow;
RapierPlastanium.statusDuration = 60.0 * 3.0;

const RapierDiamond = extend(ShrapnelBulletType, {});
JsonIO.copy(RapierPlastanium, RapierDiamond);
RapierDiamond.ammoMultipler = 1.0;
RapierDiamond.reloadMultiplier = 2.0;
RapierDiamond.damage = 185;
RapierDiamond.status = S.speedMul.get(8);
RapierDiamond.statusDuration = 60.0 * 1.5;

const angles = [-45, -35, -15, 0, 15, 35, 45];
const scales = [0.6, 0.7, 0.85, 1.0, 0.85, 0.7, 0.6];
const Rapier = extendContent(ItemTurret, "rapier", {});
Rapier.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Rapier, {
        bullet(type, angle){
            this.super$bullet(type, angle);
            
            for(var i = 0; i < 7; i++) Call.createBullet(spikeBullet, this.team, this.x + this.block.tr.x, this.y + this.block.tr.y, angle+angles[i], -1, 1.0 + Mathf.range(this.block.velocityInaccuracy), scales[i]);
        }
	});
	return ent;
};
Rapier.size = 4;
Rapier.reloadTime = 120;
Rapier.range = 160;
Rapier.inaccuracy = 0;
Rapier.recoilAmount = 7.0;
Rapier.restitution = 0.035;
Rapier.shootSound = Sounds.shotgun;
Rapier.shootShake = 3.0;
Rapier.alternate = false;
Rapier.category = Category.turret;
Rapier.buildVisibility = BuildVisibility.shown;
Rapier.ammo(
    Items.plastanium, RapierPlastanium, 
    F.fi("diamond"), RapierDiamond
);
Rapier.requirements = ItemStack.with(F.fi("diamond"), 380, Items.surgeAlloy, 350, Items.silicon, 285, Items.phaseFabric, 240, F.fi("cutol"), 150);

F.techNode(Blocks.duo, Rapier, ItemStack.with(F.fi("diamond"), 45000, Items.surgeAlloy, 40000, Items.silicon, 30000, Items.phaseFabric, 25000, F.fi("cutol"), 18000));

//////////
//////////
//////////

const SpikeCircleOrbonBullet = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.diamond, C.diamondDark, b.fout());
        Fill.circle(b.x, b.y, 5.5);
        
        var v = new Vec2();
        for(var i = 0; i < 5; i++) {
        	v.trns(Time.time + i*72, 5.0);
        	
	        Drawf.tri(b.x + v.x, b.y + v.y, 4.0, 8.0, v.angle()); 
	        Drawf.tri(b.x + v.x, b.y + v.y, 4.0, 8.0, 180 + v.angle()); 
	
	        v.set(0, 0);
        	v.trns(32 + Time.time + i*72, 5.0);
	        Drawf.tri(b.x + v.x, b.y + v.y, 2.5, 6.0, v.angle()); 
	        Drawf.tri(b.x + v.x, b.y + v.y, 2.5, 6.0, v.angle() + 180); 
	    } 
    }, 
    
    despawned(b) {
    	this.despawnEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);
    	
        Effect.shake(this.despawnShake, this.despawnShake, b);
        
        this.hit(b, b.x, b.y);
    }, 
    
    hit(b, x, y) {
    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
        this.hitSound.at(b);

        Effect.shake(this.hitShake, this.hitShake, b);
    
        var spikes = new Seq();
        var target = Units.closestTarget(b.team, b.x, b.y, 120.0, boolf(e => (e.isGrounded() && this.collidesGround) || (e.isFlying() && this.collidesAir)), boolf(t => this.collidesGround));
        
    	var v = new Vec2();
        for(var i = 0; i < 5; i++) {
	        v.trns(i*72, 10.0);
	        
	        Call.createBullet(spikeBullet, b.team, b.x + v.x, b.y + v.y, v.angle(), 160.0, 0.1, 2.5);
	
	        v.set(0, 0);
	        v.trns(36+i*72, 10.0);
	        var sp = spikeBullet.create(null, b.team, b.x + v.x, b.y + v.y, v.angle(), 240.0, 0.05, 6.0, null);
	
	        spikes.add(sp);
	    };
	
	    for(var i = 0; i < spikes.size; i++) {
	        spikes.get(i).data = [target, true, spikes.get(i).rotation()]; 
	    } 
    } 
});
SpikeCircleOrbonBullet.hitEffect = E.circleSpikeHit;
SpikeCircleOrbonBullet.ammoMultiplier = 4.0;
SpikeCircleOrbonBullet.despawnEffect = E.circleSpikeHit;

SpikeCircleOrbonBullet.smokeEffect = E.spikeSmoke;
SpikeCircleOrbonBullet.damage = 1200;
SpikeCircleOrbonBullet.despawnShake = 2.0;
SpikeCircleOrbonBullet.hitShake = 4.5;
SpikeCircleOrbonBullet.speed = 2.5;

SpikeCircleOrbonBullet.absorbable = false;
SpikeCircleOrbonBullet.reflectable = false;
SpikeCircleOrbonBullet.hittable = false;
SpikeCircleOrbonBullet.hitSize = 10.0;

SpikeCircleOrbonBullet.status = S.Petrifaction;
SpikeCircleOrbonBullet.statusDuration = 60.0 * 3.0;

const Spike = extendContent(ItemTurret, "spike", {
	load(){
	    this.super$load();

	    this.baseRegion = F.tex("block-6");
    }, 
	
	icons(){
		return [
			F.tex("block-6"),
			F.tex("spike")
		];
    }
});
Spike.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Spike, {
        shoot(type){
            var i = (this.shotCounter % this.block.shots) - (this.block.shots-1) / 2.0;
            var r = this.shotCounter % 2 == 0 ? -1 : 1;

            this.block.tr.trns(this.rotation - 90, this.block.spread * i + 6 * r , this.block.size * 4 - 2); //just shifted the place of departure of the bullet
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

Spike.shootEffect = E.spikeTurretShoot;
Spike.reloadTime = 100.0;
Spike.size = 6;
Spike.range = 160.0;
Spike.shootShake = 6.5;
Spike.alternate = true;
Spike.inaccuracy = 3;
Spike.recoilAmount = 8.0;
Spike.restitution = 0.04;
Spike.shootSound = Sounds.shotgun;
Spike.shootShake = 2.5;
Spike.category = Category.turret;
Spike.buildVisibility = BuildVisibility.shown;
Spike.ammo(
    F.fi("orbon"), SpikeCircleOrbonBullet
);
Spike.consumes.power(1000.0/60.0);
Spike.consumes.liquid(Liquids.cryofluid, 5.0/60.0);
Spike.requirements = ItemStack.with(F.fi("diamond"), 650, Items.surgeAlloy, 400, Items.silicon, 480, Items.titanium, 450, F.fi("cutol"), 320, F.fi("orbon"), 240, F.fi("palladium"), 350);

F.techNode(Rapier, Spike, ItemStack.with(F.fi("diamond"), 72000, Items.surgeAlloy, 45000, Items.silicon, 54000, Items.titanium, 50000, F.fi("cutol"), 35000, F.fi("orbon"), 27500, F.fi("palladium"), 40000));
