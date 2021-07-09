const F = require("func");
const time = 50;
this.global.bMusic = null;
var m = this.global.bMusic;

const Gramophone = extendContent(Block, "gramophone", {
    health: 100, 
	buildVisibility: BuildVisibility.shown, 
	size: 2,
	category: Category.effect,
	requirements: ItemStack.with(Items.silicon, 50, Items.titanium, 20, Items.copper, 75, Items.lead, 40), 
	hasPower: false, 
	hasItems: false, 
	destroyable: true, 
	hasLiquids: false, 
	configurable: true,
	update: true,
	sync: true, 
	expanded: true, 
	breakable: true,
	outputsLiquids: false, 
	consumesTap: true, 
	
	icons(){
		return [
			F.tex("gramophone"), 
			F.tex("gramophone-disk"), 
			F.tex("gramophone-rod-1"), 
			F.tex("gramophone-on-1"), 
		]
    }
});
Gramophone.buildType = () => extend(Building, {
	init(tile, team, shouldAdd, rotation){
		this.super$init(tile, team, shouldAdd, rotation);
		
		this.setOn(false);
		this.setDiskSpeed(0.0);
		this.setRod(1);
		this.setAngle(0.0);

		return this;
	}, 
	
	updateTile() {
		if(m != null) {
            this.setDiskSpeed(Mathf.lerpDelta(this.getDiskSpeed(), Mathf.num(m.isPlaying()), 0.01)); 
            
            this.addAngle(this.getDiskSpeed()*3.0);
            if(this.timer.get( time*(1-this.getDiskSpeed()) + time) ) this.setRod(this.getRod() == 4 ? 1 : this.getRod() + 1);
		} else if(this.getDiskSpeed() >= 0.01 && this.getRod() != 1 && m == null) {
            this.setDiskSpeed(Mathf.lerpDelta(this.getDiskSpeed(), 0, 0.01)); 
            
            this.addAngle(this.getDiskSpeed()*3.0);
            if(this.getRod() != 0) this.setRod(this.getRod() == 4 ? 1 : this.getRod() + 1)
        } 
    }, 
	
    drawD(x, y) {
        Draw.rect(F.tex("gramophone-icon"), x, y);
        Draw.rect(F.tex("gramophone-on-"+Mathf.num(this.getOn())), x, y);
        
        Draw.rect(F.tex("gramophone-disk"), x, y, this.getAngle());
        Draw.rect(F.tex("gramophone-rod-"+this.getRod()), x, y)
	},
	
    draw() { this.drawD(this.x, this.y) }, 
    drawPlace(x, y, rotation, valid){ this.drawD(x, y) }, 
	   
    buildConfiguration(table) {
	    table.button(
            cons(b => {
				b.image().size(20).color(Color.white);
			}), Styles.clearTransi, 
	        () => {
			    this.removeM();
	            this.setOn(false);
		    }
        ).size(40);
	
	    table.button(Icon.pause, Styles.clearTransi, () => {
		    if(m != null) {
                m.pause(true);
                this.setOn(false);
            } 
	    }).size(40);
	
	    table.button(Icon.play, Styles.clearTransi, () => {
		    if(m != null) {
                m.play();
                this.setOn(true);
            } 
	    }).size(40);
	
	    table.button(Icon.file , Styles.clearTransi, () => {
	        Vars.platform.showFileChooser(true, "mp3", 
                cons(f => {
			        try{
				        this.removeM();
                        
				        m = Core.audio.newMusic(f), 
				        m.setVolume(1)
	                } catch(err){
				        m = null
			        }
			    }) 
            ) 
        }).size(40)
	}, 

    onDestroyed() {
    	this.super$onDestroyed();
		this.removeM()
	}, 

    onRemoved() {
    	this.super$onRemoved();
		this.removeM()
	}, 
    
    removeM() {
		if(m != null) {
            m.stop();
            m = null
        }
	}, 
	
	writeBase(write){
		this.super$writeBase(write);

		write.i(this._rod);
		write.f(this._diskSpd);
		write.f(this._ang);
		write.bool(this._on);
	},

	readBase(read){
		this.super$readBase(read);

		this._rod = read.i();
		this._diskSpd = read.f();
		this._ang = read.f();
		this._on = read.bool();
	},

	setDiskSpeed(a){
		this._diskSpd = a;
	},

	getDiskSpeed(){
		return this._diskSpd;
	}, 

	setRod(a){
		this._rod = a;
	},

	getRod(){
		return this._rod;
	}, 

	setOn(a){
		this._on = a;
	},

	getOn(){
		return this._on;
	}, 

	setAngle(a){
		this._ang = a;
	},

	addAngle(a){
		this._ang += a;
	},

	getAngle(){
		return this._ang;
	}  
});


F.node(Blocks.container, Gramophone, ItemStack.with(Items.silicon, 3000, Items.titanium, 1250, Items.copper, 5500, Items.lead, 2500), Seq.with(new Objectives.SectorComplete(SectorPresets.nuclearComplex)));
