const F = require("func");
const C = this.global.COLORS;

function newWall(name, insulated, size, health, item, number, lightningChance, lightningDamage, lightningLength, lightningColor, chanceDeflect, flashHit){
    const wall = extendContent(Wall, name, {});
    wall.insulated = insulated;
    wall.buildVisibility = BuildVisibility.shown;
	wall.size = size;
	wall.health = health;
    wall.category = Category.defense;
    wall.requirements = ItemStack.with(item, number);

	wall.lightningChance = lightningChance;
	wall.lightningDamage = lightningDamage;
    wall.lightningLength = lightningLength;
    wall.lightningColor = lightningColor;

    wall.chanceDeflect = chanceDeflect;
    wall.flashHit = flashHit;
 
    return wall;
}

const leadLarge = newWall("lead-wall-large", false, 2, 1400, Items.lead, 24, -1, 0, 0, Color.white, -1, false);
const lead = newWall("lead-wall", false, 1, 360, Items.lead, 6, -1, 0, 0, Color.white, -1, false);
leadLarge.buildCostMultiplier = 2.5;
lead.buildCostMultiplier = 2.5;

const plastaniumHuge = newWall("plastanium-wall-huge", true, 3, 8360, Items.plastanium, 125, - 1, 0, 0, Color.white, -1, false);
const plastaniumGiant = newWall("plastanium-wall-giant", true, 4, 14500, Items.plastanium, 245, -1, 0, 0, Color.white, -1, false);
plastaniumHuge.absorbLasers = true;
plastaniumGiant.absorbLasers = true;

const surgeHuge = newWall("surge-wall-huge", false, 3, 10120, Items.surgeAlloy, 125, 21, 0.22, 19, Pal.surge, -1, false);
const surgeGiant = newWall("surge-wall-giant", false, 4, 18400, Items.surgeAlloy, 245, 24, 0.29, 22, Pal.surge, -1, false);

const thoriumHuge = newWall("thorium-wall-huge", false, 3, 7820, Items.thorium, 125, -1, 0, 0, Color.white, -1, false);
const thoriumGiant = newWall("thorium-wall-giant", false, 4, 13460, Items.thorium, 245, -1, 0, 0, Color.white, -1, false);

const titaniumHuge = newWall("titanium-wall-huge", false, 3, 4840, Items.titanium, 125, -1, 0, 0, Color.white, -1, false);
const titaniumGiant = newWall("titanium-wall-giant", false, 4, 8800, Items.titanium, 245, -1, 0, 0, Color.white, -1, false);

const phaseHuge = newWall("phase-wall-huge", false, 3, 6600, Items.phaseFabric, 125, -1, 0, 0, Color.white, 15, true);
const phaseGiant = newWall("phase-wall-giant", false, 4, 12050, Items.phaseFabric, 245, -1, 0, 0, Color.white, 20, true);

const copperHuge = newWall("copper-wall-huge", false, 3, 3520, Items.copper, 125, -1, 0, 0, Color.white, -1, false);
const copperGiant = newWall("copper-wall-giant", false, 4, 7250, Items.copper, 245, -1, 0, 0, Color.white, -1, false);

F.techNode(Blocks.copperWallLarge, lead, ItemStack.with(Items.lead, 250));
F.techNode(lead, leadLarge, ItemStack.with(Items.lead, 1000));

F.techNode(Blocks.copperWallLarge, copperHuge, ItemStack.with(Items.copper, 3000));
F.techNode(copperHuge, copperGiant, ItemStack.with(Items.copper, 10000));

F.techNode(Blocks.thoriumWallLarge, thoriumHuge, ItemStack.with(Items.thorium, 3000));
F.techNode(thoriumHuge, thoriumGiant, ItemStack.with(Items.thorium, 10000));

F.techNode(Blocks.phaseWallLarge, phaseHuge, ItemStack.with(Items.phaseFabric, 3000));
F.techNode(phaseHuge, phaseGiant, ItemStack.with(Items.phaseFabric, 10000));

F.techNode(Blocks.titaniumWallLarge, titaniumHuge, ItemStack.with(Items.titanium, 3000));
F.techNode(titaniumHuge, titaniumGiant, ItemStack.with(Items.titanium, 10000));

F.techNode(Blocks.plastaniumWallLarge, plastaniumHuge, ItemStack.with(Items.plastanium, 3000));
F.techNode(plastaniumHuge, plastaniumGiant, ItemStack.with(Items.plastanium, 10000));

F.techNode(Blocks.surgeWallLarge, surgeHuge, ItemStack.with(Items.surgeAlloy, 3000));
F.techNode(surgeHuge, surgeGiant, ItemStack.with(Items.surgeAlloy, 10000));

function newRubyWall(name, chance, size, health, number, child, number2){
	const rubyWall = extendContent(Wall, name, {});
	rubyWall.buildType = prov(() => {
		const ent = extendContent(Wall.WallBuild, rubyWall, {
			collision(b){
				this.super$collision(b);
		
				if(Mathf.chance(chance)){
		            Damage.createIncend(b.x, b.y, size * 4, 1);
				}
			}
		});
	
		return ent;
	});
	rubyWall.size = size;
	rubyWall.health = health;
	rubyWall.flashHit = true;
	rubyWall.flashColor = C.ruby;
	rubyWall.buildCostMultiplier = 5.0 + size;
	rubyWall.category = Category.defense;
	rubyWall.requirements = ItemStack.with(F.fi("ruby"), number); 
    rubyWall.buildVisibility = BuildVisibility.shown;
    F.techNode(child, rubyWall, ItemStack.with(F.fi("ruby"), number2)); 
	
	return rubyWall
};

const rubySmall = newRubyWall("ruby-wall", 0.1, 1, 275, 6, leadLarge, 250);
const rubyLarge = newRubyWall("ruby-wall-large", 0.25, 2, 1240, 24, rubySmall, 1000);
const rubyHuge = newRubyWall("ruby-wall-huge", 0.4, 3 , 3245, 125, rubyLarge, 3000);
const rubyGiant = newRubyWall("ruby-wall-giant", 0.6, 4, 6450, 245, rubyHuge, 10000);

function newLaculisWall(name, size, health, number, child, number2, lightningChance, lightningDamage, lightningLength){
	const laculisWall = extendContent(Wall, name, {});
	laculisWall.buildType = prov(() => {
		const ent = extendContent(Wall.WallBuild, laculisWall, {
			collision(b){
				this.super$collision(b);
		
				const vec = new Vec2();
				vec.trns(Angles.angle(this.x, this.y, b.x, b.y), this.size * Vars.tilesize);
		
				if(Mathf.chance(lightningChance)){
		            Lightning.create(this.team, C.laculisLight, lightningDamage, vec.x + this.x, vec.y + this.y, b.rotation + 180, lightningLength + Mathf.random(5.0));
				}
			}
		});
	
		return ent;
	});
	laculisWall.size = size;
	laculisWall.health = health;
	laculisWall.flashHit = true;
	laculisWall.flashColor = C.sapphireLight;
	laculisWall.category = Category.defense;
	laculisWall.requirements = ItemStack.with(F.fi("laculis"), number, F.fi("sapphire"), number); 
    laculisWall.buildVisibility = BuildVisibility.shown;
    F.techNode(child, laculisWall, ItemStack.with(F.fi("laculis"), number2, F.fi("sapphire"), number2)); 
	
	return laculisWall
};

const laculisWall = newLaculisWall("laculis-wall", 1, 180, 6, Blocks.phaseWallLarge, 250, 0.25, 25, 10);
const laculisWallLarge = newLaculisWall("laculis-wall-large", 2, 960, 24, laculisWall, 1000, 0.4, 45, 12);
const laculisWallHuge = newLaculisWall("laculis-wall-huge", 3, 2450, 125, laculisWallLarge, 3000, 0.6, 80, 15);
const laculisWallGiant = newLaculisWall("laculis-wall-giant", 4, 8240, 245, laculisWallHuge, 10000, 0.85, 150, 20);
