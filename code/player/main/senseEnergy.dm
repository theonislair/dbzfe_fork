
#define SENSE_DELAY 6 SECONDS
#define SENSE_PROCESS_INTERVAL 3 SECONDS

senseEnergy

	New(mob/Player/m){
		..()
		p = m;
		scheduleProcessing();
	}

	var
		mob/Player/p;
		recentMessages[] = list()
		junkMessages[] = list()
		processing = FALSE;

	proc
		addMessage(ID,message,senseMessage=FALSE,DELAY=SENSE_DELAY){
			switch(senseMessage){
				if(TRUE){
					if((locate(/Command/Technique/sense) in p.techniques) && !("[ID] sense" in junkMessages)){
						junkMessages += list("[ID] sense" = (world.time + DELAY))
						recentMessages += list(ID = message)
						scheduleProcessing();
					}
				}

				if(FALSE){
					if((locate(/Command/Technique/sense) in p.techniques) && !("[ID] [message]" in junkMessages)){
						junkMessages += list("[ID] [message]" = (world.time + DELAY))
						recentMessages += list(ID = message)
						scheduleProcessing();
					}
				}
			}
		}

		scheduleProcessing(){
			if(!processing && (length(recentMessages) > 0 || length(junkMessages) > 0)){
				processing = TRUE;
				spawn() processMessages();
			}
		}

		processMessages(){
			set waitfor = FALSE;

			while(p && src && (length(recentMessages) > 0 || length(junkMessages) > 0)){
				// Send any pending messages
				if(length(recentMessages) > 0){
					for(var/x in recentMessages){
						send(recentMessages[x],p);
						recentMessages.Remove(x);
					}
				}

				// Clean up expired junk messages
				if(length(junkMessages) > 0){
					for(var/y in junkMessages){
						if(world.time >= junkMessages[y]){
							junkMessages.Remove(y);
						}
					}
				}

				// Only continue processing if there are still items to process
				if(length(recentMessages) > 0 || length(junkMessages) > 0){
					sleep(SENSE_PROCESS_INTERVAL);
				}
			}

			processing = FALSE;
		}