proc
	vsCompare(_NUM1,_NUM2){
		if(_NUM1 > _NUM2){
			return "{G>{x";
		}else if(_NUM1 < _NUM2){
			return "{R<{x";
		}

		return "{Y={x";
	}

	compareItem(var/mob/m, var/obj/item/i, SLOT){

		var/compBuffer = NULL;
		var/obj/item/compare = m.equipment[SLOT];

		if(compare){
			compBuffer += "{Y=== {WCOMPARE{x {Y==={x\n"
			compBuffer += "{C[i.DISPLAY]{x{W vs {C[compare.DISPLAY]{x\n"
			if(i.DESC) { compBuffer += "{C[i.DESC]{x\n" }
			compBuffer += "{GSta:{x [ncheck(i.BONUS_STA,999,m,TRUE)] [vsCompare(i.BONUS_STA,compare.BONUS_STA)] [ncheck(compare.BONUS_STA,999,m,TRUE)] | {CKi:{x [ncheck(i.BONUS_KI,999,m,TRUE)] [vsCompare(i.BONUS_KI,compare.BONUS_KI)] [ncheck(compare.BONUS_KI,999,m,TRUE)]\n"
			compBuffer += "{RStr:{x [ncheck(i.BONUS_STR,999,m,TRUE)] [vsCompare(i.BONUS_STR,compare.BONUS_STR)] [ncheck(compare.BONUS_STR,999,m,TRUE)] | {BArmor:{x [ncheck(i.BONUS_ARM,999,m,TRUE)] [vsCompare(i.BONUS_ARM,compare.BONUS_ARM)] [ncheck(compare.BONUS_ARM,999,m,TRUE)]\n"
			compBuffer += "{YMF:{x [ncheck(i.BONUS_MF,999,m,TRUE)] [vsCompare(i.BONUS_MF,compare.BONUS_MF)] [ncheck(compare.BONUS_MF,999,m,TRUE)] | {DWeight:{x [i.WEIGHT][vsCompare(i.WEIGHT,compare.WEIGHT)][compare.WEIGHT]kg\n"
			compBuffer += "{GPrice:{x {Y[commafy(i.PRICE)]{x vs {Y[commafy(compare.PRICE)]{x Zenni"
		}else{
			compBuffer += "{Y=== {WCOMPARE{x {Y==={x\n"
			compBuffer += "{C[i.DISPLAY]{x {W vs {D(nothing){x\n"
			if(i.DESC) { compBuffer += "{C[i.DESC]{x\n" }
			compBuffer += "{GSta:{x [ncheck(i.BONUS_STA,999,m,TRUE)] | {CKi:{x [ncheck(i.BONUS_KI,999,m,TRUE)] | {RStr:{x [ncheck(i.BONUS_STR,999,m,TRUE)]\n"
			compBuffer += "{BArmor:{x [ncheck(i.BONUS_ARM,999,m,TRUE)] | {YMF:{x [ncheck(i.BONUS_MF,999,m,TRUE)] | {DWeight:{x [i.WEIGHT]kg\n"
			compBuffer += "{GPrice:{x {Y[commafy(i.PRICE)]{x Zenni"
		}

		return compBuffer;
	}

Command/Public
	compare
		name = "compare"
		format = "~compare; ?~searc(obj@inventory)";
		syntax = list("item name")
		priority = 1
		canAlwaysUSE = TRUE;
		helpDescription = "Display a comparison of the selected item against the one currently equipped on the same slot. The comparison uses the following symbols to display the difference between stats:\n\n {G+{x {CBetter Stats{x\n {Y={x {CEqual stats{x\n {R-{x {CLower stats"
		cancelsPushups = FALSE;

		command(mob/user, obj/item/o) {
			if(o){
				if(o.SLOT == FINGERS){
					send(compareItem(user,o,LEFT_FINGER),user,TRUE);
					send(compareItem(user,o,RIGHT_FINGER),user,TRUE);
				}else{
					send(compareItem(user,o,o.SLOT),user,TRUE);
				}
			}
			else{
				syntax(user,src);
			}
		}