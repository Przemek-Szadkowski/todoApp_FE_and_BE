import { getElement, getElementsInParentsElement } from './helpers.js';

export const taskInput = getElement('.taskInput');
export const ul = getElement('.tasksList');
export const form = getElement('form');
export const optionButtons = getElementsInParentsElement('.optionsBtn');