Command/Public
	skills
		name = "skills"
		format = "~skills";
		canAlwaysUSE = TRUE
		canUseWhileRESTING = TRUE;
		helpDescription = "Display the list of available techniques for you to use and learn."
		cancelsPushups = FALSE;

		command(mob/user) {
			var
				skill_list[] = list()

			for(var/x in user.skillSet()){
				var/Command/Technique/C = new x
				var/skill_name = lowertext(C.name)
				var/exp = (user.skillExp && user.skillExp[skill_name]) ? user.skillExp[skill_name] : 0
				var/level = skillMasteryGetLevel(exp)
				var/level_name = skillMasteryGetLevelName(level)
				var/color = skillMasteryGetLevelColor(level)

				if(length(C.name) > 0){
					if(user.techniques.Find(C.type)){
						if(game.settings.skillMasteryEnabled)
							skill_list.Add("{c[C.name]{x <al18>([color][level_name]{x)</a>")
						else
							skill_list.Add("{c[C.name]{x")
					}
					else{
						if(game.settings.skillMasteryEnabled)
							skill_list.Add("{D[C.name]{x <al9>({YN/A{x)</a>")
						else
							skill_list.Add("{D[C.name]{x")
					}
				}
			}

			send(format_text("{Y^c<al28></a>Techniques<ar28></a>{x"),user,TRUE)
			send(format_list(skill_list,2,28),user,TRUE)
		}