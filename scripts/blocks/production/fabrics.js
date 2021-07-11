const F = require("func");
const C = this.global.COLORS;
const E = this.global.EFFECTS;
const SO = this.global.SOUNDS;

const CutolCrafter = extendContent(GenericSmelter, "cutol-crafter", {
	hasPower: true,
	hasItems: true,
	health: 800,
	size: 3,
	craftTime: 60,
	craftEffect: E.cutolCraft,
	requirements: ItemStack.with(Items.surgeAlloy, 100, Items.thorium, 80, Items.silicon, 120, Items.lead, 90),
	outputItem: new ItemStack(F.fi("cutol"), 1),
	itemCapacity: 10,
	category: Category.crafting,
	buildVisibility: BuildVisibility.shown,

    load() {
		this.super$load();
		this.topRegion = Core.atlas.find("clear");
	}
});
CutolCrafter.buildType = () => {
	const ent = extendContent(GenericSmelter.SmelterBuild, CutolCrafter, {
        draw(){
            this.super$draw();

            if(this.warmup > 0.0 && this.block.flameColor.a > 0.001){
				Draw.color(F.c("#638EDF"));
				Draw.alpha((0.35 + Mathf.sin(Time.time*0.2)*0.1) * this.warmup);
				Draw.blend(Blending.additive);
				Draw.rect(F.tex("cutol-crafter-heat"), this.x, this.y);
				Draw.blend();
                Draw.reset();
            }
        }
	});
	return ent;
};
CutolCrafter.consumes.power(7.5);
CutolCrafter.consumes.items(new ItemStack(Items.graphite, 4), new ItemStack(Items.surgeAlloy, 1), new ItemStack(Items.plastanium, 2));
 
///
 
const LargePhaseWeaver = extendContent(GenericCrafter, "large-phase-weaver", {
	buildVisibility: BuildVisibility.shown,
	hasPower: true,
	hasLiquids: true,
	hasItems: true,
	health: 640,
	size: 4,
	craftTime: 300,
	requirements: ItemStack.with(Items.phaseFabric, 120, Items.titanium, 150, Items.silicon, 90, Items.surgeAlloy, 75),
	outputItem: new ItemStack(Items.phaseFabric, 6),
	ambientSound: Sounds.respawning,
	ambientSoundVolume: 0.05,
	itemCapacity: 30,
	liquidCapacity: 35,
	category: Category.crafting,
	drawer: new DrawWeave()
});
LargePhaseWeaver.buildType = () => {
	const ent = extendContent(GenericCrafter.GenericCrafterBuild, LargePhaseWeaver , {
        draw(){
            this.super$draw();

            if(this.warmup > 0.0){
            	Draw.color(Items.phaseFabric.color);
				Draw.alpha((0.25 + Mathf.sin(Time.time*0.1)*0.075) * this.warmup);
				Draw.blend(Blending.additive);
				Draw.rect(F.tex("large-phase-weaver-heat"), this.x, this.y);
				Draw.blend();
				Draw.mixcol();
                Draw.color();
            }
        }
	});
	return ent;
};
LargePhaseWeaver.consumes.power(12.5);
LargePhaseWeaver.consumes.liquid(Liquids.cryofluid, 3.0/60.0);
LargePhaseWeaver.consumes.items(new ItemStack(Items.thorium, 7), new ItemStack(Items.sand, 12));

///

const Diluent = extendContent(GenericSmelter, "diluent", {
	requirements: ItemStack.with(F.fi("palladium"), 75, Items.thorium, 90, Items.silicon, 60),
	outputLiquid: new LiquidStack(F.fl("helium-liquid"), 15),
	buildCostMultiplier: 0.3,
	itemCapacity: 10,
	liquidCapacity: 60,
	category: Category.crafting,
	buildVisibility: BuildVisibility.shown,
	hasPower: true,
	hasItems: true,
	hasLiquids: true,
	health: 425,
	size: 3,
	craftTime: 60,
	updateEffect: Fx.smeltsmoke,

    load() {
		this.super$load();
		this.topRegion = Core.atlas.find("clear");
	}
});
Diluent.buildType = () => {
	const ent = extendContent(GenericSmelter.SmelterBuild, Diluent, {
        draw(){
            this.super$draw();

            if(this.warmup > 0.0 && this.block.flameColor.a > 0.001){
				Draw.color(F.fi("topaz").color);
				Draw.alpha((0.35 + Mathf.sin(Time.time*0.2)*0.1) * this.warmup);
				Draw.blend(Blending.additive);
				Draw.rect(F.tex("diluent-heat"), this.x, this.y);
				Draw.blend();
                Draw.reset();
            }
        }
	});
	return ent;
};
Diluent.consumes.power(15);
Diluent.consumes.liquid(Liquids.water, 0.175);
Diluent.consumes.items(new ItemStack(F.fi("palladium"), 1), new ItemStack(Items.copper, 4));

///

const EnergySealer = extendContent(GenericSmelter, "energy-sealer", {
	buildVisibility: BuildVisibility.shown,
	hasPower: true,
	hasItems: true,
	health: 740,
	size: 4,
	craftTime: 45,
	craftEffect: E.energyBlastTiny,
	outputItem: new ItemStack(F.fi("laculis"), 1),
	buildCostMultiplier: 0.7,
	itemCapacity: 10,
	category: Category.crafting,
	requirements: ItemStack.with(F.fi("palladium"), 100, Items.titanium, 120, Items.silicon, 75, Items.surgeAlloy, 80, Items.plastanium, 50),

	load() {
		this.super$load();
		this.topRegion = Core.atlas.find("clear");
	}
});
EnergySealer.buildType = () => {
	const ent = extendContent(GenericSmelter.SmelterBuild, EnergySealer, {
        draw(){
            this.super$draw();

            if(this.warmup > 0.0 && this.block.flameColor.a > 0.001){
			    Tmp.c1.set(C.contritumLight).lerp(C.contritum, Mathf.sin(Time.time*0.2)*0.5+0.5);
	
				Draw.mixcol(Tmp.c1, 1);
				Draw.alpha((0.35 + Mathf.sin(Time.time*0.2)*0.1) * this.warmup);
				Draw.blend(Blending.additive);
				Draw.rect(F.tex("energy-sealer-heat"), this.x, this.y);
				Draw.blend();
				Draw.mixcol();
                Draw.color();
            }
        }
	});
	return ent;
};
EnergySealer.consumes.power(250);
EnergySealer.consumes.items(new ItemStack(F.fi("palladium"), 1), new ItemStack(Items.titanium, 2), new ItemStack(Items.thorium, 2));

///

const Crystalizer = extendContent(GenericCrafter, "crystalizer", {
	requirements: ItemStack.with(F.fi("ruby"), 130, F.fi("diamond"), 85, Items.graphite, 125, Items.surgeAlloy, 75, Items.plastanium, 60),
	outputItem: new ItemStack(F.fi("photonite"), 1),
	buildCostMultiplier: 0.7,
	itemCapacity: 5,
	category: Category.crafting,
	buildVisibility: BuildVisibility.shown,
	hasPower: true,
	hasItems: true,
	health: 1260,
	size: 5,
	craftTime: 75,
	craftEffect: E.photoniteCraft
});
Crystalizer.buildType = () => {
	const ent = extendContent(GenericCrafter.GenericCrafterBuild, Crystalizer, {
        draw(){
            this.super$draw();

            if(this.warmup > 0.0){
			    Tmp.c1.set(C.diamond).lerp(C.diamondDark, Mathf.sin(Time.time*0.1)*0.5+0.5);
	
				Draw.mixcol(Tmp.c1, 1);
				Draw.alpha((0.35 + Mathf.sin(Time.time*0.2)*0.1) * this.warmup);
				Draw.blend(Blending.additive);
				Draw.rect(F.tex("crystalizer-heat"), this.x, this.y);
				Draw.blend();
				Draw.mixcol();
                Draw.color();
            }
        }
	});
	return ent;
};
const Glow = extend(DrawGlow, {
    draw(entity){
        Draw.rect(entity.block.region, entity.x, entity.y);
        Draw.alpha(Mathf.clamp(entity.totalProgress) * entity.warmup);
        Draw.rect(this.top, entity.x, entity.y);
        Draw.reset();
    }
});
Crystalizer.drawer = Glow;
Crystalizer.consumes.power(20);
Crystalizer.consumes.items(new ItemStack(F.fi("ruby"), 1), new ItemStack(F.fi("sapphire"), 1), new ItemStack(F.fi("amethyst"), 1), new ItemStack(F.fi("emerald"), 1), new ItemStack(F.fi("diamond"), 1), new ItemStack(F.fi("topaz"), 1));

///

const OrbonCrafter = extendContent(GenericSmelter, "orbon-crafter", {
	hasPower: true,
	hasItems: true,
	health: 450,
	size: 3,
	craftTime: 70,
	updateEffect: E.orbonCraft,
	craftEffect: E.orbonCraft,
	requirements: ItemStack.with(Items.surgeAlloy, 200, Items.silicon, 150, Items.lead, 240, F.fi("cutol"), 75, F.fi("lux"), 100),
	outputItem: new ItemStack(F.fi("orbon"), 1),
	itemCapacity: 10,
	category: Category.crafting,
	buildVisibility: BuildVisibility.shown
});
OrbonCrafter.buildType = () => {
	const ent = extendContent(GenericSmelter.SmelterBuild, OrbonCrafter, {
        draw(){
            this.super$draw();

            if(this.warmup > 0.0 && this.block.flameColor.a > 0.001){
				Draw.color(F.fi("orbon").color);
				Draw.alpha((0.35 + Mathf.sin(Time.time*0.1)*0.2) * this.warmup);
				Draw.blend(Blending.additive);
				Draw.rect(F.tex("orbon-crafter-heat"), this.x, this.y);
				Draw.blend();
                Draw.reset();
            }
        }
	});
	return ent;
};
OrbonCrafter.consumes.power(11.5);
OrbonCrafter.consumes.items(new ItemStack(Items.silicon, 3), new ItemStack(Items.phaseFabric, 2), new ItemStack(F.fi("palladium"), 4));

///

const ContritumCrafter = extendContent(GenericSmelter, "contritum-crafter", {
	requirements: ItemStack.with(Items.silicon, 300, Items.lead, 280, F.fi("orbon"), 250, F.fi("meteorite"), 200),
	outputItem: new ItemStack(F.fi("contritum"), 1),
	itemCapacity: 10,
	category: Category.crafting,
	buildVisibility: BuildVisibility.shown,
	hasPower: true,
	hasItems: true,
	health: 2350,
	size: 4,
	craftTime: 90,
	updateEffect: E.contritumUpdate,
	craftEffect: E.contritumCraft
});
ContritumCrafter.buildType = () => {
	const ent = extendContent(GenericSmelter.SmelterBuild, ContritumCrafter, {
        draw(){
            this.super$draw();

            if(this.warmup > 0.0 && this.block.flameColor.a > 0.001){
				Draw.color(C.contritum);
				Draw.alpha((0.25 + Mathf.sin(Time.time*0.1)*0.1) * this.warmup);
				Draw.blend(Blending.additive);
				Draw.rect(F.tex("contritum-crafter-heat"), this.x, this.y);
				Draw.blend();
                Draw.reset();
            }
        }
	});
	return ent;
};
ContritumCrafter.consumes.power(2000.0/60.0);
ContritumCrafter.consumes.liquid(F.fl("helium-liquid"), 50.0/60.0);
ContritumCrafter.consumes.items(new ItemStack(F.fi("meteorite"), 3), new ItemStack(F.fi("cutol"), 1), new ItemStack(F.fi("laculis"), 1));

F.techNode(F.fi("orbon"), OrbonCrafter, ItemStack.with(Items.surgeAlloy, 12000, Items.phaseFabric, 8500, Items.silicon, 15000, Items.thorium, 11000, F.fi("cutol"), 8000, F.fi("lux"), 10000));
F.techNode(F.fi("contritum"), ContritumCrafter, ItemStack.with(F.fi("orbon"), 5000, F.fi("meteorite"), 6000, F.fi("laculis"), 6000, Items.thorium, 11000, F.fi("cutol"), 13000, Items.silicon, 9000));
F.techNode(F.fi("cutol"), CutolCrafter, ItemStack.with(Items.surgeAlloy, 10000, Items.thorium, 5000, Items.silicon, 15000, Items.lead, 7500));
F.techNode(Blocks.phaseWeaver, LargePhaseWeaver, ItemStack.with(Items.phaseFabric, 4000, Items.titanium, 7500, Items.silicon, 8500, Items.surgeAlloy, 5500));
F.techNode(F.fi("lux"), Crystalizer, ItemStack.with(F.fi("ruby"), 20000, F.fi("diamond"), 20000, Items.graphite, 32000, Items.surgeAlloy, 12000, Items.plastanium, 13500));
F.techNode(F.fi("laculis"), EnergySealer, ItemStack.with(F.fi("palladium"), 15000, Items.titanium, 18000, Items.silicon, 22000, Items.surgeAlloy, 7500, Items.plastanium, 13500));
F.techNode(F.fl("helium-liquid"), Diluent, ItemStack.with(F.fi("palladium"), 7500, Items.thorium, 9000, Items.silicon, 14500));
