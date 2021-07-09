//Totally import system
const F = require("func");
const C = this.global.COLORS;
const S = this.global.STATUSES;
const SO = this.global.SOUNDS;
const E = this.global.EFFECTS;

////
////
//// 
  
const DischargeBullet = extend(BasicBulletType, {
    update(b){
        Lightning.create(b, F.fi("topaz").color, 30.0, b.x, b.y, Mathf.random(360.0), 3.0 + Mathf.random(2.0));
        
        var build = Vars.world.build(b.x, b.y);
        if(build instanceof Wall && build.block.insulated) b.absorb();
    }
});
DischargeBullet.hitEffect = E.hitMovingLaser;
DischargeBullet.despawnEffect = Fx.none;
DischargeBullet.pierce = false;
DischargeBullet.hittable = false;
DischargeBullet.absorbable = true
DischargeBullet.reflectable = false;
DischargeBullet.damage = 60;
DischargeBullet.speed = 3.0;
DischargeBullet.lifetime = 90;
DischargeBullet.hitSize = 14;
DischargeBullet.width = 15;
DischargeBullet.height = 15;

DischargeBullet.hitColor = F.fi("topaz").color;
DischargeBullet.frontColor = F.fi("topaz").color;
DischargeBullet.backColor = F.fi("topaz").color.cpy().mul(0.8);
 
const Discharge = extendContent(PowerTurret, "discharge", {});
Discharge.shootType = DischargeBullet;
Discharge.shootSound = Sounds.railgun;
Discharge.shootEffect = E.dischargeShoot;
Discharge.powerUse = 800.0/60.0;
Discharge.reloadTime = 60.0;
Discharge.ammoUseEffect = Fx.none;
Discharge.recoilAmount = 4.0;
Discharge.restitution = 0.03;
Discharge.range = 180.0;
Discharge.size = 3;
Discharge.category = Category.turret;
Discharge.buildVisibility = BuildVisibility.shown;
Discharge.requirements = ItemStack.with(F.fi("topaz"), 120, Items.silicon, 80, Items.metaglass, 100, Items.titanium, 100);
  
  /////
  /////
  /////
  
const MovingLaser = extend(BasicBulletType, {
    draw(b) {
    	if(b.data == null) return;
    
    	var Beams = b.data[2];
        var alpha = Mathf.clamp(b.time > this.lifetime - 20.0 ? 1.0 - (b.time - (this.lifetime - 20.0)) / 2.0 : 1.0);
    
        for(var i = 0; i < Beams.length; i++) {
            var Beam = Beams[i];
            
            Draw.color(F.fi("topaz").color);
            Draw.alpha((i == 0 || i == Beams.length - 1) ? ((i == Beams.length - 1) ? (Beams[0][4][0]) : (Beams[Beams.length-1][4][1])) : alpha);
            
            Lines.stroke(3.0);
        	Lines.line(Beam[0], Beam[1], Beam[2], Beam[3]);
            Lines.stroke(1.0);
            Draw.alpha(1.0);
            Draw.color();
        } 
    },
 
    update(b){
    	if(b.data == null) return;
    
    	const Beams = b.data[2];
        const PredBeam = Beams[Beams.length - 1];
    
        if(Beams[0][4][1] > 0.21); Beams[0][4][1] -= 0.2 * Time.delta;
        if(Beams[Beams.length-1][4][0] < 0.98); Beams[Beams.length-1][4][0] += 0.2 * Time.delta;
        
    	if(b.data == null) return;
    	if(b.timer.get(1) && b.data[1] > Beams.length * 32.0 && b.data[6]) {
    	    var v = new Vec2();
            
            var realLength = this.findLaserLength(b, 32.0, v);
            v.trns(b.rotation() + Mathf.range(20.0), realLength);
             
            E.movingLaserOnExtend.at(PredBeam[2], PredBeam[3], Angles.angle(PredBeam[2], PredBeam[3], PredBeam[2] + v.x, PredBeam[3] + v.y));
            Beams.push([PredBeam[2], PredBeam[3], PredBeam[2] + v.x, PredBeam[3] + v.y, [0.0, 1.0]]);
            if(realLength < 32.0) b.data[6] = false;
        };
        
        for(var i = 0; i < Beams.length; i++) { 
            var Beam = Beams[i];
            
	    	Damage.collideLine(b, b.team, Fx.none, Beam[0], Beam[1], Angles.angle(Beam[0], Beam[1], Beam[2], Beam[3]), 24.0);
        }
    },

    findLaserLength(b, length, v){
        var PredBeam = b.data[2][b.data[2].length - 1];
        
        Tmp.v1.trns(Angles.angle(PredBeam[2], PredBeam[3], PredBeam[2] + v.x, PredBeam[3] + v.y), length);

        var furthest = null;

        var found = Vars.world.raycast(
            World.toTile(PredBeam[2]), 
            World.toTile(PredBeam[3]), 
            World.toTile(PredBeam[2] + v.x), 
            World.toTile(PredBeam[3] + v.y), 
            new Geometry.Raycaster({accept: (x, y) => {
                furthest = Vars.world.build(x, y);
                
                if(furthest != null && furthest.team != b.team && (furthest.block.absorbLasers || furthest.block.insulated)) return true;
                return false;
            }}) 
        );

        return found && furthest != null ? Math.max(6.0, Mathf.dst(PredBeam[2], PredBeam[3], furthest.tile.worldx(), furthest.tile.worldy())) : length;
    },
    
    despawned(b) {
        this.hitSound.at(b);
    
    	b.data = null;
    } 
});

MovingLaser.hitColor = F.fi("topaz").color;
MovingLaser.hitEffect = E.hitMovingLaser;
MovingLaser.despawnEffect = Fx.none;
MovingLaser.pierce = false;
MovingLaser.hittable = false;
MovingLaser.absorbable = false;
MovingLaser.reflectable = false;
MovingLaser.damage = 32;
MovingLaser.speed = 4.8;
MovingLaser.lifetime = 70;
MovingLaser.drawSize = 1500;
 
 const Thunder = extendContent(PowerTurret, "thunder", {
	load(){
		this.super$load();
		
		this.region = F.tex("thunder");
		this.baseRegion = F.tex("block-5");
	},
	
	icons(){
		return [
			F.tex("block-5"),
			F.tex("thunder")
		];
    }
});
Thunder.buildType = () => {
	const ent = extendContent(PowerTurret.PowerTurretBuild, Thunder, {
        bullet(type, angle){
            var bx = this.x + this.block.tr.x;
            var by = this.y + this.block.tr.y;
            
            var lifeScl = type.scaleVelocity ? Mathf.clamp(Mathf.dst(bx, by, this.targetPos.x, this.targetPos.y) / type.range(), this.block.minRange / type.range(), this.blck.range / type.range()) : 1.0;
            var length = 28;
            
            var bu = type.create(this, this.team, bx, by, angle, 1.0 + Mathf.range(this.block.velocityInaccuracy), lifeScl);
            
            var v = new Vec2();
            v.trns(angle, length);
            
            var bx2 = bx + v.x;
            var by2 = by + v.y;
            
            bu.data = [angle, 360.0, [[bx, by, bx2, by2, [0.0, 1.0]]], length, bx, by, true];
        }
	});
	return ent;
};
Thunder.shootType = MovingLaser;
Thunder.shootSound = SO.movingLaser;
Thunder.shootEffect = E.thunderShoot;
Thunder.powerUse = 20;
Thunder.reloadTime = 90.0;
Thunder.restitution = 0.01; 
Thunder.ammoUseEffect = Fx.none;
Thunder.recoilAmount = 6.0;
Thunder.range = 360;
Thunder.size = 5;
Thunder.buildCostMultiplier = 0.8;
Thunder.powerUse = 3000.0/60.0;
Thunder.category = Category.turret;
Thunder.buildVisibility = BuildVisibility.shown;
Thunder.requirements = ItemStack.with(F.fi("topaz"), 400, Items.silicon, 325, F.fi("cutol"), 150, F.fi("lux"), 240, Items.surgeAlloy, 340, Items.phaseFabric, 180);
 
////
////
////

const SunAbsorberLaser = extend(ContinuousLaserBulletType, {
	update: function(b){

		Effect.shake(5.0, 5.0, b.x, b.y);
        
        for(var i = 0; i < 2; i++) {
	        var v = new Vec2();
	        v.trns(b.rotation(), Mathf.random(25.0, 510.0));
	
	        var rot = Mathf.random(1.0) >= 0.5 ? 45 : -45;
	        Lightning.create(b.team, C.energy, 75, b.x + v.x, b.y + v.y, b.rotation()+(rot), Mathf.random(5, 10));
        };

        if(b.timer.get(1, 8)){
            E.YellowBeamFlare.at(b.x, b.y, b.rotation());
            E.YellowBeamFlare2.at(b.x, b.y, b.rotation()); 
            E.YellowBeamFlare3.at(b.x, b.y, b.rotation()); 
            
            Damage.collideLine(b, b.team, this.hitEffect, b.x, b.y, b.rotation(), 930.0, true);
        }
	}, 

    draw(b){
        var fout = Mathf.clamp(b.time > b.lifetime - this.fadeTime ? 1.0 - (b.time - (this.lifetime - this.fadeTime)) / this.fadeTime : 1.0);
        var baseLen = /*realLength*/ this.length * fout;

        Lines.lineAngle(b.x, b.y, b.rotation(), baseLen);
        for(var s = 0; s < this.colors.length; s++){
            Draw.color(Tmp.c1.set(this.colors[s]).mul(1.0 + Mathf.absin(Time.time, 1.0, 0.1)));
            for(var i = 0; i < this.tscales.length; i++){
                Tmp.v1.trns(b.rotation() + 180.0, (this.lenscales[i] - 1.0) * 35.0);
                Lines.stroke((this.width + Mathf.absin(Time.time, this.oscScl, this.oscMag)) * fout * this.strokes[s] * this.tscales[i]);
                Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rotation(), baseLen * this.lenscales[i], false);
            }
        };

        Tmp.v1.trns(b.rotation(), baseLen * 1.1);

        Drawf.light(b.team, b.x, b.y, b.x + Tmp.v1.x, b.y + Tmp.v1.y, 40, this.lightColor, 0.7);
        Draw.reset();
    } 
});

SunAbsorberLaser.oscScl = 1.2;
SunAbsorberLaser.oscMag = 0.8;
SunAbsorberLaser.length = 600.0;
SunAbsorberLaser.width = 18.0;
SunAbsorberLaser.colors = [Color.valueOf("FFE93D44"), Color.valueOf("FFE93D66"), Color.valueOf("FFF43D99"), Color.white];
SunAbsorberLaser.strokes = [1.0, 0.85, 0.7, 0.5];
SunAbsorberLaser.tscales = [1.4, 1.1, 0.9, 0.55];
SunAbsorberLaser.lenscales = [0.8, 0.92, 0.98, 1.01];
SunAbsorberLaser.damage = 1200;
SunAbsorberLaser.hitEffect = Fx.hitMeltdown;
SunAbsorberLaser.despawnEffect = Fx.none;
SunAbsorberLaser.hitSize = 18.0;
SunAbsorberLaser.drawSize = 700; //570+130
SunAbsorberLaser.shootEffect = Fx.none;
SunAbsorberLaser.smokeEffect = Fx.none;
SunAbsorberLaser.hittable = false;
SunAbsorberLaser.absorbable = false
SunAbsorberLaser.reflectable = false;

const SunAbsorber = extend(LaserTurret, "absorber", {
	load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("collos-block-" + this.size);
	},
	
	generateIcons: function(){
		return [
			Core.atlas.find("collos-block-" + this.size),
			Core.atlas.find(this.name)
		];
    }
});
SunAbsorber.buildType = () => {
	const ent = extendContent(LaserTurret.LaserTurretBuild, SunAbsorber, {
        shoot(type){
            this.useAmmo();

            this.block.tr.trns(this.rotation, this.block.shootLength);
            this.block.chargeBeginEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation);
            this.block.chargeSound.at(this.x + this.block.tr.x, this.y + this.block.tr.y, 1);

            let c = 0
            for(let i = 0; i < this.block.chargeEffects; i++){
                Time.run(300-14*c, () => {
                    if(!this.isValid()) return;
                    this.block.tr.trns(this.rotation, this.block.shootLength);
                    this.block.chargeEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation);
                });
                
                if(c != this.block.chargeEffects) c++
            };

            this.charging = true;

            Time.run(300, () => {
                if(!this.isValid()) return;
                this.block.tr.trns(this.rotation, this.block.shootLength);
                this.recoil = this.block.recoilAmount;
                this.heat = 1.0;
                this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy));
                this.effects();
                this.charging = false
            })
        }
	});
	return ent;
};
SunAbsorber.buildVisibility = BuildVisibility.shown;
SunAbsorber.shootType = SunAbsorberLaser;
SunAbsorber.update = true;
SunAbsorber.size = 8;
SunAbsorber.reloadTime = 1200;

SunAbsorber.chargeEffects = 20;
SunAbsorber.chargeBeginEffect = E.YellowBeamChargeBegin;
SunAbsorber.chargeEffect = E.YellowBeamCharge;

SunAbsorber.coolantMultiplier = 2.0;
SunAbsorber.shootDuration = 600;
SunAbsorber.firingMoveFract = 0.0;
SunAbsorber.hasPower = true;
SunAbsorber.hasLiquids = true;
SunAbsorber.range = 570;
SunAbsorber.ammoUseEffect = Fx.none;
SunAbsorber.rotateSpeed = 0.4;
SunAbsorber.recoilAmount = 5.0;
SunAbsorber.restitution = 0.005;
SunAbsorber.powerUse = 225;
SunAbsorber.buildCostMultiplier = 0.3;
SunAbsorber.consumes.liquid(F.fl("helium-liquid"), 0.5);
SunAbsorber.category = Category.turret;
SunAbsorber.requirements = ItemStack.with(F.fi("topaz"), 740, F.fi("laculis"), 460, F.fi("lux"), 640, F.fi("meteorite"), 520, Items.silicon, 550, Items.phaseFabric, 350, Items.surgeAlloy, 465, F.fi("contritum"), 540);

SunAbsorber.activeSound = SO.beamLaser;
SunAbsorber.activeSoundVolume = 3.0;
SunAbsorber.shootSound = SO.beamShoot;
SunAbsorber.shootShake = 5.0;

////////
///////

F.techNode(Blocks.duo, Discharge, ItemStack.with(F.fi("topaz"), 15000, Items.silicon, 10000, Items.metaglass, 12000, Items.titanium, 12000));
F.techNode(Discharge, Thunder, ItemStack.with(F.fi("topaz"), 45000, Items.silicon, 30000, F.fi("cutol"), 25000, F.fi("lux"), 25000, Items.surgeAlloy, 37500, Items.phaseFabric, 22000));
F.techNode(Thunder, SunAbsorber, ItemStack.with(F.fi("topaz"), 115000, F.fi("laculis"), 56000, F.fi("lux"), 65000, F.fi("meteorite"), 55000, Items.silicon, 50000, Items.phaseFabric, 35000, Items.surgeAlloy, 48000, F.fi("contritum"), 50000));
