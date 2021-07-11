const F = require("func");
const E = this.global.EFFECTS;
const SO = this.global.STATUSES;
const FireItems = new Seq();

Vars.content.items().each(
    cons(item => { 
		if(item.flammability >= 0.5 || item.name == "collos-ruby") FireItems.add(item);
	})
);

const createFireBullet = item => {
	const bullet = extend(ArtilleryBulletType, {
	    hit(b, x, y){
	    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
	        this.hitSound.at(b);
        
	        Damage.createIncend(b.x, b.y, Mathf.clamp(item.flammability*5.0, 2.0, 12.0), Mathf.clamp(Mathf.round(item.flammability*5.0), 0, 10));
	    }, 

	    despawned(b){
	        this.hit(b, b.x, b.y);
	    }, 

		update(b){
			this.super$update(b);
			
			if(Mathf.chance((Mathf.clamp(item.flammability / 5.0, 0.0, 0.4)) * Time.delta)){
				this.trailEffect.at(b.x + Mathf.range(Mathf.clamp(item.flammability*12.0, 1.0, 8.0)), b.y + Mathf.range(Mathf.clamp(item.flammability*12.0, 1.0, 8.0)), b.rotation);
			};
		},
		
		draw(b){
			Draw.color(Pal.lightFlame);
			Fill.circle(b.x, b.y, Mathf.clamp(item.flammability/2.0, 0.4, 1.4)*2.0 + b.fin() * Mathf.clamp(item.flammability/2.0, 1.0, 3.0)*2.0*1.2);
			Draw.reset();
		}
	});
	bullet.damage = 8.4 + item.flammability * 7.8;
	bullet.speed = 8.0;
	bullet.collides = true;
	bullet.collidesTiles = true;
	bullet.collidesAir = true;
	bullet.pierce = true;
	bullet.trailEffect = Fx.ballfire;
	bullet.hitEffect = E.fireHit;
	bullet.despawnEffect = E.fireHit;
	bullet.hitColor = Pal.darkFlame;
	bullet.shootEffect = E.foxShoot;
	bullet.status = SO.burningIntensive;
	bullet.ammoCapacity = Mathf.clamp(Mathf.round(item.flammability), 1, 6);
	bullet.statusDuration = 360;
	bullet.splashDamageRadius = Mathf.clamp(item.flammability*4, 2, 12);
	bullet.splashDamage = 0.0;
	return bullet
};
	
const Fox = extendContent(ItemTurret, "fox", {});
Fox.size = 2;
Fox.reloadTime = 6;
Fox.range = 160;
Fox.velocityInaccuracy = 0.1;
Fox.inaccuracy = 10;
Fox.recoilAmount = 1.8;
Fox.rotateSpeed = 5.2;
Fox.shootSound = Sounds.flame;

var ammo = new ObjectMap();
FireItems.each(
    cons(item => { 
		ammo.put(item, createFireBullet(item));
	})
);
Fox.ammoTypes = ammo;
Fox.buildVisibility = BuildVisibility.shown;
Fox.category = Category.turret;
Fox.maxAmmo = 50;
Fox.requirements = ItemStack.with(F.fi("ruby"), 75, Items.silicon, 45, Items.copper, 60);

F.techNode(Blocks.duo, Fox, ItemStack.with(F.fi("ruby"), 10000, Items.silicon, 6500, Items.copper, 8000));

//////
//////
//////

const createFireArtilleryBullet = item => {
	const bullet = extend(ArtilleryBulletType, {
	    hit(b, x, y){
	    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
	        this.hitSound.at(b);
        
	        Damage.createIncend(b.x, b.y, Mathf.clamp(item.flammability*3.0, 0.5, 5.0), Mathf.clamp(Mathf.round(item.flammability*2.0), 0, 5));
	    }, 

	    despawned(b){
	        this.hit(b, b.x, b.y);
	    }, 

		update(b){
			this.super$update(b);
			
			if(Mathf.chance((Mathf.clamp(item.flammability / 5.0, 0.0, 0.4)) * Time.delta)){
				this.trailEffect.at(b.x + Mathf.range(Mathf.clamp(item.flammability, 0.5, 3.0)), b.y + Mathf.range(Mathf.clamp(item.flammability, 0.5, 3.0)), b.rotation);
			};
		},
		
		draw(b){
			Draw.color(Pal.lightFlame);
			Fill.circle(b.x, b.y, Mathf.clamp(item.flammability/2.0, 0.4, 1.4)*1.6 + b.fin() * Mathf.clamp(item.flammability/2.0, 1.0, 3.0)*1.6*1.2);
			Draw.reset();
		}
	});
	bullet.damage = 20.0 + item.flammability * 21.5;
	bullet.speed = 6.0;
	bullet.lifetime = 90;
	bullet.collides = true;
	bullet.collidesTiles = true
	bullet.collidesAir = true;
	bullet.pierce = true;
	bullet.trailEffect = Fx.ballfire;
	bullet.hitEffect = E.fireHitBig;
	bullet.despawnEffect = E.fireHitBig;
	bullet.hitColor = Pal.darkFlame;
	bullet.shootEffect = E.napalmShoot;
	bullet.status = SO.burningIntensiver;
	bullet.ammoCapacity = Mathf.clamp(Mathf.round(item.flammability), 1, 6);
	bullet.statusDuration = 360;
	bullet.splashDamageRadius = Mathf.clamp(item.flammability*4, 2, 12);
	bullet.splashDamage = 0.0;
	return bullet
};

const Napalm = extendContent(ItemTurret, "napalm", {});
Napalm.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Napalm, {
        shoot(type){
            var i = (this.shotCounter % this.block.shots) - (this.block.shots-1) / 2.0;
            var vecs = [-8, -4, 0, -4, -8];

            for(var i = 0; i < 5; i++) {
	            this.block.tr.trns(this.rotation - 90, this.block.spread * i + vecs[i], this.block.size * 4 + vecs[i]);
	            this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy));
	            this.effects();
	        };
            
            this.shotCounter++; 

            this.recoil = this.block.recoilAmount;
            this.heat = 1.0;
            this.useAmmo();
        }
	});
	return ent;
};
Napalm.recoilAmount = 3.33;
Napalm.size = 3;
Napalm.reloadTime = 55;
Napalm.range = 320;
Napalm.velocityInaccuracy = 0.2;
Napalm.inaccuracy = 14;
Napalm.rotateSpeed = 3.5; 
Napalm.shootSound = Sounds.artillery;
Napalm.maxAmmo = 80;

var ammo2 = new ObjectMap();
FireItems.each(
    cons(item => { 
		ammo2.put(item, createFireArtilleryBullet(item));
	})
);
Napalm.ammoTypes = ammo2;
Napalm.buildVisibility = BuildVisibility.shown;
Napalm.category = Category.turret 
Napalm.requirements = ItemStack.with(F.fi("ruby"), 200, Items.silicon, 100, Items.titanium, 90, Items.plastanium, 75);

F.techNode(Fox, Napalm, ItemStack.with(F.fi("ruby"), 25000, Items.silicon, 12500, Items.titanium, 10000, Items.plastanium, 8000));

//////
//////
//////


const createContiniuosFireBullet = item => {
	const bullet = extend(ArtilleryBulletType, {
	    hit(b, x, y){
	    	this.hitEffect.at(b.x, b.y, b.rotation(), this.hitColor);
	        this.hitSound.at(b);
        
	        Damage.createIncend(b.x, b.y, Mathf.clamp(item.flammability*3.0, 0.5, 5.0), Mathf.clamp(Mathf.round(item.flammability*2.0), 0, 5));
	    }, 

	    despawned(b){
	        this.hit(b, b.x, b.y);
	    }, 

		update(b){
			this.super$update(b);
			
			if(Mathf.chance(0.2)) Damage.createIncend(b.x, b.y, Mathf.clamp(item.flammability*5.0, 1.0, 8.0), Mathf.clamp(Mathf.round(item.flammability*3.0), 0, 7));
			
			if(Mathf.chance((Mathf.clamp(item.flammability / 7.0, 0.0, 0.3)) * Time.delta)){
				this.trailEffect.at(b.x + Mathf.range(Mathf.clamp(item.flammability*2.0, 1.0, 8.0)), b.y + Mathf.range(Mathf.clamp(item.flammability*2.0, 1.0, 8.0)), b.rotation);
			};
		},
		
		draw(b){
			Draw.color(Pal.lightFlame);
			Fill.circle(b.x, b.y, Mathf.clamp(item.flammability/2.0, 0.5, 2.0)*2.4 + b.fin() * Mathf.clamp(item.flammability/2.0, 1.0, 6.0)*2.4*1.3);
			Draw.reset();
		}
	});
	bullet.drag = 0.02;
	bullet.damage = 160 + item.flammability * 160.0;
	bullet.speed = 10.0;
	bullet.collides = true;
	bullet.collidesTiles = true
	bullet.collidesAir = true;
	bullet.pierce = true;
	bullet.trailEffect = Fx.ballfire;
	bullet.hitEffect = E.fireHitBig;
	bullet.despawnEffect = E.fireHitBig;
	bullet.hitColor = Pal.darkFlame;
	bullet.shootEffect = E.napalmShoot;
	bullet.status = SO.burningIntensiver;
	bullet.ammoCapacity = Mathf.clamp(Mathf.round(item.flammability*2.0), 1, 8);
	bullet.statusDuration = 600;
	bullet.splashDamageRadius = Mathf.clamp(item.flammability*5, 4.0, 20.0);
	bullet.splashDamage = 0.0;
	return bullet
};

const Twinkle = extendContent(ItemTurret, "twinkle", {
	load(){
	    this.super$load();

	    this.baseRegion = F.tex("block-5");
    }, 
	
	icons(){
		return [
			F.tex("block-5"),
			F.tex("twinkle")
		];
    }
});
Twinkle.buildType = () => {
	const ent = extendContent(ItemTurret.ItemTurretBuild, Twinkle, {
        bullet(type, angle){
            this.super$bullet(type, angle);
            
            for(var i = 0; i < 10; i++) Time.run(3*i, () => { Call.createBullet(createFireArtilleryBullet(Items.coal), this.team, this.x + this.block.tr.x, this.y + this.block.tr.y, angle+Mathf.range(15), -1, 1.0 + Mathf.range(0.4), 1.0 + Mathf.range(0.15)) });
        }
	});
	return ent;
};
Twinkle.recoilAmount = 5.0;
Twinkle.hasItems = true;
Twinkle.hasLiquids = true;
Twinkle.size = 5;
Twinkle.reloadTime = 200.0;
Twinkle.range = 450;
Twinkle.velocityInaccuracy = 0.1;
Twinkle.inaccuracy = 7;
Twinkle.rotateSpeed = 2.0; 
Twinkle.shootSound = Sounds.artillery;
Twinkle.maxAmmo = 20;

var ammo3 = new ObjectMap();
FireItems.each(
    cons(item => { 
		ammo3.put(item, createContiniuosFireBullet(item));
	})
);
Twinkle.ammoTypes = ammo3;
Twinkle.buildVisibility = BuildVisibility.shown;
Twinkle.category = Category.turret;
Twinkle.requirements = ItemStack.with(F.fi("ruby"), 500, Items.silicon, 300, Items.surgeAlloy, 340, Items.coal, 450, Items.pyratite, 250, Items.thorium, 280);

F.techNode(Napalm, Twinkle, ItemStack.with(F.fi("ruby"), 55000, Items.silicon, 35000, Items.surgeAlloy, 37500, Items.coal, 50000, Items.pyratite, 30000, Items.thorium, 32500));

//////
//////
//////
