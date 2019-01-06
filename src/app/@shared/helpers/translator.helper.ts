import { environment } from '../../../environments/environment';
import { listTranslateList } from '../config/translate-list.config';

/**
 * @description Returns translated value from matched ID
 * @param {string} id
 * @param data
 * @param {string} lang
 * @return {string}
 */
export function translate(id: string, data?: any, lang?: string): string {
  const translateIdList = listTranslateList();
  let output: string;
  const dict = translateIdList[id];
  if (!dict) { console.error('[TRANSLATE] Error: id "%s" not found', id); }
  lang = !!lang ? lang : getLang();
  let string: string = !dict ? id : !lang ? id : dict[lang];
  if (!string) { output = id; } else {
    let replace = string.match(/\[(.*?)\]/g);
    if (!!data && !!replace) {
      replace = replace.map(a => a.replace(/[\[\]]/g, ''));
      replace.forEach(r => { string = string.replace(r, data[r]); });
    }
    output = string.replace(/[\[\]]/g, '');
  }
  return output;
}

/**
 * @description Returns app display language
 * @return {string}
 */
export function getLang(): string {
  return environment.language;
}
