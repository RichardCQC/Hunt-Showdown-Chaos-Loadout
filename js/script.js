//Variables for options
var rank = 100;
var maxSize = 5;
var generateWeapon1 = true;
var generateWeapon2 = true;
var generateTnc0 = true;
var generateTnc1 = true;
var generateTnc2 = true;
var generateTnc3 = true;
var generateTnc4 = true;
var generateTnc5 = true;
var generateTnc6 = true;
var generateTnc7 = true;
var allowDualWield = true;
var allowQuatermaster = false;
//var allowGunrunner = false;
var allowDuplicateWeapons = true;
var allowCustomAmmo = true;
var customAmmoPercentage = 50;
var sound = true;
var animation = true;
var forceMedkit = false;
var forceMelee = false;
var limitMelee = false;
var onlyShowWeapons = false;
var onlyBaseVariants = false;
var includescarce = true;
var loadoutPriceLimit;



//Variables for result
var weapon1 = null;
var weapon2 = null;
var weapon1Ammo1 = null;
var weapon1Ammo2 = null;
var weapon2Ammo1 = null;
var weapon2Ammo2 = null;
var tncs = [null, null, null, null, null, null, null, null];
var ammoTypeNone = new AmmoType ("img/ammo/none.png",0);


var remainingSize = 0;

//Data intialization
var gunFamilies = new Array( 
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "1865 Carbine", 70, "img/1865carbine.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(3, false, "1865 Carbine Aperture", 74, "img/1865carbine_ap.jpg", false, [new AmmoType("img/ammo/m.png",0),  new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(3, false, "1865 Carbine Silencer", 80, "img/1865carbine_sil.jpg", false, [new AmmoType("img/ammo/m.png",0),  new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-f.png", 50)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(5, false, "Auto-5", 600, "img/auto5.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(3, false, "Auto-4 Shorty", 300, "img/auto4.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Baseball Bat", 40, "img/bat.jpg", false, [ammoTypeNone]),
			new Gun(1, false, "Baseball Bat", 40, "img/bat.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Berthier 1892", 330, "img/berthier.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)]),
			new Gun(3, false, "Berthier 1892 Riposte", 340, "img/berthier_rip.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)]),
			new Gun(3, false, "Berthier 1892 Deadeye", 347, "img/berthier_dead.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)]),
			new Gun(3, false, "Berthier 1892 Marksman", 363, "img/berthier_mark.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Bomb Lance", 199, "img/bomblance.jpg", true, [new AmmoType("img/ammo/bomb.png", 0), new AmmoType("img/ammo/bomb-d.png", 10), new AmmoType("img/ammo/bomb-sl.png", 5), new AmmoType("img/ammo/bomb-wax.png", 50)]),
			new Gun(2, false, "Bomb Launcher", 110, "img/bomb_launch.jpg", true, [new AmmoType("img/ammo/bomb.png", 0), new AmmoType("img/ammo/bomb-d.png", 10), new AmmoType("img/ammo/bomb-sl.png", 5), new AmmoType("img/ammo/bomb-wax.png", 50)]) 
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Bornheim No. 3", 146, "img/bornheim.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, true, "Dual Bornheim No. 3", 292, "img/bornheim_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, false, "Bornheim No. 3 Match", 180, "img/bornheim_match.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(1, false, "Bornheim No. 3 Silencer", 167, "img/bornheim_sil.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, true, "Dual Bornheim No. 3 Silencer", 334, "img/bornheim_sil_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(1, false, "Bornheim No. 3 Extended", 203, "img/bornheim_ex.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, true, "Dual Bornheim No. 3 Extended", 406, "img/bornheim_ex_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "1890 Cavalry", 56, "img/cavalry.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-h.png", 35), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(3, false, "1890 Cavalry", 56, "img/cavalry.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-h.png", 35), new AmmoType("img/ammo/l-f.png", 60)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Cavalry Saber", 50, "img/saber.jpg", false, [ammoTypeNone]),
			new Gun(1, false, "Cavalry Saber", 50, "img/saber.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(4, false, "Centennial", 157, "img/centennial.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, false, "Centennial Shorty", 103, "img/centennial_sho.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(4, false, "Centennial Sniper", 181, "img/centennial_snip.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, false, "Centennial Shorty Silencer", 118, "img/centennial_sho_sil.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(4, false, "Centennial Trauma", 267, "img/centennial_trau.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, false, "Centennial Pointman", 114, "img/centennial_point.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Combat Axe", 40, "img/axe.jpg", false, [ammoTypeNone]),
			new Gun(2, false, "Combat Axe", 40, "img/axe.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Conversion", 55, "img/conversion.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual Conversion", 110, "img/conversion_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(1, false, "Conversion Chain", 84, "img/conversion_chain.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual Conversion Chain", 168, "img/conversion_chain_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(4, false, "Crossbow", 50, "img/crossbow.jpg", true, [new AmmoType("img/ammo/b.png", 0), new AmmoType("img/ammo/b-e.png", 35), new AmmoType("img/ammo/b-s.png", 40), new AmmoType("img/ammo/b-sb.png", 40)]),
			new Gun(4, false, "Crossbow Deadeye", 53, "img/crossbow_dead.jpg", true, [new AmmoType("img/ammo/b.png", 0), new AmmoType("img/ammo/b-e.png", 35), new AmmoType("img/ammo/b-s.png", 40), new AmmoType("img/ammo/b-sb.png", 40)]),
			new Gun(2, false, "Chu Ko Nu", 75, "img/chukonu.jpg", false, [new AmmoType("img/ammo/b.png", 0), new AmmoType("img/ammo/ckn-e.png", 50), new AmmoType("img/ammo/ckn-i.png", 25)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Dolch 96", 690, "img/dolch.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(4, true, "Dual Dolch 96", 1380, "img/dolch_dual.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(2, false, "Dolch 96 Claw", 700, "img/dolch_claw.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(4, true, "Dual Dolch 96 Claw", 1400, "img/dolch_claw_dual.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(2, false, "Dolch 96 Deadeye", 725, "img/dolch_dead.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(4, true, "Dual Dolch 96 Deadeye", 1450, "img/dolch_dead.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
			new Gun(3, false, "Dolch 96 Precision", 730, "img/dolch_prec.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)])
		)
	),
	new GunFamily(1, 2, new Array(
		new Gun(4, false, "Drilling", 510, "img/drilling.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60), new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 20), new AmmoType("img/ammo/s-p.png", 0)], new AmmoType("img/ammo/s-sl.png", 0)),
		new Gun(2, false, "Drilling Shorty", 330, "img/drilling_sho.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60), new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 20), new AmmoType("img/ammo/s-p.png", 0)], new AmmoType("img/ammo/s-sl.png", 0)),
		new Gun(2, false, "Drilling Hatchet", 340, "img/drilling_hatc.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60), new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 20), new AmmoType("img/ammo/s-p.png", 0)], new AmmoType("img/ammo/s-sl.png", 0))
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Frontier 73C", 41, "img/frontier.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false, "Frontier 73C Silencer", 47, "img/frontier_sil.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false, "Frontier 73C Marksman", 45, "img/frontier_mark.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Hand Crossbow", 30, "img/crossbow_hand.jpg", true, [new AmmoType("img/ammo/b.png", 0), new AmmoType("img/ammo/b-p.png", 25), new AmmoType("img/ammo/b-c.png", 10), new AmmoType("img/ammo/b-ch.png", 10), new AmmoType("img/ammo/bomb-d.png", 40)]),
			new Gun(1, false, "Hand Crossbow", 30, "img/crossbow_hand.jpg", true, [new AmmoType("img/ammo/b.png", 0), new AmmoType("img/ammo/b-p.png", 25), new AmmoType("img/ammo/b-c.png", 10), new AmmoType("img/ammo/b-ch.png", 10), new AmmoType("img/ammo/bomb-d.png", 40)])
		)
	),
	new GunFamily(1,2,new Array(
			new Gun(2, false, "Haymaker", 279, "img/haymaker.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-p.png", 60), new AmmoType("img/ammo/l-f.png", 60), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, false, "Haymaker", 279, "img/haymaker.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-p.png", 60), new AmmoType("img/ammo/l-f.png", 60), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)])
		)	
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Hunting Bow", 57, "img/bow.jpg", true, [new AmmoType("img/ammo/b.png",0), new AmmoType("img/ammo/a-p.png",25), new AmmoType("img/ammo/a-f.png", 70), new AmmoType("img/ammo/a-c.png", 30)]),
			new Gun(3, false, "Hunting Bow", 57, "img/bow.jpg", true, [new AmmoType("img/ammo/b.png",0), new AmmoType("img/ammo/a-p.png",25), new AmmoType("img/ammo/a-f.png", 70), new AmmoType("img/ammo/a-c.png", 30)])
		)
	),
	new GunFamily(1,4, new Array(
			new Gun(4, false, "Infantry 73L", 78, "img/infantry.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(4, false, "Infantry 73L ", 88, "img/infantry_bay.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(4, false, "Infantry 73L Sniper", 90, "img/infantry_snip.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Katana", 115, "img/katana.jpg", false, [ammoTypeNone]),
			new Gun(2, false, "Katana", 115, "img/katana.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Krag", 450, "img/krag.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(4, false, "Krag Bayonet", 460, "img/krag_bay.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(4, false, "Krag Sniper", 517, "img/krag_snip.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(4, false, "Krag Silencer", 517, "img/krag_snip.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "LeMat", 83, "img/lemat.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, true, "Dual LeMat", 166, "img/lemat_dual.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(3, false, "LeMat Carbine", 115, "img/lemat_carb.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(3, false, "LeMat Carbine Marksman", 127, "img/lemat_carb_mark.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Lebel 1886", 397, "img/lebel.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(4, false, "Lebel 1886 Aperture", 417, "img/lebel_aper.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(4, false, "Lebel 1886 Talon", 407, "img/lebel_talon.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(4, false, "Lebel 1886 Marksman", 437, "img/lebel_mark.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Machete", 30, "img/machete.jpg", false, [ammoTypeNone]),
			new Gun(1, false, "Machete", 30, "img/machete.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Mako 1895", 360, "img/mako.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(4, false, "Mako 1895 Claw", 370, "img/mako_claw.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(4, false, "Mako 1895 Aperture", 378, "img/mako_aper.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Marathon", 68, "img/marathon.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-h.png", 50), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(4, false, "Marathon Swift", 95, "img/marathon_swif.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-h.png", 50), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-p.png", 50)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Martini-Henry", 122, "img/martini.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-h.png", 35), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(4, false, "Martini-Henry Deadeye", 128, "img/martini_dead.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-h.png", 35), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(4, false, "Martini-Henry Riposte", 132, "img/martini_rip.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-h.png", 35), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(4, false, "Martini-Henry Marksman", 134, "img/martini_mark.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-h.png", 35), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(4, false, "Martini-Henry Ironside", 159, "img/martini_iron.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-h.png", 70), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60), new AmmoType("img/ammo/l-e.png", 100)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Maynard Sniper", 139, "img/maynard.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(5, false, "Maynard Sniper Silencer", 159, "img/maynard_sil.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Mosin-Nagant", 620, "img/mosin.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(4, false, "Mosin-Nagant Bayonet", 630, "img/mosin_bay.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(4, false, "Mosin-Nagant Sniper", 713, "img/mosin_snip.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(5, false, "Mosin-Nagant Avtomat", 1250, "img/mosin_avto.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Mosin Obrez", 290, "img/mosin_obrez.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(2, false, "Mosin Obrez Mace", 300, "img/mosin_obrez_mace.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(2, false, "Mosin Obrez Extended", 350, "img/mosin_obrez_ex.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(3, false, "Mosin Obrez Match", 345, "img/mosin_obrez_mat.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(3, false, "Mosin Obrez Sharpeye", 362, "img/mosin_obrez_sha.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Nagant M1895", 24, "img/nagant.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Nagant M1895", 48, "img/nagant_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, false, "Nagant M1895 Precision", 29, "img/nagant_prec.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(1, false, "Nagant M1895 Silencer", 27, "img/nagant_sil.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Nagant M1895 Silencer", 54, "img/nagant_sil_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, false, "Nagant M1895 Deadeye", 30, "img/nagant_prec_dead.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "New Army", 90, "img/new.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual New Army", 180, "img/new_dual.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(1, false, "New Army Swift", 108, "img/new_swif.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual New Army Swift", 216, "img/new_swif_dual.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)])
		)
	),
	new GunFamily(1, 5, new Array(
			new Gun(5, false, "Nitro Express", 1015, "img/nitro.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/n-d.png", 225), new AmmoType("img/ammo/n-e.png", 200)]),
			new Gun(5, false, "Nitro Express", 1015, "img/nitro.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/n-d.png", 225), new AmmoType("img/ammo/n-e.png", 200)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Officer", 96, "img/officer.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Officer", 192, "img/officer_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(1, false, "Officer Brawler", 106, "img/officer_braw.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Officer Brawler", 212, "img/officer_braw_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(3, false, "Officer Carbine", 183, "img/officer_carb.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(3, false, "Officer Carbine Deadeye", 192, "img/officer_carb_dead.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Pax", 80, "img/pax.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Pax", 160, "img/pax_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(1, false, "Pax Claw", 90, "img/pax_claw.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Pax Claw", 180, "img/pax_claw_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(1, false, "Pax Trueshot", 141, "img/pax_true.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Pax Trueshot", 282, "img/pax_true_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Railroad Hammer", 15, "img/hammer.jpg", false, [ammoTypeNone]),
			new Gun(2, false, "Railroad Hammer", 15, "img/hammer.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Ranger 73", 75, "img/ranger.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(4, false, "Ranger 73 Aperture", 79, "img/ranger_aper.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(4, false, "Ranger 73 Talon", 85, "img/ranger_talon.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(4, false, "Ranger 73 Swift", 128, "img/ranger_swif.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(4, false, "Rival 78", 150, "img/rival.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(2, false, "Rival 78 Shorty", 125, "img/rival_sho.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(4, false, "Rival 78 Trauma", 160, "img/rival_trau.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(2, false, "Rival 78 Mace", 135, "img/rival_mace.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)]),
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(4, false, "Romero 77", 66, "img/romero.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 5), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, false, "Romero 77 Shorty", 46, "img/romero_sho.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 5), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(4, false, "Romero 77 Talon", 76, "img/romero_talon.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 5), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, false, "Romero 77 Hatchet", 56, "img/romero_hatc.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 5), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(4, false, "Romero 77 Alamo", 98, "img/romero_al.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Scottfield", 77, "img/scottfield.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Scottfield", 154, "img/scottfield_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(1, false, "Scottfield Brawler", 87, "img/scottfield_brawl.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Scottfield Brawler", 174, "img/scottfield_brawl_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(1, false, "Scottfield Spitfire", 108, "img/scottfield_spit.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Scottfield Spitfire", 216, "img/scottfield_spit_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, false, "Scottfield Precision", 85, "img/scottfield_prec.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(1, false, "Scottfield Swift", 95, "img/scottfield_swif.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Scottfield Swift", 190, "img/scottfield_swif_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Slate", 333, "img/slate.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(4, false, "Slate Riposte", 343, "img/slate_rip.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(4, false, "Sparks", 130, "img/sparks.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(1, false, "Sparks Pistol", 155, "img/sparks_pis.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(2, true, "Dual Sparks Pistol", 310, "img/sparks_pis_dual.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(4, false, "Sparks Silencer", 149, "img/sparks_sil.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(4, false, "Sparks Sniper", 150, "img/sparks_snip.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(1, false, "Sparks Pistol Silencer", 178, "img/sparks_pis_sil.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(2, true, "Dual Sparks Pistol Silencer", 356, "img/sparks_pis_sil_dual.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/sub.png",20), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(4, false, "Specter 1882", 188, "img/specter.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(2, false, "Specter 1882 Shorty", 164, "img/specter_sho.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(4, false, "Specter 1882 Bayonet", 198, "img/specter_bay.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(4, false, "Springfield 1866", 38, "img/springfield.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(4, false, "Springfield 1866 Marksman", 42, "img/springfield_mark.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(2, false, "Springfield 1866 Shorty", 33, "img/springfield_sho.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(2, false, "Springfield 1866 Striker", 43, "img/springfield_striker.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(2, false, "Springfield 1866 Bullseye", 35, "img/springfield_dead.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(4, false, "Springfield 1866 Bayonet", 48, "img/springfield_bay.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(4, false, "Terminus", 238, "img/terminus.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(2, false, "Terminus Shorty", 218, "img/terminus_sho.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Uppercut", 310, "img/uppercut.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(4, true, "Dual Uppercut", 620, "img/uppercut_dual.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(3, false, "Uppercut Precision", 321, "img/uppercut_prec.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(3, false, "Uppercut Deadeye", 337, "img/uppercut_dead.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Vandal", 35, "img/vandal.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(2, false, "Vandal Striker", 45, "img/vandal_striker.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(2, false, "Vandal Bullseye", 37, "img/vandal_dead.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/sub.png",5), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Vetterli 71", 105, "img/vetterli.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Deadeye", 155, "img/vetterli_dead.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Marksman", 190, "img/vetterli_mark.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Bayonet", 130, "img/vetterli_bay.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Silencer", 120, "img/vetterli_sil.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(4, false, "Vetterli 71 Cyclone", 535, "img/vetterli_cyc.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Homestead 78", 0, "img/homestead.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 5), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(4, false, "Homestead 78", 0, "img/homestead.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 5), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 5), new AmmoType("img/ammo/s-sl.png", 65)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Wildland", 0, "img/wildland.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(4, false, "Wildland", 0, "img/wildland.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/sub.png",10), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 4, new Array(
			new Gun(4, false, "Shredder", 0, "img/shredder.jpg", false, [new AmmoType("img/ammo/saw.png",0)]),
			new Gun(4, false, "Shredder", 0, "img/shredder.jpg", false, [new AmmoType("img/ammo/saw.png",0)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Flame Rifle", 0, "img/flamerifle.jpg", false, [new AmmoType("img/ammo/f.png",0)]),
			new Gun(2, false, "Flame Rifle", 0, "img/flamerifle.jpg", false, [new AmmoType("img/ammo/f.png",0)])
		)
	)
);

var medkit = new Tool(1, "First Aid Kit", "none", 30, "img/medkit.jpg");
var toolList = new Array(
	medkit,
	new Tool(1,"Knife", "melee", 40,"img/knife.jpg"),
	new Tool(1, "Dusters", "melee", 30, "img/dusters.jpg"),
	new Tool(1, "Fusees", "none", 10, "img/fuses.jpg"),
	new Tool(1, "Choke Bombs", "none", 25, "img/choke.jpg"),
	new Tool(1, "Decoys","none", 6, "img/decoys.jpg"),
	new Tool(1, "Spyglass","none", 8, "img/spyglass.jpg"),
	new Tool(1, "Quad Derringer", "none", 30, "img/derringer.jpg"),
	new Tool(2, "Throwing Knives","none", 30, "img/throwing_knife.jpg"),
	new Tool(5, "Heavy Knife","melee", 20,"img/knife_heavy.jpg"),
	new Tool(8, "Throwing Axe","none", 50, "img/throwing_axe.jpg"),
	new Tool(17, "Derringer Pennyshot","none", 63, "img/derringer_pen.jpg"),
	new Tool(23, "Flare Pistol","none", 36, "img/flare.jpg"),
	new Tool(25, "Knuckle Knife","melee", 50, "img/knife_knuckle.jpg"),
	new Tool(29, "Concertina Trip Mines","none", 90, "img/trip_con.jpg"),
	new Tool(29, "Poison Trip Mine","none", 30, "img/trip_poison.jpg"),
	new Tool(33, "Throwing Spear","none", 80, "img/throwing_spear.jpg"),
	new Tool(35, "Bear Traps","none", 70, "img/bear.jpg"),
	new Tool(35, "Alert Trip Mine","none", 30, "img/trip_alert.jpg"),
	new Tool(52, "Blank Fire Decoys","none", 45, "img/decoys_blank.jpg"),
	new Tool(52, "Decoy Fuses","none", 30, "img/decoy_fuses.jpg")
);

var consumableList = new Array(
	new Consumable(46, "Dark Dynamite Satchel", "placeable", 100, "img/dynamite_dark.jpg"),
	new Consumable(1, "Ammo Box","placeable", 65, "img/ammo_box.jpg"),
	new Consumable(1, "Fire Bomb", "throw", 30, "img/firebomb.jpg"),
	new Consumable(1, "Medical Pack","placeable", 35, "img/medicalpack.jpg"),
	new Consumable(1, "Dynamite Stick", "throw", 18, "img/dynamite.jpg"),
	new Consumable(1, "Sticky Bomb", "throw", 64, "img/stickybomb.jpg"),
	new Consumable(1, "Weak Vitality Shot", "shot", 20, "img/shot_vit_weak.jpg"),
	new Consumable(1, "Weak Stamina Shot", "shot", 60, "img/shot_sta_weak.jpg"),
	new Consumable(1, "Weak Regeneration Shot", "shot", 65, "img/shot_reg_weak.jpg"),
	new Consumable(1, "Weak Antidote Shot", "shot", 30, "img/shot_ant_weak.jpg"),
	new Consumable(1, "Recovery Shot", "shot", 140, "img/shot_rec.jpg"),
	new Consumable(7, "Vitality Shot", "shot", 85, "img/shot_vit.jpg"),
	new Consumable(10, "Stamina Shot", "shot", 100, "img/shot_sta.jpg"),
	new Consumable(13, "Regeneration Shot", "shot", 110, "img/shot_reg.jpg"),
	new Consumable(15, "Dynamite Bundle", "throw", 75, "img/dynamite_bun.jpg"),
	new Consumable(19, "Waxed Dynamite Stick", "throw", 24, "img/dynamite_wax.jpg"),
	new Consumable(21, "Antidote Shot", "shot", 55, "img/shot_ant.jpg"),
	new Consumable(27, "Stalker Beetle", "throw", 45, "img/beetle.jpg"),
	new Consumable(31, "Chaos Bomb", "throw", 15, "img/chaos.jpg"),
	new Consumable(37, "Concertina Bomb", "throw", 48, "img/concertina.jpg"),
	new Consumable(39, "Poison Bomb", "throw", 25, "img/poisonbomb.jpg"),
	new Consumable(41, "Frag Bomb", "throw", 103, "img/fragbomb.jpg"),
	new Consumable(43, "Hellfire Bomb", "throw", 70, "img/firebomb_hell.jpg"),
	new Consumable(43, "Liquid Fire Bomb", "throw", 35, "img/firebomb_liquid.jpg"),
	new Consumable(46, "Choke Beetle", "throw", 22, "img/beetle_choke.jpg"),
	new Consumable(46, "Fire Beetle", "throw", 57, "img/beetle_fire.jpg"),
	new Consumable(48, "Hive Bomb", "throw", 40, "img/hivebomb.jpg"),
	new Consumable(50, "Flash Bomb", "throw", 25, "img/flashbomb.jpg"),
	new Consumable(55, "Tool Box", "placeable", 70, "img/toolbox.jpg"),
	new Consumable(58, "Big Dynamite Bundle", "throw", 110, "img/dynamite_bun_big.jpg"),
	new Consumable (1, "Tarrot Card", "tarrot", 0, "img/tarrot.jpg")
);

async function generateLoadout(){
	setParameterValues();
	if(animation){
		disableFormElements();
		var intervalLong = 300;
		var intervalShort= 150;
		for (i = 0; i < 3; i++) {
			playSound("tick");
			generate();
			await sleep (300);
		}
	
		for (i = 0; i < 15; i++) {
			playSound("tick");
			generate();
			await sleep (150);
		}
	
		for (i = 0; i < 2; i++) {
			playSound("tick");
			generate();
			await sleep (300);
		}
	
		await sleep (150);
		playSound("tick");
		playSound("found");
		generate();
		enableFormElements();
	} else {
		playSound("tick");
		generate();
	}
}

function playSound(soundToPlay){
	if(sound) {
		document.getElementById(soundToPlay).play();
	}
}

function disableFormElements(){
	document.getElementById("generate_loadout").disabled = true;
	document.getElementById("dual").disabled = true;
	document.getElementById("dup").disabled = true;
	document.getElementById("med").disabled = true;
	document.getElementById("quartermaster").disabled = true;
	document.getElementById("onlyshowweapons").disabled = true;
	document.getElementById("onlybase").disabled = true;
	document.getElementById("customammo").disabled = true;
	document.getElementById("rank").disabled = true;
	document.getElementById("sound").disabled = true;
	document.getElementById("anim").disabled = true;
}

function enableFormElements(){
	document.getElementById("generate_loadout").disabled = false;
	document.getElementById("dual").disabled = false;
	document.getElementById("dup").disabled = false;
	document.getElementById("med").disabled = false;
	document.getElementById("quartermaster").disabled = false;
	document.getElementById("onlyshowweapons").disabled = false;
	document.getElementById("onlybase").disabled = false;
	document.getElementById("customammo").disabled = false;
	document.getElementById("rank").disabled = false;
	document.getElementById("sound").disabled = false;
	document.getElementById("anim").disabled = false;
}

function generate() {
	setParameterValues();
	setMaxSize();
	if (rank <= 100 && rank >= 1) {
		var generationCount = 1;
		do{
			emptyStore();
			updateRemainingSize();
			if (generateWeapon1) {
				weapon1 = generateWeapon();
				updateRemainingSize();
			} 
			if (generateWeapon2) {
				weapon2 = generateWeapon();
				updateRemainingSize();
			}
			if (!onlyShowWeapons){
				randomizeTncs();
			}
			generationCount ++;
		} while(calculatePrice() > loadoutPriceLimit && generationCount < 10000);

		if (generateWeapon1) {
			if (weapon1 == null){
				document.getElementById("w1").src = "img/emptySmall.jpg";
				document.getElementById("w1").alt = "none";
				document.getElementById("w1a1").src = "img/ammo/none.png";
				document.getElementById("w1a2").src = "img/ammo/none.png";
			} else {
				document.getElementById("w1").src = weapon1.image;
				document.getElementById("w1").alt = weapon1.name;
				document.getElementById("w1a1").src = weapon1.ammo1.ammo;
				document.getElementById("w1a2").src = weapon1.ammo2.ammo;
			}
		}
		if (generateWeapon2) {
			if (weapon2 == null){
				document.getElementById("w2").src = "img/emptySmall.jpg";
				document.getElementById("w2").alt = "none";
				document.getElementById("w2a1").src = "img/ammo/none.png";
				document.getElementById("w2a2").src = "img/ammo/none.png";
			} else {
				document.getElementById("w2").src = weapon2.image;
				document.getElementById("w2").alt = weapon2.name;
				document.getElementById("w2a1").src = weapon2.ammo1.ammo;
				document.getElementById("w2a2").src = weapon2.ammo2.ammo;
			}
		}
		updateTncs();
		updateLoadoutPrice();
	}
}

function updateRemainingSize(){
	remainingSize = maxSize;
	if(weapon1 != null){
		remainingSize = remainingSize - weapon1.size;
	}
	if(weapon2 != null){
		remainingSize = remainingSize - weapon2.size;
	}
}

function emptyStore() {
	if(generateWeapon1){
		weapon1 = null;
	}
	if(generateWeapon2){
		weapon2 = null;
	}
	if(generateTnc0){
		tncs[0] = null;
	}
	if(generateTnc1){
		tncs[1] = null;
	}
	if(generateTnc2){
		tncs[2] = null;
	}
	if(generateTnc3){
		tncs[3] = null;
	}
	if(generateTnc4){
		tncs[4] = null;
	}
	if(generateTnc5){
		tncs[5] = null;
	}
	if(generateTnc6){
		tncs[6] = null;
	}
	if(generateTnc7){
		tncs[7] = null;
	}
}

function GunFamily(rank, minimumSize, guns){
	this.rank = rank;
	this.minimumSize = minimumSize;
	this.guns = guns;
}

function Gun(size, dualWield, name, price, image, singleShot, ammoTypes){
	this.size = size;
	this.dualWield = dualWield;
	this.name = name;
	this.price = price;
	this.image = image;
	this.singleShot = singleShot;
	this.baseAmmo = this.baseAmmo;
	this.ammoTypes = ammoTypes;
	this.ammo1 = null;
	this.ammo2 = null;
}

function AmmoType(ammo, price){
	this.ammo = ammo;
	this.price = price;
}

function Tool(rank, name, category, price, image){
	this.rank = rank;
	this.name = name;
	this.category = category;
	this.price = price;
	this.image = image;
}

function Consumable(rank, name, category, price, image){
	this.rank = rank;
	this.name = name;
	this.category = category;
	this.price = price;
	this.image = image;
}

function setMaxSize() {
	if (allowQuatermaster) {
		maxSize = 6;
	} else {
		maxSize = 5;
	}
}

function setParameterValues() {
	generateWeapon1 = document.getElementById("weapon1").checked;
	generateWeapon2 = document.getElementById("weapon2").checked;
	generateTnc0 = document.getElementById("tnc0").checked;
	generateTnc1 = document.getElementById("tnc1").checked;
	generateTnc2 = document.getElementById("tnc2").checked;
	generateTnc3 = document.getElementById("tnc3").checked;
	generateTnc5 = document.getElementById("tnc4").checked;
	generateTnc5 = document.getElementById("tnc5").checked;
	generateTnc6 = document.getElementById("tnc6").checked;
	generateTnc7 = document.getElementById("tnc7").checked;

	allowDualWield = document.getElementById("dual").checked;
	forceMedkit = document.getElementById("med").checked;
	forceMelee = document.getElementById("forcemelee").checked;
	limitMelee = document.getElementById("limitmelee").checked;
	allowQuatermaster = document.getElementById("quartermaster").checked;
	allowDuplicateWeapons = document.getElementById("dup").checked;
	allowCustomAmmo = document.getElementById("customammo").checked;
	sound = document.getElementById("sound").checked;
	animation = document.getElementById("anim").checked;
	rank = document.getElementById("rank").value;
	loadoutPriceLimit = document.getElementById("priceLimit").value;
	onlyShowWeapons = document.getElementById("onlyshowweapons").checked;
	onlyBaseVariants = document.getElementById("onlybase").checked;
	includescarce = document.getElementById("includescarce").checked;
}

function generateWeapon() {
	var weapon = null;
	var weaponCandidates = filterAvailableWeapons();
	if (weaponCandidates.length === 0){
		return weapon;
	}
	while (weapon == null) {
		weapon = weaponCandidates[getRandomInt(weaponCandidates.length)]
		if (!allowDuplicateWeapons) {
			if ((weapon1 != null && weapon.name == weapon1.name) || (weapon2 != null && weapon.name == weapon2.name)) {
				weapon = null;
			}
		}
		if (allowDualWield && weapon != null) {
			if (weapon.dualWield){
				if (Math.random() < 0.5){
					weapon = null;
				}
			}
		}
	}
	generateAmmo(weapon);
	return weapon;
}

function generateAmmo(weapon){
	weapon.ammo1 = weapon.ammoTypes[0];
		if(weapon.singleShot){
			if(weapon.name.includes("eMat") || weapon.name.includes("aymaker")){
				weapon.ammo2 = weapon.ammoTypes[3];
			} else if(weapon.name.includes("rilling")){
				weapon.ammo2 = weapon.ammoTypes[4]
			} else {
				weapon.ammo2 = weapon.ammoTypes[0];
			}
		} else {
			weapon.ammo2 = ammoTypeNone;
		}
		if(allowCustomAmmo && weapon.ammoTypes.length > 1){
			if (getRandomInt(100) >= customAmmoPercentage){
				if(weapon.name.includes("eMat") || weapon.name.includes("aymaker")){
					do {
						weapon.ammo1 = weapon.ammoTypes[getRandomInt(2)]
					} while(weapon.ammo1 == weapon.ammoTypes[0]);
				} else if(weapon.name.includes("rilling")){
					do {
						weapon.ammo1 = weapon.ammoTypes[getRandomInt(3)]
					} while(weapon.ammo1 == weapon.ammoTypes[0]);
				} else {
					do {
						weapon.ammo1 = weapon.ammoTypes[getRandomInt(weapon.ammoTypes.length)]
					} while(weapon.ammo1 == weapon.ammoTypes[0]);
				}
			}
			if (weapon.singleShot){
				if (getRandomInt(100) >= customAmmoPercentage){
					if(weapon.name.includes("eMat") || weapon.name.includes("aymaker")){
						var rand = 0;
						while(rand < 3){
							rand = getRandomInt(weapon.ammoTypes.length);
							weapon.ammo2 = weapon.ammoTypes[rand];
						}
					} else if(weapon.name.includes("rilling")){
						var rand = 0;
						while(rand < 4){
							rand = getRandomInt(weapon.ammoTypes.length);
							weapon.ammo2 = weapon.ammoTypes[rand];
						}
					} else {
						do {
							weapon.ammo2 = weapon.ammoTypes[getRandomInt(weapon.ammoTypes.length)]
						} while(weapon.ammo2 == weapon.ammoTypes[0]);
					}
				}
			}
		}
}

function filterAvailableWeapons(){
	var candidates = new Array();
	if (onlyBaseVariants){
		for(family of gunFamilies){
			if(family.guns[0].size <= remainingSize){
				if (includescarce || family.guns[0].price > 0){
					candidates.push(family.guns[0])
				}
			}
			if(family.guns[1].dualWield && family.guns[1].size <= remainingSize){
				if (allowDualWield) {
					if (includescarce || family.guns[1].price > 0){
						candidates.push(family.guns[1])
					}
				}
			}
		}
	}else {
		for (family of gunFamilies){
			if (family.rank <= rank && family.minimumSize <= remainingSize) {
				for (gun of family.guns){
					if (includescarce || gun.price > 0) {
						if (gun.size <= remainingSize) {
							if(gun.dualWield){
								if (allowDualWield) {
									candidates.push(gun)
								}
							} else {
								candidates.push(gun);
							}
						}
					}
				}
			}
		}
	}
	return candidates;
}

function randomizeTncs() {
	if(generateTnc0){
		tncs[0] = generateToolOrConsumable();
	}
	if(generateTnc1){
		tncs[1] = generateToolOrConsumable();
	}
	if(generateTnc2){
		tncs[2] = generateToolOrConsumable();
	}
	if(generateTnc3){
		tncs[3] = generateToolOrConsumable();
	}
	if(generateTnc4){
		tncs[4] = generateToolOrConsumable();
	}
	if(generateTnc5){
		tncs[5] = generateToolOrConsumable();
	}
	if(generateTnc6){
		tncs[6] = generateToolOrConsumable();
	}
	if(generateTnc7){
		tncs[7] = generateToolOrConsumable();
	}
	
}

function updateTncs() {
	for (let i = 0; i < 8; i++){
		var e = document.getElementById("tc" + i)
		if (tncs[i] != null){
			e.src = tncs[i].image;
			e.alt = tncs[i].name;
		} else {
			e.src = "img/emptySmall.jpg";
			e.alt = null;
		}
	}
}

function generateToolOrConsumable() {
	if(forceMedkit){
		if(!tncs.includes(medkit)){
			return medkit;
		}
	}
	if(forceMelee){
		if (!tncs.some(i => i instanceof Tool && i.category === "melee")){
			return generateMeleeTool();
		}
	}

	if(Math.random() < 0.5 && tncs.filter(i => i instanceof Tool).length < 6) { //Having more than tools would cause a problem for generation at rank 1.
		return generateTool();
	}

	return generateConsumable();
}

function generateMeleeTool(){
	var candidates = toolList.filter(i => i.category === "melee" && i.rank <= rank && !tncs.includes(i));
	return candidates[getRandomInt(candidates.length)];
}

function generateTool() {
	var candidates = toolList.filter(i => i.rank <= rank && !tncs.includes(i));
	if(limitMelee && tncs.filter(i => i instanceof Tool && i.category === "melee").length > 0){
		candidates = candidates.filter(i => i.category !== "melee");
	}
	return candidates[getRandomInt(candidates.length)];
}
function generateConsumable() {
	var candidates = consumableList.filter(i => i.rank <= rank && tncs.filter(t => t instanceof Consumable && t.category == i.category).length < 4);
	return candidates[getRandomInt(candidates.length)];
}

function activateEvents() {
	var buttons = [].slice.call(document.getElementsByTagName("button"))
			.filter(btn => btn.type == "submit");
	buttons.forEach(function(btn) {
		btn.addEventListener("click", function(e) {
			switch (e.target.id) {
				case "generate_loadout":
					generateLoadout();
				break;
			}
		})
	});
}

function findFamilyOf(searching, sub, searchFor) {
	const index = searching.findIndex((family) => {
		return (family[sub].findIndex((item) => item.name === searchFor.name)) !== -1;
	});

	return (index !== -1 ? searching[index] : null);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function previous(toRoll){
	setParameterValues();
	if (toRoll == "weapon1") {
		var am1 = weapon1.ammo1;
		var am2 = weapon1.ammo2;

		if (generateWeapon1) {
			if (weapon1 == null) {
				initialName = " ";
			} else {
				initialName = weapon1.name;
			}
			setMaxSize();
			remainingSize = maxSize;
			if (weapon2 != null) {
				remainingSize = maxSize - weapon2.size;
			}
			for(family of gunFamilies){
				found = false;
				for (var i = family.guns.length - 1; i >= 0; i--) {
					if (found) {
						gun = family.guns[i];
						if (gun.size <= remainingSize) {
							if (!(gun.dualWield && !allowDualWield)) {
								if ((weapon2 != null && weapon2.name != gun.name) || weapon2 == null || (weapon2 != null && allowDuplicateWeapons)) {
									weapon1 = gun;
									break;
								}
							}
						}
					}
					if (weapon1 != null && family.guns[i].name == weapon1.name){
						found = true;
					}
				}
			}
			
			if (weapon1 !=null && initialName != weapon1.name){
				weapon1.ammo1 = am1;
				weapon1.ammo2 = am2;
				document.getElementById("w1").src = weapon1.image;
				document.getElementById("w1").alt = weapon1.name;
			}
		}
	}
	if (toRoll == "weapon2") {
		if (generateWeapon2) {
			var am1 = weapon1.ammo1;
			var am2 = weapon1.ammo2;
			if (weapon2 == null) {
				initialName = " ";
			} else {
				initialName = weapon2.name;
			}
			setMaxSize();
			remainingSize = maxSize;
			if (weapon1 != null) {
				remainingSize = maxSize - weapon1.size;
			}
			for(family of gunFamilies){
				found = false;
				for (var i = family.guns.length - 1; i >= 0; i--) {
					if (found) {
						gun = family.guns[i];
						if (gun.size <= remainingSize) {
							if (!(gun.dualWield && !allowDualWield)) {
								if ((weapon1 != null && weapon1.name != gun.name) || weapon1 == null || (weapon1 != null && allowDuplicateWeapons)) {
									weapon2 = gun;
									break;
								}
							}
						}
					}
					if (weapon2 !=null && family.guns[i].name == weapon2.name){
						found = true;
					}
				}
			}
			if (weapon2 !=null && initialName != weapon2.name){
				weapon2.ammo1 = am1;
				weapon2.ammo2 = am2;
				document.getElementById("w2").src = weapon2.image;
				document.getElementById("w2").alt = weapon2.name;
			}
		}
	}

	updateLoadoutPrice();
}

function reroll(toRoll){
	if (document.getElementById(toRoll).checked){
		setParameterValues();
		if (toRoll == "weapon1") {
			if (generateWeapon1) {	
				setMaxSize();
				weapon1 = null;
				remainingSize = maxSize;
				if (weapon2 != null) {
					remainingSize = maxSize - weapon2.size;
				}
				weapon1 = generateWeapon(); 
				document.getElementById("w1").src = weapon1.image;
				document.getElementById("w1").alt = weapon1.name;
				document.getElementById("w1a1").src = weapon1.ammo1.ammo;
				document.getElementById("w1a2").src = weapon1.ammo2.ammo;
				
			}
		}
		if (toRoll == "weapon2") {
			if (generateWeapon2) {	
				setMaxSize();
				weapon2 = null;
				remainingSize = maxSize;
				if (weapon1 != null) {
					remainingSize = maxSize - weapon1.size;
				}
				weapon2 = generateWeapon(); 
				document.getElementById("w2").src = weapon2.image;
				document.getElementById("w2").alt = weapon2.name;
				document.getElementById("w2a1").src = weapon2.ammo1.ammo;
				document.getElementById("w2a2").src = weapon2.ammo2.ammo;
			}
		}

		if (toRoll.substring(0, 3) == "tnc") {
			var num = parseInt(toRoll.substring(3));
			console.log(num)
			var prev = tncs[num]
			if(prev == medkit && forceMedkit){
				return;
			}
			while(tncs[num] == prev){
				tncs[num] = null;
				tncs[num] = generateToolOrConsumable();
			}
		}

		updateTncs();
		updateLoadoutPrice();
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function toggleChangelog(){
	var menu = document.getElementById("changelog");
	var container = document.getElementsByClassName("changelog-menu")[0];
	var homebutton = document.getElementById("homebutton");
	if (menu.style.display === "inline-block"){
		menu.style.display = "none";
		homebutton.style.display = "none";
		container.classList.remove("menu-open");
	} else {
		menu.style.display = "inline-block";
		homebutton.style.display = "inline-block";
		container.classList.add("menu-open");
	}
}

function toggleToolsAndConsumables(){
	var elements = document.getElementsByClassName("tnc");
	if (document.getElementById("onlyshowweapons").checked){
		tncs = [null,null,null,null,null,null,null,null];
		updateTncs();
		updateLoadoutPrice();
		for (let i = 0; i < elements.length; i++) {
			elements.item(i).style.display = "none";
		}
		
	} else {
		for (let i = 0; i < elements.length; i++) {
			elements.item(i).style.display = "inline-block";
		}
	}
	
}

function toggleShowOptions(){
	var text = document.getElementById("showOptionText");
	var container = document.getElementById("option-container");
	if(container.style.display === "block"){
		text.innerHTML = "Show Options"
		container.style.display = "none";
		text.style.borderBottomLeftRadius = "5px" ;
		text.style.borderBottomRightRadius = "5px" ;
	} else {
		container.style.display = "block";
		text.innerHTML = "Hide Options";
		text.style.borderBottomLeftRadius = "0px" ;
		text.style.borderBottomRightRadius = "0px" ;
	}
}

function calculatePrice(){
	var price = 0;
	if(weapon1 != null){
		price += weapon1.price;
		price += weapon1.ammo1.price;
		price += weapon1.ammo2.price;
	}
	if(weapon2 != null){
		price += weapon2.price;
		price += weapon2.ammo1.price;
		price += weapon2.ammo2.price;
	}
	for(let i = 0; i < 8; i++){
		if (tncs[i] != null){
			price += tncs[i].price;
		}
	}
	return price;
}

function updateLoadoutPrice(){
	var container = document.getElementById("under");
	if (container.style.display !== "block"){
		container.style.display = "block";
	}
	document.getElementById("priceTotal").innerText = calculatePrice();
}
