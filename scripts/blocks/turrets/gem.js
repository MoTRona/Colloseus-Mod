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
GemSpear.damage = 500000;
GemSpear.speed = 10;
GemSpear.lifetime = 1000;
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
	                prov(() => Core.bundle.get("charge")+": "+e.getPowerCharge()+"/100000"),
			        prov(() => e.getPowerCharge() == 100000 ? C.rubyLight : C.angelLight),
			        floatp(() => e.getPowerCharge()/100000)
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
		
        acceptItem(source, item){
            this.setPowerCharge(Math.min(this.getPowerCharge()+item.hardness+item.cost, 100000)); 
            return true;
        },
		
        acceptStack(item, amount, source){return 0}, 
        handleItem(source, item){}, 
        handleStack(item, amount, source){},         //I'm sure these methods are very frustrated with their uselessness. Sad
        effects(){},
        peekAmmo(){}, 
        ejectEffects(){}, 

        updateShooting(){
            if(!this.charging){
                this.shoot(GemSpear);
            }
        }, 
        
        shoot(type){
            this.block.tr.trns(this.rotation - 90, 0, this.block.size * 4 - 20);
            this.bullet(type, this.rotation + Mathf.range(this.block.inaccuracy));
	 
            this.recoil = this.block.recoilAmount;
            this.heat = 1.0;
        }, 

        
        hasAmmo(){
            return this.getPowerCharge() == 100000;
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
	    Items.surgeAlloy, 225000, F.fi("meteorite"), 180000, 
	    F.fi("palladium"), 195000, Items.titanium, 100000, 
	    Items.thorium, 115000, F.fi("photonite"), 160000, 
	    Items.metaglass, 200000, Items.silicon, 185000, 
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
