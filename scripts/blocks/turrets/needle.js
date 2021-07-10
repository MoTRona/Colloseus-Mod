const F = require("func");
const E = this.global.EFFECTS;
const C = this.global.COLORS;

const Spike = extend(BasicBulletType, {
    draw(b) {
    	Draw.color(C.angel, 0.98);
        Draw.blend(Blending.additive);
    	Fill.circle(b.x, b.y, 2.7);
        
        for(var i = 0; i < 6; i++) {
        	let ang = Mathf.randomSeedRange(b.id+6, 360)+i*60;
        	var v = new Vec2().trns(ang, 2.7);
        
        	Drawf.tri(b.x + v.x, b.y + v.y, 2*3.14*2.7/6, 3.0, ang);
        };
        Draw.blend();
        Draw.color()
    }
});
Spike.despawnShake = 1.2;
Spike.despawnEffect = E.spikeDespawnEffect;
Spike.damage = 780;
Spike.speed = 0.9;
Spike.lifetime = 300;
Spike.drag = 0.02;
Spike.pierce = true;
Spike.hitSize = 6;
Spike.pierceCap = 6;

const NeedleBullet = extend(BasicBulletType, {
    draw(b) {
    	let size = b.data;
        
    	Draw.color(C.angel, Math.min(b.fout()+0.5, 1));
        Draw.blend(Blending.additive);
    	Drawf.tri(b.x, b.y, size*0.5, size*1.1, b.rotation());
    	Drawf.tri(b.x, b.y, size*0.5, size*0.4, b.rotation()-180);
        Draw.blend();
        Draw.color()
    },
    
    despawned(b){
        E.needleDespawnEffect.at(b.x, b.y, b.rotation(), this.hitColor, Math.min(1.8, b.data*0.05) );
    }
});
NeedleBullet.damage = 1680;
NeedleBullet.speed = 0.001;
NeedleBullet.drag = 0.01;
NeedleBullet.lifetime = 75;
NeedleBullet.pierce = true;
NeedleBullet.pierceBuilding = true;
NeedleBullet.hitSize = 8;
NeedleBullet.pierceCap = 4;

const Needle = extendContent(ItemTurret, "needle", {
	shootEffect: Fx.none,
	reloadTime: 135,
	size: 8,
	range: 260.0,
	shootShake: 6.5,
	alternate: true,
	inaccuracy: 0,
	recoilAmount: 8.0,
	restitution: 0.04,
	shootSound: Sounds.shotgun,
	category: Category.turret,
	buildVisibility: BuildVisibility.shown,
	chargeBeginEffect: E.needleCharge,  
	chargeEffect: E.needleCharge, 
	chargeEffects: 10, 
	maxAmmo: 75, 
	ammoPerShot: 15,
	requirements: ItemStack.with(F.fi("diamond"), 1200, Items.surgeAlloy, 900, Items.silicon, 800, Items.thorium, 450, F.fi("contritum"), 450, F.fi("orbon"), 550, F.fi("palladium"), 800, F.fi("meteorite"), 1000, F.fi("photonite"), 1000), 
	
	load(){
	    this.super$load();

	    this.baseRegion = F.tex("block-8");
    }, 
	
	icons(){
		return [
			F.tex("block-8"),
			F.tex("needle")
		];
    }
});
Needle.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Needle, {
        shoot(type){
            this.useAmmo();

            this.block.tr.trns(this.rotation, this.block.shootLength);
            this.block.chargeBeginEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation);
            this.block.chargeSound.at(this.x + this.block.tr.x, this.y + this.block.tr.y, 1);

            let c = 0
            for(let i = 0; i < this.block.chargeEffects; i++){
                Time.run(100-8*c, () => {
                    if(!this.isValid()) return;
                    this.block.tr.trns(this.rotation, this.block.shootLength);
                    this.block.chargeEffect.at(this.x + this.block.tr.x, this.y + this.block.tr.y, this.rotation);
                });
                
                if(c != this.block.chargeEffects) c++ // :) 
            };

            this.charging = true;

            Time.run(100, () => {
                if(!this.isValid()) return;
                this.block.tr.trns(this.rotation, this.block.shootLength);
                this.recoil = this.block.recoilAmount;
                this.heat = 1.0;
                this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy));
                this.effects();
                this.charging = false
            })
        },  
        
        bullet(type, angle){ 
        	const rotAngle = this.rotation;
	        for(var i = 0; i < 10; i++) {
	        	var v = new Vec2().trns(this.rotation, 30);
	        
	    	    Spike.create(this, this.team, this.x + v.x, this.y + v.y, this.rotation+Mathf.range(30), 5.0+Mathf.range(2.5), 1.0+Mathf.range(0.1)); 
	        };
	
	        for(var i = 0; i < 20; i++) {
		        let size = 24-i*1.1;
		        let range = 30+(20-i*0.5)*i;
		        let time = 10*i;
		
	            Time.run(time, () => {
				    var v = new Vec2().trns(rotAngle, range);
		            
		    	    NeedleBullet.create(this, this.team, this.x + v.x, this.y + v.y, v.angle(), 1.0, 1.0, 1.0, size); 
	            })
	        }
        }
	});
	return ent;
};
Needle.ammo(
    F.fi("orbon"), Spike
);
Needle.consumes.power(1600/60.0);
Needle.consumes.liquid(F.fl("helium-liquid"), 10.0/60.0);

F.techNode(F.fb("spike"), Needle, ItemStack.with(F.fi("diamond"), 150000, Items.surgeAlloy, 100000, Items.silicon, 90000, Items.thorium, 55000, F.fi("contritum"), 50000, F.fi("orbon"), 64000, F.fi("palladium"), 85000, F.fi("meteorite"), 120000, F.fi("photonite"), 120000));
