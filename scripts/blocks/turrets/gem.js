const F = require("func");
const E = this.global.EFFECTS;
const C = this.global.COLORS;
const SO = this.global.SOUNDS;
const S = this.global.STATUSES;

const GemSpear = extend(BasicBulletType, {
    draw(b) {
        Draw.color(C.magicLight, C.magic, b.fin());
        Drawf.tri(b.x, b.y, 8.0, 8.0, Time.time + (360/b.time) * 6.0); 
    }
});
GemSpear.hitSize = 8;
GemSpear.knockback = 120.0;
GemSpear.damage = 2.25e5;
GemSpear.speed = 50;
GemSpear.pierce = true;
GemSpear.pierceBuilding = true;
GemSpear.lifetime = 20;
GemSpear.hitEffect = E.magicBulletHitSmall;
GemSpear.despawnEffect = E.magicBulletHitSmall;
GemSpear.hitColor = C.magicLight.cpy();
GemSpear.shootEffect = E.magicShootEffect;

const Gem = extendContent(Turret, "gem", {
	itemCapacity: 150,
	liquidCapacity: 150,
	hasPower: true,
	hasItems: true,
	hasLiquids: true,
	outputsPower: false,
	consumesPower: true,
	acceptsItems: true, 
	update: true, 
	size: 14,
	health: 540 * 14 * 14,
	recoilAmount: 25.0,
	range: 1000.0,
	buildVisibility: BuildVisibility.shown, 
	category: Category.turret, 
	powerUse: 2500,
	requirements: ItemStack.with(Items.surgeAlloy, 1800, F.fi("meteorite"), 1500, F.fi("palladium"), 1650, Items.titanium, 800, Items.thorium, 800, F.fi("photonite"), 1200, Items.metaglass, 1450, Items.silicon, 1200), 
	
	init(){
        this.consumes.powerCond(this.powerUse, gem => gem.target != null || gem.wasShooting);
        this.super$init();
    }, 
    
	load(){
		this.super$load();
		
		this.region = Core.atlas.find(this.name);
		this.baseRegion = Core.atlas.find("collos-block-" + this.size);
	},
	
	icons(){
		return [
			Core.atlas.find("collos-block-" + this.size),
			Core.atlas.find(this.name)
		];
	}, 
	
	setBars(){
	    this.super$setBars();

	    this.bars.add("charge",
            func(e =>
		        new Bar(
	                prov(() => Core.bundle.get("charge")+": "+e.getPowerCharge().toFixed()+"/100000"),
			        prov(() => e.getPowerCharge() == 1e5 ? C.rubyLight : C.angelLight),
			        floatp(() => e.getPowerCharge()/1e5)
	            )
	        )
        )
    } 
});
Gem.buildType = () => {
	const ent = extendContent(Turret.TurretBuild, Gem, {
		init(tile, team, shouldAdd, rotation){
			this.super$init(tile, team, shouldAdd, rotation);
			
			this.setPowerCharge(0);
			
			return this;
		},  

        targetPosition(pos){
            if(!this.hasAmmo() || pos == null) return;
            
            this.targetPos.set(Predict.intercept(this, pos, 50));
            if(this.targetPos.isZero()){
                this.targetPos.set(pos);
            }
        }, 
		
        acceptItem(source, item){
            this.setPowerCharge(Math.min(this.getPowerCharge()+item.hardness+item.cost, 100000)); 
            return true;
        },
		
        acceptStack(item, amount, source){return 0}, 
        handleItem(source, item){}, 
        handleStack(item, amount, source){},         //I'm sure these methods are very frustrated with their uselessness. Sad
        useAmmo(){},
        peekAmmo(){}, 
        ejectEffects(){}, 

        updateShooting(){
            if(!this.charging){
	            SO.gaussShoot.at(this.x + this.block.tr.x, this.y + this.block.tr.y, 2);
            	
	            this.usePower();
                Time.run(60, () => { this.shoot(GemSpear) })
            }
        }, 
        
        shoot(type){
            this.block.tr.trns(this.rotation - 90, 0, this.block.size * 4 - 20);
            this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy));
	 
            this.recoil = this.block.recoilAmount;
            
            this.effects();
        }, 

        bullet(type, angle){
            var b = type.create(this, this.team, this.x + this.block.tr.x, this.y + this.block.tr.y, angle, Mathf.random(75000.0, 150000.0), 1.0, 1.0, [8]);
            
            let time = b.dst(this.targetPos)/type.speed;
            for(var i = 0; i < 6; i++) {
            	var speed1 = (1.0-0.95/6*i);
            	Time.run(i*8, () => { 
            	    Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * speed1, 3 * speed1));
                });
                
            	var speed2 = (0.05+0.95/6*i);
            	Time.run(time+i*8, () => { 
            	    Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * speed2, 3 * speed2));
                }) 
            } 
        },
        
        effects(){
            //effects later
            
            
            this.recoil = this.block.recoilAmount
        }, 
        
        hasAmmo(){
            return this.getPowerCharge() == 1e5;
        }, 
        
		setPowerCharge(a){
			this._charge = a;
		},
        
		usePower(){
			this._charge = 0;
		},

		getPowerCharge(){
			return this._charge;
		}
	});
	return ent;
};
Gem.consumes.liquid(F.fl("helium-liquid"), 0.5);

F.node(F.fb("duo"), Gem, 
    ItemStack.with(
	    Items.surgeAlloy, 2.25e5, F.fi("meteorite"), 180000, 
	    F.fi("palladium"), 1.95e5, Items.titanium, 100000, 
	    Items.thorium, 1.15e5, F.fi("photonite"), 1.6e5, 
	    Items.metaglass, 2e5, Items.silicon, 185000, 
	    F.fi("contritum"), 250000
    ), Seq.with(
	    new Objectives.Research(F.fi("meteorite")), 
        new Objectives.Research(F.fi("contritum")),
        new Objectives.Research(F.fb("twinkle")), 
        new Objectives.Research(F.fb("decomposer")),
        new Objectives.Research(F.fb("executioner")), 
        new Objectives.Research(F.fb("needle")), 
        new Objectives.Research(F.fb("absorber"))
    )
);
