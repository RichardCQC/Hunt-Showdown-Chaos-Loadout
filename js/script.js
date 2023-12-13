//Variables for options
var rank = 100;
var maxSize = 4;
var generateWeapon1 = true;
var generateWeapon2 = true;
var allowDualWield = true;
var allowQuatermaster = false;
var allowDuplicateWeapons = true;
var allowCustomAmmo = true;
var customAmmoPercentage = 50;
var sound = true;
var animation = true;
var forceMedkit = false;
var loadoutPriceLimit;

//Variables for result
var weapon1 = null;
var weapon2 = null;
var weapon1Ammo1 = null;
var weapon1Ammo2 = null;
var weapon2Ammo1 = null;
var weapon2Ammo2 = null;
var ammoTypeNone = new AmmoType ("img/ammo/none.png",0);

// store the actual values of tools/consumables
var store = {
	tools: [null, null, null, null],
	consumables: [null, null, null, null],
	weapon: [null, null]
};

// store which slots need updating
var updateStack = {
	tools: [],
	consumables: [],
	weapons: [], /* not used, but needed for checkboxes */
};

var remainingSize = 0;

//Data intialization
var gunFamilies = new Array( 
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Winfield M1873C", 41, "img/winfieldc.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false,"Winfield M1873C Silencer", 55, "img/winfieldc_sup.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false, "Winfield M1873C Marksman", 56, "img/winfieldc_mark.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(2, false, "Winfield M1873C Vandal", 35, "img/winfieldc_van.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(2, false, "Winfield M1873C Vandal Striker", 39, "img/winfieldc_van_str.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(2, false, "Winfield M1873C Vandal Deadeye", 45, "img/winfieldc_van_dead.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Springfield 1866", 38, "img/springfield.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(3, false, "Springfield 1866 Marksman", 73, "img/springfield_mark.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(2, false, "Springfield 1866 Compact", 33, "img/springfield_com.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(2, false, "Springfield 1866 Compact Striker", 47, "img/springfield_com_str.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(2, false, "Springfield 1866 Compact Deadeye", 46, "img/springfield_com_dead.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)]),
			new Gun(3, false, "Springfield 1866 Bayonet", 54, "img/springfield_bay.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 25), new AmmoType("img/ammo/m-p.png", 25), new AmmoType("img/ammo/m-e.png", 45), new AmmoType("img/ammo/m-h.png", 30)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Vetterli 71 Karabiner", 105, "img/vetterli.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Karabiner Deadeye", 155, "img/vetterli_dead.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Karabiner Marksman", 190, "img/vetterli_mark.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Karabiner Bayonet", 130, "img/vetterli_bay.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Karabiner Silencer", 150, "img/vetterli_sup.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(3, false, "Vetterli 71 Karabiner Cyclone", 535, "img/vetterli_cyc.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Martini-Henry IC1", 122, "img/martini.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(3, false, "Martini-Henry IC1 Deadeye", 140, "img/martini_dead.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(3, false, "Martini-Henry IC1 Riposte", 157, "img/martini_rip.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(3, false, "Martini-Henry IC1 Marksman", 157, "img/martini_mark.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)]),
			new Gun(3, false, "Martini-Henry IC1 Ironside", 159, "img/martini_ir.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-e.png", 50)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Sparks LRR", 130, "img/sparks.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(3, false, "Sparks LRR Silencer", 150, "img/sparks_sup.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
			new Gun(3, false, "Sparks LRR Sniper", 199, "img/sparks_snip.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Winfield M1873", 75, "img/winfield.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false, "Winfield M1873 Aperture", 80, "img/winfield_ap.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false, "Winfield M1873 Talon", 100, "img/winfield_tal.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false, "Winfield M1873 Swift", 128, "img/winfield_swi.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)]),
			new Gun(3, false, "Winfield M1873 Musket", 87, "img/winfield_mus.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-f.png", 50), new AmmoType("img/ammo/c-p.png", 50)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Lebel 1886", 397, "img/lebel.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(3, false, "Lebel 1886 Aperture", 425, "img/lebel_ap.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(3, false, "Lebel 1886 Talon", 422, "img/lebel_tal.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)]),
			new Gun(3, false, "Lebel 1886 Marksman", 607, "img/lebel_mark.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 150)])
		)
	),
	new GunFamily(1, 2, new Array(
		new Gun(3, false, "Winfield M1876 Centennial", 157, "img/cent.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(2, false, "Winfield M1876 Centennial Shorty", 103, "img/cent_sho.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(3, false, "Winfield M1876 Centennial Sniper", 229, "img/cent_snip.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(2, false, "Winfield M1876 Centennial Shorty Silencer", 137, "img/cent_sho_sil.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(3, false, "Winfield M1876 Centennial Trauma", 200, "img/cent_tra.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 2, new Array(
		new Gun(2, false, "Hunting Bow", 57, "img/bow.jpg", true, [new AmmoType("img/ammo/b.png",0), new AmmoType("img/ammo/a-p.png",25), new AmmoType("img/ammo/a-f.png", 70), new AmmoType("img/ammo/a-c.png", 30)])
		)
	),
	new GunFamily(1, 3, new Array(
		new Gun(3, false, "Berthier Mle 1892", 356, "img/berthier.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)]),
		new Gun(3, false, "Berthier Mle 1892 Riposte", 370, "img/berthier_ri.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)]),
		new Gun(3, false, "Berthier Mle 1892 Deadeye", 388, "img/berthier_dead.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)]),
		new Gun(3, false, "Berthier Mle 1892 Marksman", 580, "img/berthier_mark.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png",35), new AmmoType("img/ammo/l-s.png", 75)])
		)
	),
	new GunFamily(1, 2, new Array(
		new Gun(3, false, "Drilling", 510, "img/drilling.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 20), new AmmoType("img/ammo/s-p.png", 0)], new AmmoType("img/ammo/s-sl.png", 0)),
		new Gun(2, false, "Drilling Handcannon", 430, "img/drilling_hand.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 20), new AmmoType("img/ammo/s-p.png", 0)], new AmmoType("img/ammo/s-sl.png", 0)),
		new Gun(2, false, "Drilling Hatchet", 450, "img/drilling_hatc.jpg", true, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 20), new AmmoType("img/ammo/s-p.png", 0)], new AmmoType("img/ammo/s-sl.png", 0))
		)
	),
	new GunFamily(1, 3, new Array(
		new Gun(3, false, "Springfield M1892 Krag", 376, "img/krag.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60)]),
		new Gun(3, false, "Springfield M1892 Krag Bayonet", 391, "img/krag_bay.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60)]),
		new Gun(3, false, "Springfield M1892 Krag Sniper", 579, "img/krag_snip.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-f.png", 60)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Mosin-Nagant M1891", 490, "img/mosin.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 220)]),
			new Gun(2, false, "Mosin-Nagant M1891 Obrez", 290, "img/mosin_obr.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 220)]),
			new Gun(3, false, "Mosin-Nagant M1891 Bayonet", 507, "img/mosin_bay.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 220)]),
			new Gun(2, false, "Mosin-Nagant M1891 Obrez Mace", 310, "img/mosin_obr_mace.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 220)]),
			new Gun(3, false, "Mosin-Nagant M1891 Sniper", 730, "img/mosin_snip.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 220)]),
			new Gun(2, false, "Mosin-Nagant M1891 Obrez Drum", 350, "img/mosin_obr_drum.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 220)]),
			new Gun(3, false, "Mosin-Nagant M1891 Avtomat", 1250, "img/mosin_avto.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-s.png", 220)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Nitro Express Rifle", 1015, "img/nitro.jpg", false, [new AmmoType("img/ammo/n.png",0), new AmmoType("img/ammo/n-d.png", 225), new AmmoType("img/ammo/n-e.png", 200)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Nagant M1895", 24, "img/nagant.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Nagant M1895", 48, "img/nagant_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, false, "Nagant M1895 Precision", 29, "img/nagant_prec.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(1, false, "Nagant M1895 Silencer", 93, "img/nagant_sup.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Nagant M1895 Silencer", 186, "img/nagant_sup_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, false, "Nagant M1895 Deadeye", 42, "img/nagant_prec_dead.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)])
		)
	),
	new GunFamily(1, 1, new Array(
		new Gun(1, false, "Scottfield No.3", 77, "img/scottfield.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(2, true, "Dual Scottfield No.3", 154, "img/scottfield_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(1, false, "Scottfield No.3 Spitfire", 108, "img/scottfield_spit.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(2, true, "Dual Scottfield No.3 Spitfire", 216, "img/scottfield_spit_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(2, false, "Dual Scottfield No.3 Precision", 85, "img/scottfield_prec.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(1, false, "Scottfield No.3 Swift", 95, "img/scottfield_swi.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)]),
		new Gun(2, true, "Dual Scottfield No.3 Swift", 190, "img/scottfield_swi_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-f.png", 50), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-h.png", 60)])
	)
),
new GunFamily(1, 1, new Array(
	new Gun(1, false, "Sparks Pistol", 155, "img/sparks_pistol.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)]),
	new Gun(2, true, "Dual Sparks Pistol", 310, "img/sparks_pistol_dual.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 35), new AmmoType("img/ammo/l-f.png", 30), new AmmoType("img/ammo/l-p.png", 30)])
	)
),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Caldwell 92 New Army", 90, "img/new.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual Caldwell 92 New Army", 180, "img/new_dual.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(1, false, "Caldwell 92 New Army Swift", 108, "img/new_swi.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual Caldwell 92 New Army Swift", 216, "img/new_swi_dual.jpg", false,  [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)])
		)
),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Caldwell Pax", 80, "img/pax.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 90), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Caldwell Pax", 160, "img/pax_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 90), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(1, false, "Caldwell Pax Claw", 105, "img/pax_claw.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 90), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Caldwell Pax Claw", 210, "img/pax_claw_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 90), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(1, false, "Caldwell Pax Trueshot", 141, "img/pax_true.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 90), new AmmoType("img/ammo/m-h.png", 60)]),
			new Gun(2, true, "Dual Caldwell Pax Trueshot", 282, "img/pax_true_dual.jpg", false, [new AmmoType("img/ammo/m.png",0), new AmmoType("img/ammo/m-i.png", 40), new AmmoType("img/ammo/m-p.png", 50), new AmmoType("img/ammo/m-d.png", 90), new AmmoType("img/ammo/m-h.png", 60)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Caldwell Conversion Pistol", 55, "img/conversion.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual Caldwell Conversion Pistol", 110, "img/conversion_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(1, false, "Caldwell Conversion Chain Pistol", 84, "img/conversion_chain.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(2, true, "Dual Caldwell Conversion Chain Pistol", 168, "img/conversion_chain_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-d.png", 50), new AmmoType("img/ammo/c-f.png", 50)]),
			new Gun(1, false, "Caldwell Conversion Upercut", 414, "img/conversion_up.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(2, true, "Dual Caldwell Conversion Upercut", 828, "img/conversion_up_dual.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(2, false, "Caldwell Conversion Upercut Precision", 425, "img/conversion_up_prec.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)]),
			new Gun(2, false, "Caldwell Conversion Upercut Precision", 453, "img/conversion_up_prec_dead.jpg", false, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-i.png", 70), new AmmoType("img/ammo/l-e.png", 100), new AmmoType("img/ammo/l-f.png", 60)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Bornheim No. 3", 146, "img/bornheim.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, true, "Dual Bornheim No. 3", 292, "img/bornheim_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(1, false, "Bornheim No. 3 Extended", 203, "img/bornheim_ext.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, true, "Dual Bornheim No. 3 Extended", 406, "img/bornheim_ext_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, false, "Bornheim No. 3 Match", 180, "img/bornheim_match.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(1, false, "Bornheim No. 3 Silencer", 174, "img/bornheim_sup.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)]),
			new Gun(2, true, "Dual Bornheim No. 3 Silencer", 348, "img/bornheim_sup_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 40), new AmmoType("img/ammo/c-h.png", 60)])
			)
		),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Nagant M1895 Officer", 96, "img/officer.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Nagant M1895 Officer", 192, "img/officer_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(1, false, "Nagant M1895 Officer Brawler", 110, "img/officer_bra.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(2, true, "Dual Nagant M1895 Officer Brawler", 220, "img/officer_bra_dual.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(3, false, "Nagant M1895 Officer Carbine", 155, "img/officer_carb.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)]),
			new Gun(3, false, "Nagant M1895 Officer Carbine Deadeye", 155, "img/officer_carb_dead.jpg", false, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-p.png", 50), new AmmoType("img/ammo/c-h.png", 60), new AmmoType("img/ammo/c-d.png", 50)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "LeMat Mark II Revolver", 83, "img/lemat.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, true, "Dual LeMat Mark II Revolver", 166, "img/lemat_dual.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(3, false, "LeMat Mark II Carbine", 115, "img/lemat_carb.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, false, "LeMat Mark II UpperMat", 370, "img/lemat_up.jpg", true, [new AmmoType("img/ammo/l.png",0), new AmmoType("img/ammo/l-p.png", 60), new AmmoType("img/ammo/l-f.png", 60), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(3, false, "LeMat Mark II Carbine Marksman", 134, "img/lemat_carb.jpg", true, [new AmmoType("img/ammo/c.png",0), new AmmoType("img/ammo/c-i.png", 20), new AmmoType("img/ammo/c-f.png", 25), new AmmoType("img/ammo/s.png",0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-sl.png", 65)])
		)
	),
	new GunFamily(1, 1, new Array(
		new Gun(1, false, "Dolch 96", 690, "img/dolch.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
		new Gun(2, true, "Dual Dolch 96", 1380, "img/dolch_dual.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
		new Gun(2, false, "Dolch 96 Precision", 730, "img/dolch_prec.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
		new Gun(1, false, "Dolch 96 Claw", 710, "img/dolch_claw.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
		new Gun(2, true, "Dual Dolch 96 Claw", 1420, "img/dolch_claw_dual.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
		new Gun(1, false, "Dolch 96 Deadeye", 780, "img/dolch_dead.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)]),
		new Gun(2, true, "Dual Dolch 96 Deadeye", 1560, "img/dolch_dead.jpg", false, [new AmmoType("img/ammo/dolch.png",0), new AmmoType("img/ammo/m-d.png", 50), new AmmoType("img/ammo/m-f.png", 50)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Romero 77", 34, "img/romero.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, false, "Romero 77 Handcannon", 46, "img/romero_hand.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(3, false, "Romero 77 Talon", 84, "img/romero_tal.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(2, false, "Romero 77 Hatchet", 82, "img/romero_hatc.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 65)]),
			new Gun(3, false, "Romero 77 Alamo", 98, "img/romero_ala.jpg", true, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-s.png", 10), new AmmoType("img/ammo/s-d.png", 10), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 65)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Caldwell Rival 78", 150, "img/rival.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(2, false, "Caldwell Rival 78 Handcannon", 125, "img/rival_hand.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Specter 1882", 188, "img/specter.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(2, false, "Specter 1882 Compact", 164, "img/specter_com.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(3, false, "Specter 1882 Bayonet", 211, "img/specter_bay.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-d.png", 20), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Winfield 1893 Slate", 333, "img/slate.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(3, false, "Winfield 1893 Slate Riposte", 359, "img/slate_rip.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),	
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Winfield 1887 Terminus", 238, "img/terminus.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)]),
			new Gun(2, false, "Winfield 1887 Terminus Handcannon", 289, "img/terminus_hand.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-f.png", 40), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Crown And King Auto-5", 600, "img/crown.jpg", false, [new AmmoType("img/ammo/s.png", 0), new AmmoType("img/ammo/s-p.png", 10), new AmmoType("img/ammo/s-sl.png", 130)])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Combat Axe", 15, "img/axe.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Katana", 115, "img/katana.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Railroad Hammer", 15, "img/hammer.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Baseball Bat", 40, "img/baseball.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Machete", 18, "img/machete.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Cavalry Saber", 60, "img/saber.jpg", false, [ammoTypeNone])
		)
	),
	new GunFamily(1, 3, new Array(
			new Gun(3, false, "Bomb Lance", 199, "img/bomb_lance.jpg", false, [new AmmoType("img/ammo/bomb.png", 0), new AmmoType("img/ammo/bomb-d.png", 10), new AmmoType("img/ammo/bomb-sl.png", 5)])
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Hand Crossbow", 30, "img/crossbow_hand.jpg", true, [new AmmoType("img/ammo/b.png", 0), new AmmoType("img/ammo/b-p.png", 25), new AmmoType("img/ammo/b-c.png", 10), new AmmoType("img/ammo/b-ch.png", 10)]),
			new Gun(3, false, "Crossbow", 50, "img/crossbow.jpg", true, [new AmmoType("img/ammo/b.png", 0), new AmmoType("img/ammo/b-e.png", 35), new AmmoType("img/ammo/b-s.png", 40)]),
		)
	)
);

var medkit = new Tool(1, "First Aid Kit", 30, "img/aid.jpg");
var toolList = new Array(
	medkit,
	new Tool(1,"Knife", 40,"img/knife.jpg"),
	new Tool(1, "Dusters", 30, "img/dusters.jpg"),
	new Tool(1, "Electric Lamp", 5, "img/lamp.jpg"),
	new Tool(1, "Fusees", 5, "img/fusees.jpg"),
	new Tool(1, "Choke Bomb", 25, "img/choke.jpg"),
	new Tool(1, "Decoys", 6, "img/decoy.jpg"),
	new Tool(1, "Spyglass", 8, "img/spyglass.jpg"),
	new Tool(1, "Quad Derringer", 30, "img/derringer.jpg"),
	new Tool(2, "Throwing Knives", 30, "img/knife_throw.jpg"),
	new Tool(5, "Heavy Knife", 20,"img/knife_heavy.jpg"),
	new Tool(8, "Throwing Axe", 50, "img/axe_throw.jpg"),
	new Tool(17, "Derringer Pennyshot", 63, "img/derringer_pen.jpg"),
	new Tool(23, "Flare Pistol", 36, "img/flare.jpg"),
	new Tool(25, "Knuckle Knife", 50, "img/knuckle.jpg"),
	new Tool(29, "Concertina Trip Mine", 90, "img/trip_con.jpg"),
	new Tool(29, "Poison Trip Mine", 30, "img/trip_poi.jpg"),
	new Tool(35, "Alert Trip Mine", 30, "img/trip_alert.jpg"),
	new Tool(52, "Blank Fire Decoys", 45, "img/decoy_blank.jpg"),
	new Tool(52, "Decoy Fuses", 30, "img/decoy_fuses.jpg")
);

var consumableList = new Array(
	new Consumable(1, "Ammo Box", 65, "img/ammo.jpg"),
	new Consumable(1, "Fire Bomb", 30, "img/fire.jpg"),
	new Consumable(1, "Medical Pack", 35, "img/medpack.jpg"),
	new Consumable(1, "Dynamite Stick", 18, "img/dynamite.jpg"),
	new Consumable(1, "Sticky Bomb", 64, "img/sticky.jpg"),
	new Consumable(1, "Weak Vitality Shot", 20, "img/vitality_weak.jpg"),
	new Consumable(1, "Weak Stamina Shot", 60, "img/stamina_weak.jpg"),
	new Consumable(1, "Weak Regeneration Shot", 65, "img/regen_weak.jpg"),
	new Consumable(1, "Weak Antidote Shot", 30, "img/antidote_weak.jpg"),
	new Consumable(7, "Vitality Shot", 85, "img/vitality.jpg"),
	new Consumable(10, "Stamina Shot", 100, "img/stamina.jpg"),
	new Consumable(13, "Regeneration Shot", 110, "img/regen.jpg"),
	new Consumable(15, "Dynamite Bundle", 75, "img/dynamite_bun.jpg"),
	new Consumable(19, "Waxed Dynamite Stick", 24, "img/dynamite_wax.jpg"),
	new Consumable(21, "Antidote Shot", 55, "img/antidote.jpg"),
	new Consumable(27, "Stalker Beetle", 45, "img/stalker.jpg"),
	new Consumable(31, "Chaos Bomb", 15, "img/chaos.jpg"),
	new Consumable(37, "Concertina Bomb", 48, "img/concertina.jpg"),
	new Consumable(39, "Poison Bomb", 25, "img/poison.jpg"),
	new Consumable(41, "Frag Bomb", 103, "img/frag.jpg"),
	new Consumable(43, "Hellfire Bomb", 70, "img/fire_hell.jpg"),
	new Consumable(43, "Liquid Fire Bomb", 35, "img/fire_liq.jpg"),
	new Consumable(46, "Choke Beetle", 22, "img/stalker_cho.jpg"),
	new Consumable(46, "Fire Beetle", 57, "img/stalker_fire.jpg"),
	new Consumable(48, "Hive Bomb", 40, "img/hive.jpg"),
	new Consumable(50, "Flash Bomb", 25, "img/flash.jpg"),
	new Consumable(55, "Tool Box", 70, "img/toolbox.jpg"),
	new Consumable(58, "Big Dynamite Bundle", 110, "img/dynamite_big.jpg")
);

function randomizeSlots() {
	Object.keys(updateStack).forEach(function(key) {
		updateStack[key].forEach(function(num) {
			switch (key) {
				case "tools":
					store[key][(num-1)] = generateTool();
					break;
				case "consumables":
					store[key][(num-1)] = generateConsumable();
					break;
			}
		})
	});
}

function updateSlots() {
	Object.keys(updateStack).forEach(function(key) {
		if(key != "weapons"){
		updateStack[key].forEach(function(num) {
			var e = document.getElementById(key.substr(0,1)+num);
			if (store[key][(num-1)] != null) {
				e.src = store[key][(num-1)].image;
				e.alt = store[key][(num-1)].name;
			}
		})
	}});
}

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
			randomizeSlots();
			generationCount ++;
		} while(calculatePrice() > loadoutPriceLimit && generationCount < 10000);

		if (generateWeapon1) {
			document.getElementById("w1").src = weapon1.image;
			document.getElementById("w1").alt = weapon1.name;
			document.getElementById("w1a1").src = weapon1.ammo1.ammo;
			document.getElementById("w1a2").src = weapon1.ammo2.ammo;
		}
		if (generateWeapon2) {
			document.getElementById("w2").src = weapon2.image;
			document.getElementById("w2").alt = weapon2.name;
			document.getElementById("w2a1").src = weapon2.ammo1.ammo;
			document.getElementById("w2a2").src = weapon2.ammo2.ammo;
		}
		updateSlots();
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
	if(weapon1 != null && generateWeapon1){
		weapon1 = null;
	}
	if(weapon2 != null && generateWeapon2){
		weapon2 = null;
	}
	store = {
		tools: [null, null, null, null],
		consumables: [null, null, null, null]
	};
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

function Tool(rank, name, price, image){
	this.rank = rank;
	this.name = name;
	this.price = price;
	this.image = image;
}

function Consumable(rank, name, price, image){
	this.rank = rank;
	this.name = name;
	this.price = price;
	this.image = image;
}

function setMaxSize() {
	if (allowQuatermaster) {
		maxSize = 5;
	} else {
		maxSize = 4;
	}
}

function setParameterValues() {
	generateWeapon1 = document.getElementById("weapon1").checked;
	generateWeapon2 = document.getElementById("weapon2").checked;
	clearUpdateStack();
	var checks = [].slice.call(document.getElementsByTagName("input"))
			.filter(i => i.type == "checkbox" && /.*\d+$/.test(i.id));
	checks.forEach(function(box) {
		if (box.checked) {
			var name = box.id.slice(0, -1)+"s";
			updateStack[name].push(parseInt(box.id.slice(-1)));
		}
	});

	allowDualWield = document.getElementById("dual").checked;
	forceMedkit = document.getElementById("med").checked;
	allowQuatermaster = document.getElementById("quartermaster").checked;
	allowDuplicateWeapons = document.getElementById("dup").checked;
	allowCustomAmmo = document.getElementById("customammo").checked;
	sound = document.getElementById("sound").checked;
	animation = document.getElementById("anim").checked;
	rank = document.getElementById("rank").value;
	loadoutPriceLimit = document.getElementById("priceLimit").value;
}

function generateWeapon() {
	var weapon = null;
	var weaponCandidates = filterAvailableWeapons();
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
			if(weapon.name.includes("LeMat") || weapon.name.includes("Drilling")){
				weapon.ammo2 = weapon.ammoTypes[3];
			} else {
				weapon.ammo2 = weapon.ammoTypes[0];
			}
		} else {
			weapon.ammo2 = ammoTypeNone;
		}
		if(allowCustomAmmo && weapon.ammoTypes.length > 1){
			if (getRandomInt(100) >= customAmmoPercentage){
				if(weapon.name.includes("LeMat") || weapon.name.includes("Drilling")){
					do {
						weapon.ammo1 = weapon.ammoTypes[getRandomInt(2)]
					} while(weapon.ammo1 == weapon.ammoTypes[0]);
				} else {
					do {
						weapon.ammo1 = weapon.ammoTypes[getRandomInt(weapon.ammoTypes.length)]
					} while(weapon.ammo1 == weapon.ammoTypes[0]);
				}
			}
			if (weapon.singleShot){
				if (getRandomInt(100) >= customAmmoPercentage){
					if(weapon.name.includes("LeMat") || weapon.name.includes("Drilling")){
						var rand = 0;
						while(rand < 3){
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
	for (family of gunFamilies){
		if (family.rank <= rank && family.minimumSize <= remainingSize) {
			for (gun of family.guns){
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
	return candidates;
}

function generateTool() {
	var tool = null;
	var candidates = filterAvailableTools();
	if(isToolUnavailable(candidates)){
		return null;
	}

	if(forceMedkit){
		if (!store.tools.includes(medkit)){
			tool = medkit;
		}
	}

	while (tool == null) {
		tool = candidates[getRandomInt(candidates.length)];
		if (store.tools.includes(tool)){
			tool = null;
		}
	}
	return tool;
}

function filterAvailableTools(){
	var candidates = new Array();
	for (tool of toolList) {
		if (tool.rank <= rank) {
			candidates.push(tool);
		}
	}
	return candidates;
}

function isDuplicate(array) {
	return (array.filter((item, index) => item != null && array.indexOf(item) != index)).length != 0;
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

function isToolUnavailable(candidates){
	var totalNumberOfTools = 0;

	store.tools.forEach(function(tool) {
		if (tool != null) {
			totalNumberOfTools += 1;
		}
	});

	if (totalNumberOfTools == candidates.length) {
		return true;
	}
	return false;
}

function generateConsumable() {
	var candidates = filterConsumableCandidates();
	consumable = candidates[getRandomInt(candidates.length)];
	return consumable;
}

function filterConsumableCandidates(){
	var candidates = new Array();
	for (cons of consumableList) {
		if (cons.rank <= rank) {
			candidates.push(cons);
		}
	}
	return candidates;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function previous(toRoll){
	setParameterValues();
	if (toRoll == "weapon1") {
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
				if ((initialName.includes("Upercut") && !initialName.includes("Dual")) || (initialName.includes("Crossbow") && !initialName.includes("Hand"))){
					generateAmmo(weapon1);
					document.getElementById("w1a1").src = weapon1.ammo1.ammo;
					document.getElementById("w1a2").src = weapon1.ammo2.ammo;
				}
				document.getElementById("w1").src = weapon1.image;
				document.getElementById("w1").alt = weapon1.name;
				
			}
		}
	}
	if (toRoll == "weapon2") {
		if (generateWeapon2) {
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
				if ((initialName.includes("Upercut") && !initialName.includes("Dual")) || (initialName.includes("Crossbow") && !initialName.includes("Hand"))){
					generateAmmo(weapon2);
					document.getElementById("w2a1").src = weapon2.ammo1.ammo;
					document.getElementById("w2a2").src = weapon2.ammo2.ammo;
				}
				document.getElementById("w2").src = weapon2.image;
				document.getElementById("w2").alt = weapon2.name;
			}
		}
	}

	if (toRoll.substring(0, 4) == "tool") {
		var tnum = parseInt(toRoll.substring(4))-1;
		var prev = store.tools[tnum];
		if (!prev) return;
		var fam = findFamilyOf(toolFamilies, "tools", store.tools[tnum]);
		var toolIndex = fam.tools.findIndex((t) => t.name == store.tools[tnum].name);
		var newTool = prev;

		while(toolIndex > 0 && newTool == prev){
			newTool = fam.tools[--toolIndex];
			if (store.tools.includes(newTool)){
				newTool = prev;
			}
		}
		
		store.tools[tnum] = newTool;
		updateSlots();
		
	}

	if (toRoll.substring(0, 10) == "consumable") {
		var cnum = parseInt(toRoll.substring(10))-1;
		const prev = store.consumables[cnum];
		if (!prev) return;
		var fam   = findFamilyOf(consumableFamilies, "consumables", prev);
		var consumableIndex = fam.consumables.findIndex((c) => c.name == store.consumables[cnum].name);
		
		store.consumables[cnum] = (consumableIndex > 0 ? fam.consumables[consumableIndex-1] : fam.consumables[consumableIndex]);
		updateSlots();
	}

	updateLoadoutPrice();
}

function reroll(toRoll){
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

	if (toRoll.substring(0, 4) == "tool") {
		var tnum = parseInt(toRoll.substring(4))-1;
		var prev = store.tools[tnum]
		if(prev == medkit && forceMedkit){
			return;
		}
		while(store.tools[tnum] == prev){
			store.tools[tnum] = null;
			store.tools[tnum] = generateTool();
		}
	}

	if (toRoll.substring(0, 10) == "consumable") {
		var cnum = parseInt(toRoll.substring(10))-1;
		store.consumables[cnum] = null;
		store.consumables[cnum] = generateConsumable();
	}

	updateSlots();
	updateLoadoutPrice();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function clearUpdateStack(){
	updateStack = {
		tools: [],
		consumables: [],
		weapons: [] /* not used, but needed for checkboxes */
	}
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
	store.tools.forEach(t => {
		if(t != null){
			price += t.price
		}
	})
	store.consumables.forEach(t => {
		if(t != null){
			price += t.price
		}
	})
	return price;
}

function updateLoadoutPrice(){
	var container = document.getElementById("under");
	if (container.style.display !== "block"){
		container.style.display = "block";
	}
	document.getElementById("priceTotal").innerText = calculatePrice();
}
