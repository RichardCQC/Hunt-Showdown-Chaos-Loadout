//Variables for options
var rank = 100;
var maxSize = 4;
var generateWeapon1 = true;
var generateWeapon2 = true;
var allowDualWield = true;
var allowQuatermaster = false;
var allowDuplicateWeapons = true;

//Variables for result
var weapon1 = null;
var weapon2 = null;

// store the actual values of tools/consumables
var store = {
	tools: [null, null, null, null],
	consumables: [null, null, null, null],
	weapons: [null, null]
};

// store which slots need updating
var updateStack = {
	tools: [],
	consumables: [],
	weapons: [] /* not used, but needed for checkboxes */
};

// URLs for data purposes.
var externalData = {
	tools: "https://raw.githubusercontent.com/HackedPixels/Hunt-Showdown-Chaos-Loadout/1c6261cfb95c3678c41758f5d095f897598e9827/data/tools.json",
	consumables: "https://raw.githubusercontent.com/HackedPixels/Hunt-Showdown-Chaos-Loadout/1c6261cfb95c3678c41758f5d095f897598e9827/data/consumables.json",
	guns: "https://raw.githubusercontent.com/HackedPixels/Hunt-Showdown-Chaos-Loadout/0c8002cc94e2b3876a4b4d8f773b33ccdded82a9/js/guns.json"
};

var remainingSize = 0;

//Data intialization
var gunFamilies;
var toolFamilies;
var consumableFamilies;

/* TODO: Maybe add duplicates array support, so we can randomize more slots with
         duplicats and no duplicates? (currently only support yes/no for all slots
*/
function randomizeSlots(slots, duplicates) {
	var randSlots = [];

	if (slots == null) {
		randSlots = Object.keys(updateStack);
	} else {
		randSlots.push(slots);
	}
	console.log(randSlots);

	randSlots.forEach(function(key) {
		updateStack[key].forEach(function(num) {
			do {
				// TODO: Make generate more general to avoid the switch
				switch (key) {
					case "tools":
						store[key][(num-1)] = generateTool();
						break;
					case "consumables":
						store[key][(num-1)] = generateConsumable();
						break;
				}
			} while (!duplicates && isDuplicate(store[key]));
		})
	});
}

// update Tool and Consumable Slots
function updateSlots(random) {
	Object.keys(updateStack).forEach(function(key) {
		updateStack[key].forEach(function(num) {
			var e = document.getElementById(key.substr(0,1)+num);
			if (store[key][(num-1)] !== null) {
				e.src = store[key][(num-1)].image;
				e.alt = store[key][(num-1)].name;
			}
		})
	});
}

function generate() {
	setParameterValues();
	setMaxSize();
	if (rank <= 100 && rank >= 1) {
		remainingSize = maxSize;
		weapon1 = null;
		weapon2 = null;
		if (generateWeapon1) {
			weapon1 = generateWeapon();
			remainingSize = remainingSize - weapon1.size;
			document.getElementById("w1").src = weapon1.image;
			document.getElementById("w1").alt = weapon1.name;
		} else{
			document.getElementById("w1").src = "img/emptyLarge.jpg";
		}
		if (generateWeapon2) {
			weapon2 = generateWeapon();
			remainingSize = remainingSize - weapon2.size;
			document.getElementById("w2").src = weapon2.image;
			document.getElementById("w2").alt = weapon2.name;
		} else{
			document.getElementById("w2").src = "img/emptySmall.jpg";
		}

		updateSlots(true);

	}
}

function GunFamily(rank, minimumSize, guns){
	this.rank = rank;
	this.minimumSize = minimumSize;
	this.guns = guns;
}

function Gun(size, dualWield, name, price, image){
	this.size = size;
	this.dualWield = dualWield;
	this.name = name;
	this.price = price;
	this.image = image;
}

function ToolFamily(rank, tools){
	this.rank = rank;
	this.tools = tools;
}

function Tool(name, price, image){
	this.name = name;
	this.price = price;
	this.image = image;
}

function ConsumableFamily(rank, consumables){
	this.rank = rank;
	this.consumables = consumables;
}

function Consumable(name, price, image){
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

	var checks = [].slice.call(document.getElementsByTagName("input"))
			.filter(i => i.type == "checkbox" && /.*\d+$/.test(i.id));
	checks.forEach(function(box) {
		if (box.checked) {
			// maybe introduce a dataset field? (hp)
			var name = box.id.slice(0, -1)+"s";//wtf. (hp)
			console.log(name);
			updateStack[name].push(parseInt(box.id.slice(-1)));
		}
	});

	allowDualWield = document.getElementById("dual").checked
	allowQuatermaster = document.getElementById("quartermaster").checked
	allowDuplicateWeapons = document.getElementById("dup").checked
	rank = document.getElementById("rank").value;
}

function generateWeapon() {
	var weapon = null;
	var candidates = filterWeaponFamilyCandidates();
	while (weapon == null) {
		var randomFamily = candidates[getRandomInt(candidates.length)];
		var weaponCandidates = filterWeaponCandidates(randomFamily);
		weapon = weaponCandidates[getRandomInt(weaponCandidates.length)]
		if (!allowDuplicateWeapons) {
			if ((weapon1 != null && weapon.name == weapon1.name) || (weapon2 != null && weapon.name == weapon2.name)) {
				weapon = null;
			}
		}
	}
	return weapon;
}

function filterWeaponFamilyCandidates(){
	var candidates = new Array();
	for (family of gunFamilies){
		if (family.rank <= rank && family.minimumSize <= remainingSize) {
			candidates.push(family);
		}
	}
	return candidates;
}

function filterWeaponCandidates(family){
var weaponCandidates = new Array();
	for (gun of family.guns){
		if (gun.size <= remainingSize) {
			if(gun.dualWield){
				if (allowDualWield) {
					weaponCandidates.push(gun)
				}
			} else {
				weaponCandidates.push(gun);
			}
		}
	}
	return weaponCandidates;
}

function generateTool() {
	var tool = null;
	var candidates = filterToolFamilyCandidates();
	if(isToolUnavailable(candidates)){
		return null;
	}
	while (tool == null) {
		var randomFamily = candidates[getRandomInt(candidates.length)];
		var toolCandidates = filterToolCandidates(randomFamily);
		tool = toolCandidates[getRandomInt(toolCandidates.length)];
	}
	return tool;
}

function filterToolFamilyCandidates(){
	var candidates = new Array();
	for (family of toolFamilies) {
		if (family.rank <= rank) {
			candidates.push(family);
		}
	}
	return candidates;
}

function isDuplicate(array) {
	return (array.filter((item, index) => item != null && array.indexOf(item) != index)).length != 0;
}

// XXX: needs rename? (hp)
function isDefined(position, temp) {
	return (position != null && position.name == temp.name);
}

function activateEvents() {
	var checks = [].slice.call(document.getElementsByTagName("input"));
	checks = checks.filter(box => box.type == "checkbox");
	checks.forEach(function(box) {
		box.addEventListener("change", function(e) {
			var name = e.target.id.slice(0, -1)+"s";//wtf. (hp)
			var number = parseInt(e.target.id.slice(-1))


			if (e.target.checked) {
				updateStack[name].push(number);
			} else {
				updateStack[name] = updateStack[name].filter(n => n !== number);
			}
		});
	});

	var buttons = [].slice.call(document.getElementsByTagName("button"))
			.filter(btn => btn.type == "submit");
	buttons.forEach(function(btn) {
		btn.addEventListener("click", function(e) {
			// TODO: Fix this for more buttons. (hp)
			switch (e.target.id) {
				case "generate_loadout":
					randomizeSlots("tools", false);
					randomizeSlots("consumables", true);
				break;
			}
		});
	});
}

function loadExternalData() {
	Object.keys(externalData).forEach(function(key) {
		if (externalData[key] == null) { return; }
		// check if already downloaded.
		// TODO: this is bad. make all families an array. (hp)
		// TODO: stop this string black magic. (hp)
		if ((window[(key.slice(0,-1))+"Families"] = JSON.parse(localStorage.getItem(key))) != null) {
			console.log("Already loaded '"+key+"'.");
			return;
		}
		console.log("Loading '"+key+" from "+externalData[key]+".");

		var xhttp = new XMLHttpRequest();
		xhttp.addEventListener("load", function() {
			localStorage.setItem(key, xhttp.responseText);
			if ((window[(key.slice(0,-1))+"Families"] = JSON.parse(localStorage.getItem(key))) != null) {
				alert("something has gone terribly wrong!");
			}
		}.bind(key));
		xhttp.open("GET", externalData[key]);
		xhttp.send();
	});
}

function findFamilyOf(searchin, sub, searchfor) {
	var index = searchin.findIndex(function(family, index) {
		if ((family[sub].findIndex(function(item, index) {
			return (item.name == searchfor.name);
		})) != -1) {
			return true;
		} else {
			return false;
		}
	});

	return (index != -1 ? searchin[index] : null);
}

function filterToolCandidates(family){
	var candidates = new Array();
	for (tool of family.tools){
		if (store.tools.every(function(t) {
			return (t == null || t != null && t.name);
		})) {
			candidates.push(tool);
		}
	}
	return candidates;
}

function isToolUnavailable(candidates){
	var totalNumberOfTools = 0;
	var totalNumberOfCandidate = 0;

	store.tools.forEach(function(tool) {
		if (tool != null) {
			totalNumberOfTools += 1;
		}
	});

	for (family of candidates){
		for(tool of family.tools){
			totalNumberOfCandidate = totalNumberOfCandidate + 1;
		}
	}
	if (totalNumberOfTools == totalNumberOfCandidate) {
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
	for (family of consumableFamilies) {
		if (family.rank <= rank) {
			for (cons of family.consumables){
				candidates.push(cons);
			}
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
					//updateSlots();
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
				document.getElementById("w2").src = weapon2.image;
				document.getElementById("w2").alt = weapon2.name;
			}
		}
	}

	if (toRoll.substring(0, 4) == "tool") {
		var tnum = parseInt(toRoll.substring(4))-1;
		var prev = store.tools[tnum];

		var fam   = findFamilyOf(toolFamilies, "tools", store.tools[tnum]);
		var infam = fam.tools.findIndex(function(tool, index) {
			return tool.name = store.tools[tnum].name;
		});

		store.tools[tnum] = (infam > 0 ? fam.tools[infam-1] : fam.tools[infam]);

		//TODO: Maybe skip a tier? (hp)
		if (isDuplicate(store.tools)) { store.tools[tnum] = prev; }

		updateSlots(false);
		
	}

	if (toRoll.substring(0, 10) == "consumable") {
		var cnum = parseInt(toRoll.substring(10))-1;
		console.log(cnum);

		var fam   = findFamilyOf(consumableFamilies, "consumables", store.consumables[cnum]);
		var infam = fam.consumables.findIndex(function(consumable, index) {
			return consumable.name = store.consumables[cnum].name;
		});

		//TODO: CHECK FOR DUPLICATES, YOU IDIOT. (hp)
		store.consumables[cnum] = (infam > 0 ? fam.consumables[infam-1] : fam.consumables[infam]);
		updateSlots(false);
	}
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
		}
	}

	updateSlots(true);
}