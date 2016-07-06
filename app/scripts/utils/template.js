/**
 * Template Utility Functions
 * @module utils/template
 */
import { warn } from '../utils';

const doc = document;

/**
 * @return {Boolean} <template>-support in document
 */
const supportsTemplate = () => {
  const support = 'content' in doc.createElement('template');

  if (!support) {
    warn("Browser doesn't support <template>. This won't work for <td>, <tr>, <pre>, <select>");
  }

  return support;
};

/**
 * @param {String} HTML representing a single or multiple elements
 * @param {Boolean} Determines if the function outputs an element or a boolean
 * @return {Element} || {NodeList}
 */
const renderHtml = (html, nodeList = false) => {
  const templateSupport = supportsTemplate();
  const frag = templateSupport ? doc.createElement('template') : doc.createElement('div');
  frag.innerHTML = html;
  const fragProp = templateSupport ? frag.content : frag;
  return fragProp[nodeList ? 'childNodes' : 'firstChild'];
};

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
export const htmlToElement = (html) => renderHtml(html);

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
export const htmlToElements = (html) => renderHtml(html, true);