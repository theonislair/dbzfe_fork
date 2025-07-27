commandQueue
	var
		list/commands[65565];
		mob/mobRef = NULL;
		curPos = NULL;
		nextPos = NULL;
		processing = FALSE;

	New(mob/m){
		mobRef = m;
		mobRef.command = src;
		curPos = 1;
		nextPos = 1;

		..()
	}

	Del(){
		..()
	}

	proc
		queue(var/command as text);
		pop(var/pos as num);
		aliasCheck(var/pos as num);
		processCommands();

	aliasCheck(){
		var/command = copytext(commands[curPos],1,findtext(commands[curPos]," "))

		if(mobRef.aliasList.Find(command)){
			commands[curPos] = Replace(commands[curPos],command,mobRef.aliasList["[command]"]);
		}

		if(mobRef.snooper){ send(commands[curPos] + "\n",mobRef.snooper); }

		return commands[curPos++];
	}

	queue(var/command as text){
		commands[nextPos++] = command;
		
		// Trigger processing only when needed
		if(!processing && mobRef && mobRef.client && !mobRef.frozen && !mobRef.checkLocked()){
			spawn() processCommands();
		}
	}

	pop(var/pos as num){
		if(mobRef.isAFK){
			mobRef.isAFK = FALSE;
			send("You're no longer AFK.",mobRef,TRUE);
		}

		if(!mobRef.frozen){ alaparser.parse(mobRef, aliasCheck(), list()); }

		if(mobRef && mobRef.client){
			mobRef.client.lastCMD = (world.time + 3);
		}
	}

	processCommands(){
		set waitfor = FALSE;
		processing = TRUE;

		while(src && mobRef && mobRef.client && curPos < nextPos){
			// Wait for command cooldown if needed
			while(mobRef && mobRef.client && mobRef.client.lastCMD >= world.time){
				sleep(1); // Short sleep instead of tick_lag
			}
			
			// Wait if player is locked
			while(mobRef && mobRef.checkLocked()){
				sleep(1);
			}

			if(length(commands[curPos]) > 0){ 
				pop(curPos); 
			} else {
				curPos++; // Skip empty commands
			}
		}

		processing = FALSE;
		
		// If more commands arrived while processing, restart
		if(src && mobRef && mobRef.client && curPos < nextPos){
			spawn() processCommands();
		}
	}