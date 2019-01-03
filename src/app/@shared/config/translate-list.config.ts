/**
 * @description Translation list
 */
let translateIdList = {
  ADMIN: { cs: 'Administrátor', en: 'Administrator' },
  MATCHES: { cs: 'Zápasy', en: 'Matches' },
  MATCH_RESULTS: { cs: 'Výsledky', en: 'Match results' },
  MATCH_MANAGER: { cs: 'Správce zápasů', en: 'Match manager' },
  GROUP_MANAGER: { cs: 'Správce skupin', en: 'Group manager' },
  TEAM_MANAGER: { cs: 'Správce týmů', en: 'Team manager' },
  PLACE_MANAGER: { cs: 'Správce míst', en: 'Place manager' },
  JERSEY_MANAGER: { cs: 'Správce dresů', en: 'Jersey manager' },
  REGISTRATION_REQUESTS: { cs: 'Registrační žádosti', en: 'Registration requests' },
};

/**
 * @description Updates the Translation list
 * @param update
 * @param {boolean} replaceAll
 */
export function updateTranslateList(update: any, replaceAll: boolean = true): void {
  if (replaceAll) {
    translateIdList = update;
  } else {
    Object.keys(update).forEach(id => {
      translateIdList[id] = update[id];
    });
  }
}

/**
 * @description Lists the whole Translation list
 * @return {any}
 */
export function listTranslateList(): any {
  return translateIdList;
}
