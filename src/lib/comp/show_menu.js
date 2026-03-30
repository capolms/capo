import { writable } from 'svelte/store';

const menu_shown = writable('flex'); // flex = open is default, hidden = close is default.

function show_menu() {
		menu_shown.update(current => {
				return current === 'flex' ? 'hidden' : 'flex';
		});
};

export { show_menu, menu_shown }
