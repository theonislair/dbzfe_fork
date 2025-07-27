outputBuffer
	var
		mob/mobRef = NULL;
		buffer = ""
		processing = FALSE;

	New(mob/m){
		..()
		mobRef = m;
		mobRef.output = src;
	}

	Del(){
		..()
	}

	proc
		uninit(){
			mobRef.output=NULL;
			mobRef=NULL;
			buffer=NULL;
			clean();
		}

		flush(){
			buffer = "";
		}

		add(buff){
			buffer += buff;
			
			// Handle error messages immediately
			if(mobRef && mobRef.client && mobRef.client.state == STATE_PLAYING) {
				if(mobRef.client.bust_error) {
					buffer += "{cType '{x{Ccommands{x{c'{x {WOR{x{c '{x{Cskills{x{c' for a full list of available commands/skills.{x\n";
					mobRef.client.bust_error = FALSE;
				}
			}
			
			// Trigger immediate output processing to maintain message order
			if(!processing && length(buffer) > 0){
				spawn() processOutput();
			}
		}

		processOutput(){
			set waitfor = FALSE;
			processing = TRUE;

			// Process immediately without delay to maintain message order
			if(src && mobRef && mobRef.client && length(buffer) > 0){
				// Add prompt just before sending to prevent duplication
				if(mobRef.client.state == STATE_PLAYING && mobRef.client.bust_prompt) {
					if(mobRef.frozen){
						buffer += "{W<{x{CFROZEN{x{W>{x";
					}else{
						buffer += "[mobRef.client.client_prompt()][mobRef.lastPLGain != 0 ? " [mPlus(mobRef:retLastPL())] PL" : ""][mobRef.lastLCGain != 0 ? " {G[mobRef:retLastLC()]{x LC" : ""]";
					}
					mobRef.client.bust_prompt = FALSE;
				}

				// Send buffered output
				var/outBuf = rColor(buffer,mobRef.cColor,getColor(mobRef.client));
				mobRef << {"\n[outBuf]"};

				if(mobRef.snooper && mobRef.snooper:client) { 
					mobRef.snooper << {"\n[outBuf]"}; 
				}

				flush();
			}

			processing = FALSE;

			// If more content was added while processing, schedule another batch
			if(src && mobRef && mobRef.client && length(buffer) > 0){
				spawn() processOutput();
			}
		}

		readBuffer(){
			// Legacy compatibility - now just starts the system
			if(!processing && length(buffer) > 0){
				spawn() processOutput();
			}
		}
