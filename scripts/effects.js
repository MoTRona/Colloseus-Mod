const C = this.global.COLORS;
const E = this.global.EFFECTS;
const F = require("func");
const gemColors = [C.rubyLight, C.emeraldLight, C.sapphireUnitDecalLight, C.angel, C.topazLight, C.amethystLight];
const gemColorsBack = [C.rubyDark, C.emeraldDark, C.sapphireUnitDecalDark, C.angelDark, C.topazDark, C.amethystDark];

const Distance = Core.camera.width + Core.camera.height + 30*Vars.tilesize;
function newSwEff(lifetime, startSize, multiplier, color1, color2, finion){
    const effect = new Effect(lifetime, e => {
	    Draw.color(color1, color2, e.fout());
	    Lines.stroke(startSize + multiplier * e.fout());
		Lines.swirl(e.x, e.y, startSize + multiplier * e.fin(), finion, 0);
	}); 
    return effect
}

function newCiEff(lifetime, startSize, multiplier, color1, color2){
    const effect = new Effect(lifetime, e => {
	    Draw.color(color1, color2, e.fout());
        Fill.circle(e.x, e.y, startSize + e.fout() * multiplier);
	}); 
    return effect
}

E.magicTrailSwirl = newSwEff(15, 0.3, 2.2, C.magicLight, C.magic, 10);
E.magicBulletTrail = new Effect(30, Distance, e => {
    Draw.color(C.magicLight, C.magic, e.fout());
    Lines.stroke(e.fout() * 2);
    const d = new Floatc2({get(x, y){
        Fill.circle(e.x, e.y, 0.1 + e.fout() * 2);
    }});
    Angles.randLenVectors(e.id, 8, 8, 0, 360, d);
});   

E.magicBulletHitTiny = new Effect(15, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(e.fout());
    Angles.randLenVectors(e.id, 4, 1.8 + e.fin() * 4.5, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 1.4 + 0.2);
    }}));
}); 

E.magicBulletHitSmall = new Effect(15, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(0.1 + e.fout() * 1.1);
    Angles.randLenVectors(e.id, 5, 2.6 + e.fin() * 6.8, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 2.2 + 0.6);
    }}));
}); 

E.magicBulletHit = new Effect(20, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(0.15 + e.fout() * 1.4);
    Angles.randLenVectors(e.id, 7, 3.2 + e.fin() * 10.2, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 2.8 + 0.75);
    }}));
}); 

E.magicBulletHitBig = new Effect(25, e => {
    Draw.color(C.magicLight, C.magicDark, e.fin());
    Lines.stroke(0.22 + e.fout() * 1.8);
    Angles.randLenVectors(e.id, 7, 4.5 + e.fin() * 14.0, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 3.4 + 0.9);
    }}));
})

E.magicShootEffectBig = new Effect(30, e => {
    Angles.randLenVectors(e.id, 9, 2.8 + e.fin() * 26.0, e.rotation, 22, new Floatc2({get(x, y){
        Draw.color(C.magicLight, C.magicDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.3 + e.fout() * 1.2, 45);
	}}))
});

E.magicShootEffect = new Effect(25, e => {
    Angles.randLenVectors(e.id, 6, 2.4 + e.fin() * 20.0, e.rotation, 15, new Floatc2({get(x, y){
        Draw.color(C.magicLight, C.magicDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 1.1, 45);
	}}))
});

E.magicShootEffectSmall = new Effect(20, e => {
    Angles.randLenVectors(e.id, 5, 2.0 + e.fin() * 16.0, e.rotation, 13, new Floatc2({get(x, y){
        Draw.color(Color.white, C.magic, e.fin());
        Fill.square(e.x + x, e.y + y, 0.16 + e.fout(), 45);
	}}))
});

E.yellowBallCharge = new Effect(120, Distance, e => {
    Draw.color(C.energy);
    Lines.stroke(e.fin() * 5.0);
    Lines.circle(e.x, e.y, 20.0 + e.fout() * 140.0);

    Angles.randLenVectors(e.id, 30, 80.0 * e.fout(), new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, e.fin() * 10.0);
    }}));

    Draw.color(C.energyLight);
    Fill.circle(e.x, e.y, e.fin() * 30.0);

    Draw.color();
    Fill.circle(e.x, e.y, e.fin() * 15);
});

E.giantYellowBallHitBig = new Effect(24, Distance, e => {
    Draw.color(C.energy);
	Angles.randLenVectors(e.id * 11, 8, e.fin() * 64.0, e.rotation, 360.0, new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 8 + 1.5);
    }}));

    Lines.stroke(e.fout() * 4.0);
    Lines.circle(e.x, e.y, 10.0 + e.fin() * 80.0);
});

E.giantYellowBallHitLarge = new Effect(38, Distance, e => {
    Draw.color(C.energy);
	Angles.randLenVectors(e.id * 11, 13, e.fin() * 120.0, e.rotation, 360.0, new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 12 + 3.0);
    }}));

    Lines.stroke(e.fout() * 8.0);
    Lines.circle(e.x, e.y, 20.0 + e.fin() * 100.0);
});

E.cutolCraft = new Effect(25, e => {
    Angles.randLenVectors(e.id, 8, 8 + e.fin() * 13, new Floatc2({get(x, y){
        Draw.color(Color.valueOf("#718DDB"), Color.valueOf("#4C5F93"), e.fin());
        Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 3, 45);
	}}));
});

E.photoniteCraft = new Effect(50, e => {
    Angles.randLenVectors(e.id, 20, 8 + e.fin() * 16, new Floatc2({get(x, y){
        Draw.color(gemColors[e.id % 6], gemColorsBack[e.id % 6], e.fin());
        Fill.square(e.x + x, e.y + y, 0.25 + e.fout() * 1.8, 45);
	}}))
});

E.energyBlastTiny = new Effect(30, e => {
    Angles.randLenVectors(e.id, 15, 4 + e.fin() * 10, new Floatc2({get(x, y){
        Draw.color(C.crystalizerDecalLight, C.crystalizerDecal, e.fin());
        Fill.circle(e.x + x, e.y + y, 0.1 + e.fout() * 1.3);
	}}))
});

E.orbonCraft = new Effect(25, e => {
    Angles.randLenVectors(e.id, 15, 4 + e.fin() * 10, new Floatc2({get(x, y){
        Draw.color(C.orbonLight, C.orbon, e.fin());
        Fill.circle(e.x + x, e.y + y, 0.4 + e.fout() * 1.3);
	}}))
});

E.contritumCraft = new Effect(40, e => {
    Angles.randLenVectors(e.id, 20, 5.0 + e.fin() * 16, new Floatc2({get(x, y){
        Draw.color(C.contritum, C.contritumDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.55 + e.fout() * 1.6, 90);
	}}))
});

E.contritumUpdate = new Effect(25, e => {
    Angles.randLenVectors(e.id, 10, 3.0 + e.fin() * 10.0, new Floatc2({get(x, y){
        Draw.color(C.contritum, C.contritumDark, e.fin());
        Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 1.1, 90);
	}}))
});

E.laserAdditionalEffect = new Effect(15, e => {
    Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fin());
    Fill.square(e.x , e.y, 0.8 + e.fout() * 2.0, Mathf.randomSeedRange(e.id, 360));
});

const energyShootsAngle = [-50, -25, 25, 50];
const energyShootsWidth = [7.6, 9.8, 9.8, 7.6];
const energyShootsHeight = [15.4, 22.8, 22.8, 15.4];
E.energyShrapnelShoot = new Effect(8, e => {
    for(var i = 0; i < 4; i++) {
	    Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fout());
	    Drawf.tri(e.x, e.y, 
            energyShootsWidth[i], 
            energyShootsHeight[i],
            e.rotation+(energyShootsAngle[i])
        );
    } 
});

E.rapierShoot = new Effect(7, e => {
    for(var i = 0; i < 4; i++) {
	    Draw.color(C.diamond, C.diamondDark, e.fout());
	    Drawf.tri(e.x, e.y, 
            energyShootsWidth[i], 
            energyShootsHeight[i],
            e.rotation+(energyShootsAngle[i])
        );
    } 
});

E.rapierSmoke = new Effect(20, e => {
    Angles.randLenVectors(e.id, 12, 8.0 + e.fin() * 80.0, e.rotation, 15, new Floatc2({get(x, y){
        Draw.color(C.diamond, C.diamondDark, e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 4.0 + 12.0 * e.fout());
	}}))
});

E.laculisAttraction = new Effect(18, e => {
    Angles.randLenVectors(e.id, 12, 6.0 + e.fout() * 12.0, 0.0, 360.0, new Floatc2({get(x, y){
        Draw.color(C.unitOrangeLight, C.unitOrange, e.fout());
        Lines.stroke(e.fin()*3.0);
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 2.0 + 8.0 * e.fin());
	}}))
});

E.spikeHit = new Effect(15, e => {
    Angles.randLenVectors(e.id, 4, 3.0 + e.fin() * 8.0, 0.0, 360.0, new Floatc2({get(x, y){
        Draw.color(C.diamond, C.diamondDark, e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1.0 + 2.5 * e.fout());
	}}))
});

E.spikeSmoke = new Effect(35, e => {
    Angles.randLenVectors(e.id, 20, 3.0 + e.fin() * 80.0, e.rotation, 15, new Floatc2({get(x, y){
        Draw.color(C.diamond, C.diamondDark, e.fout());
        Lines.stroke(e.fout()*4.0);
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1.0 + 3.0 * e.fout());
	}}))
});

const spikeTurretShootsAngle = [-55, -30, 30, 55];
const spikeTurretShootsWidth = [7.6, 9.8, 9.8, 7.6];
const spikeTurretShootsHeight = [16.2, 26.0, 26.0, 16.2];
E.spikeTurretShoot = new Effect(6, e => {
    for(var i = 0; i < 4; i++) {
	    Draw.color(C.diamond, C.diamondDark, e.fin());
	    Drawf.tri(e.x, e.y, 
            spikeTurretShootsWidth[i], 
            spikeTurretShootsHeight[i],
            e.rotation+(spikeTurretShootsAngle[i])
        );
    } 
});

E.smallSpikeHit = new Effect(15, e => {
    Angles.randLenVectors(e.id, 3, 1.5 + e.fin() * 6.0, e.rotation, 45.0, new Floatc2({get(x, y){
        Draw.color(C.diamond, C.diamondDark, e.fout());
	    Lines.stroke(2.0 * e.fout());
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 0.2 + 2.4 * e.fout());
	}}))
});

E.energyShrapnelSmoke = new Effect(20, e => {
    Angles.randLenVectors(e.id, 10, 6 + e.fin() * 200, e.rotation, 10, new Floatc2({get(x, y){
        Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fout());
        Fill.square(e.x + x, e.y + y, 0.2 + e.fout() * 1.1, 45);
	}}))
});

E.greenTinyHit = new Effect(10, e => {
    Draw.color(Pal.heal);
    Lines.stroke(1.2 * e.fout());
    Lines.circle(e.x, e.y, 0.8 + e.finpow() * 3.6);
});

E.redArtilleryHit = new Effect(14, e => {
    Draw.color(C.unitOrangeLight, C.unitOrangeDark, e.fin());
    Lines.stroke(0.5 + e.fout() * 2.2);
    Lines.circle(e.x, e.y, e.fin() * 80.0);

    Angles.randLenVectors(e.id, 8, 5.6 + e.fin() * 25.0, new Floatc2({get(x, y){
        var ang = Mathf.angle(x, y);
        Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 14.5 + 3.0);
	}}))
}); 

E.leviathanLaserCharge = new Effect(50, 100, e => {
    Draw.color(C.unitOrangeLight, C.unitOrangeDark);
	Angles.randLenVectors(e.id * 11, 30, e.fin() * 200, e.rotation, 360.0, new Floatc2({get(x, y){
		Fill.circle(e.x + x, e.y + y, e.fout() * 8.0 + 1.5);
    }}));

    Lines.stroke(e.fout() * 14.0);
    Lines.circle(e.x, e.y, 16.0 + e.fin() * 200.0);
});

E.blueSquare = new Effect(25, e => {
    Draw.color(Color.valueOf("#00A6FF"));
    Lines.stroke(3.0 * e.fslope());
    Lines.square(e.x, e.y, e.fin() * 120.0);
});

E.curseEffect = new Effect(33, e => {
    Draw.color(C.unitOrangeLight);
    Fill.circle(e.x, e.y, 0.5 + e.fout() * (0.5 + Mathf.randomSeedRange(e.id, 3.5)));
});

E.magicUnitDamage = new Effect(40, e => {
    Draw.color(C.magic);
    Draw.alpha(0.1 + 0.5*e.fout());
    Draw.rect(Core.atlas.find(e.data[0], Core.atlas.find("error")), e.x, e.y, e.rotation - e.data[1]);
    Draw.alpha(1.0);
});

E.thunderShoot = new Effect(50, e => {
    Angles.randLenVectors(e.id, 6, 10 + e.fin() * 80, e.rotation, 20, new Floatc2({get(x, y){
        Draw.color(Color.white, F.fi("topaz").color, e.fout());
        Fill.square(e.x + x, e.y + y, 0.5 + e.fout() * 2.5, 45);
	}}))
});

E.dischargeShoot = new Effect(35, e => {
    Angles.randLenVectors(e.id, 6, 4.0 + e.fin() * 30.0, e.rotation, 10, new Floatc2({get(x, y){
        Draw.color(Color.white, F.fi("topaz").color, e.fout());
        Fill.square(e.x + x, e.y + y, 0.4 + e.fout() * 1.5, 45);
	}}))
});

E.hitMovingLaser = new Effect(30, e => {
    Angles.randLenVectors(e.id, 3, 4 + e.fin() * 10.0, 0, 360.0, new Floatc2({get(x, y){
        Draw.color(Color.white, F.fi("topaz").color, e.fout());
        Fill.square(e.x + x, e.y + y, 0.5 + e.fout() * 1.2, 45);
	}}))
});

E.movingLaserOnExtend = new Effect(35, e => {
    Angles.randLenVectors(e.id, 3, 10.0 + e.fin() * 22.0, e.rotation, 10, new Floatc2({get(x, y){
        Draw.color(Color.white, F.fi("topaz").color, e.fout());
        Fill.square(e.x + x, e.y + y, 0.3 + e.fout(), 45);
	}}))
});

/////////

E.YellowBeamFlare = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 0.3);
  Draw.blend(Blending.additive);
  Draw.rect("collos-smoke", e.x, e.y, e.fin()*800, e.fin()*800*Mathf.random(1.5, 2.0));
  Draw.blend();
});       
      
E.YellowBeamFlare2 = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 1);
  Draw.blend(Blending.additive);
  Draw.rect("collos-smoke", e.x, e.y, 50, 50);
  Draw.blend();
});          
      
E.YellowBeamFlare3 = new Effect(30, e => {
  Draw.color(Color.valueOf("FFFFFF44"));
  Draw.alpha(e.fout() * 1);
  Draw.blend(Blending.additive);
  Draw.rect("collos-FlareWhite", e.x, e.y, 800*e.fin(), 800*e.fin());
  Draw.blend();
});    

E.YellowBeamChargeBegin = new Effect(30, 300, e => {
    Draw.color(F.fi("topaz").color, Color.white, e.fin());
    Lines.stroke(e.fin() * 5);
    Lines.circle(e.x, e.y, e.fout() * 60);

    Angles.randLenVectors(e.id, 4, 10 + 80 * e.fout(), e.rotation, 50, new Floatc2({get(x, y){
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 24);
    }}));
});  

E.YellowBeamCharge = new Effect(30, 300, e => {
    Draw.color(F.fi("topaz").color, Color.white, e.fin());
    Lines.stroke(e.fin() * 3.5);
    Lines.circle(e.x, e.y, e.fout() * 30.0);

    Angles.randLenVectors(e.id, 6, 15.0 + 200.0 * e.fout(), e.rotation, 15, new Floatc2({get(x, y){
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), e.fslope() * 24);
    }}));
});  

E.circleSpikeHit = new Effect(20, e => {
    Angles.randLenVectors(e.id, 7, 5.0 + e.fin() * 12.0, 0.0, 360.0, new Floatc2({get(x, y){
        Draw.color(C.diamond, C.diamondDark, e.fout());
        Lines.stroke(e.fout()*2.0);
        Lines.lineAngle(e.x + x, e.y + y, Mathf.angle(x, y), 1.2 + 3.2 * e.fout());
	}}))
});

E.materializerCraft = new Effect(40, e => {
    Angles.randLenVectors(e.id, 12, 1.0 + e.fin() * 5.0, 0.0, 360.0, new Floatc2({get(x, y){
        Draw.color(e.color.cpy().mul(0.9));
        Fill.square(e.x + x, e.y + y, 0.1 + 0.8 * e.fout(), 45);
	}}))
});

E.gemLaserHit = new Effect(20, e => {
    Angles.randLenVectors(e.id, 8, 4.0 + e.fin() * 14.0, 0, 360.0, new Floatc2({get(x, y){
        Draw.color(C.diamond, C.diamondDark, e.fout());
        Fill.square(e.x + x, e.y + y, 4.5 * e.fout(), 270.0 * e.fout());
	}}))
});

E.angelLight = new Effect(20, e => {
    Vars.renderer.lights.add(e.x, e.y, 4.0 + 20.0 * e.fout(), e.color, 0.8);
});

E.fireHit = new Effect(50, e => {
    Draw.color(Pal.lightFlame, Pal.darkFlame, Color.gray, e.fin());
    Angles.randLenVectors(e.id, 3, 4.0 + e.fin() * 14.0, 0, 360.0, new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, 0.4 + e.fout() * 1.6);
    }}))
});

E.fireHitBig = new Effect(50, e => {
    Draw.color(Pal.lightFlame, Pal.darkFlame, Color.gray, e.fin());
    Angles.randLenVectors(e.id, 3, 5.5 + e.fin() * 18.0, 0, 360.0, new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, 0.55 + e.fout() * 2.0);
    }}))
});

E.foxShoot = new Effect(30, e => {
    Draw.color(Pal.lightFlame, Pal.darkFlame, Color.gray, e.fin());
    Angles.randLenVectors(e.id, 4, 4.0 + e.fin() * 40.0, e.rotation, 15, new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, 0.4 + e.fout() * 1.4);
	}}))
});

E.napalmShoot = new Effect(40, e => {
    Draw.color(Pal.lightFlame, Pal.darkFlame, Color.gray, e.fin());
    Angles.randLenVectors(e.id, 2, 2.0 + e.fin() * 80.0, e.rotation, 15, new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, 0.5 + e.fout() * 1.8);
	}}))
});

E.burningIntensiveEffect = new Effect(55, e => {
    Draw.color(Pal.lightFlame, Pal.darkFlame, Color.gray, e.fin());
    Angles.randLenVectors(e.id, 3, 2.0 + e.fin() * 6.0, 90.0, 15.0, new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, 0.4 + e.fout() * 1.6);
	}}))
});

E.burningIntensiverEffect = new Effect(55, e => {
    Draw.color(Pal.lightFlame, Pal.darkFlame, Color.gray, e.fin());
    Angles.randLenVectors(e.id, 3, 3.0 + e.fin() * 8.0, 90.0, 25.0, new Floatc2({get(x, y){
        Fill.circle(e.x + x, e.y + y, 0.6 + e.fout() * 2.0);
	}}))
});
