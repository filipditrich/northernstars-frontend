/**
 * @description Focuses the <id> specified field (from input-buttons)
 * @param id
 */
export function focusField(id: string): void {
  document.getElementById(id).click();
}
