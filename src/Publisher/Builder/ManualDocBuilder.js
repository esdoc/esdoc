import IceCap from 'ice-cap';
import path from 'path';
import fs from 'fs-extra';
import cheerio from 'cheerio';
import DocBuilder from './DocBuilder.js';
import {markdown} from './util.js';

/**
 * Manual Output Builder class.
 */
export default class ManualDocBuilder extends DocBuilder {
  /**
   * execute building output.
   * @param {function(html: string, filePath: string)} callback - is called each manual.
   * @param {function(src: string, dest: string)} callbackForCopy - is called asset.
   * @param {function(badge: string, filePath: string)} callbackForBadge - is called with coverage badge.
   */
  exec(callback, callbackForCopy, callbackForBadge) {
    if (!this._config.manual) return;

    const manualConfig = this._getManualConfig();
    const ice = this._buildLayoutDoc();
    ice.autoDrop = false;
    ice.attr('rootContainer', 'class', ' manual-root');

    {
      const fileName = 'manual/index.html';
      const baseUrl = this._getBaseUrl(fileName);
      this._buildManualIndex(manualConfig);
      ice.load('content', this._buildManualCardIndex(manualConfig), IceCap.MODE_WRITE);
      ice.load('nav', this._buildManualNav(manualConfig), IceCap.MODE_WRITE);
      ice.text('title', 'Manual', IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      ice.attr('rootContainer', 'class', ' manual-index');
      callback(ice.html, fileName);

      if (this._config.manual.globalIndex) {
        ice.attr('baseUrl', 'href', './', IceCap.MODE_WRITE);
        callback(ice.html, 'index.html');
      }

      ice.attr('rootContainer', 'class', ' manual-index', IceCap.MODE_REMOVE);
    }

    for (const item of manualConfig) {
      if (!item.paths) continue;
      for (const filePath of item.paths) {
        const fileName = this._getManualOutputFileName(item, filePath);
        const baseUrl = this._getBaseUrl(fileName);
        ice.load('content', this._buildManual(item, filePath), IceCap.MODE_WRITE);
        ice.load('nav', this._buildManualNav(manualConfig), IceCap.MODE_WRITE);
        ice.text('title', item.label, IceCap.MODE_WRITE);
        ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
        callback(ice.html, fileName);
      }
    }

    if (this._config.manual.asset) {
      callbackForCopy(this._config.manual.asset, 'manual/asset');
    }

    // badge
    {
      // const starCount = Math.min(Math.floor((manualConfig.length - 1) / 2), 5);
      // const star = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
      const ratio = Math.floor(100 * (manualConfig.length - 1) / 10);

      let color;
      if (ratio < 50) {
        color = '#db654f';
      } else if (ratio < 90) {
        color = '#dab226';
      } else {
        color = '#4fc921';
      }

      let badge = this._readTemplate('image/manual-badge.svg');
      badge = badge.replace(/@value@/g, `${ratio}%`);
      badge = badge.replace(/@color@/g, color);
      callbackForBadge(badge, 'manual-badge.svg');
    }
  }

  /**
   * get manual config based on ``config.manual``.
   * @returns {ManualConfigItem[]} built manual config.
   * @private
   */
  _getManualConfig() {
    const m = this._config.manual;
    const manualConfig = [];
    if (m.overview) manualConfig.push({label: 'Overview', paths: m.overview, type: 'overview' });
    if (m.design) manualConfig.push({label: 'Design', paths: m.design, type: 'design'});
    if (m.installation) manualConfig.push({label: 'Installation', paths: m.installation, type: 'installation'});
    if (m.tutorial) manualConfig.push({label: 'Tutorial', paths: m.tutorial, type: 'tutorial'});
    if (m.usage) manualConfig.push({label: 'Usage', paths: m.usage, type: 'usage'});
    if (m.configuration) manualConfig.push({label: 'Configuration', paths: m.configuration, type: 'configuration'});
    if (m.advanced) manualConfig.push({label: 'Advanced', paths: m.advanced, type: 'advanced'});
    if (m.example) manualConfig.push({label: 'Example', paths: m.example, type: 'example'});
    manualConfig.push({label: 'Reference', fileName: 'identifiers.html', references: true, type: 'reference'});
    if (m.faq) manualConfig.push({label: 'FAQ', paths: m.faq, type: 'faq'});
    if (m.changelog) manualConfig.push({label: 'Changelog', paths: m.changelog, type: 'changelog'});
    if (Array.isArray(m.customPages)) this._addCustomPages(manualConfig, m.customPages);
    return manualConfig;
  }

  _validateCustomPageConfig(existingTypes, customPage) {
    if (typeof customPage.label !== 'string') {
      console.log('Custom manual page config "label" is not a string, skipping: ', customPage);
      return {isValid: false};
    }
    if (!Array.isArray(customPage.paths)) {
      console.log('Custom manual page config "paths" is not an array, skipping: ', customPage);
      return {isValid: false};
    }
    const invalidLabelCharacters = /[^\w ]+/g;
    const badCharacters = customPage.label.match(invalidLabelCharacters);
    if (badCharacters) {
      console.log(`Custom manual page config "label" contains invalid characters "${badCharacters}", skipping:`, customPage);
      return {isValid: false};
    }
    const type = customPage.label.replace(/ /g, '_').toLowerCase();
    if (existingTypes.indexOf(type) >= 0) {
      console.log('Custom manual page config "label" duplicates existing label, skipping: ', customPage);
      return {isValid: false};
    }
    return {isValid: true, type: type};
  }

  _addCustomPages(manualConfigs, customPageList) {
    const existingTypes = [];
    for (let manualConfig of manualConfigs) {
      existingTypes.push(manualConfig.type);
    }
    for (let customPage of customPageList) {
      const validationInfo = this._validateCustomPageConfig(existingTypes, customPage);
      if (validationInfo.isValid) {
        customPage.type = validationInfo.type;
        existingTypes.push(validationInfo.type);
        manualConfigs.push(customPage);
      }
    }
  }

  /**
   * build manual navigation.
   * @param {ManualConfigItem[]} manualConfig - target manual config.
   * @return {IceCap} built navigation
   * @private
   */
  _buildManualNav(manualConfig) {
    const ice = this._buildManualIndex(manualConfig);
    const $root = cheerio.load(ice.html).root();
    $root.find('.github-markdown').removeClass('github-markdown');
    return $root.html();
  }

  /**
   * build manual.
   * @param {ManualConfigItem} item - target manual config item.
   * @param {string} filePath - target manual file path.
   * @return {IceCap} built manual.
   * @private
   */
  _buildManual(item, filePath) {
    const html = this._convertMDToHTML(filePath);
    const ice = new IceCap(this._readTemplate('manual.html'));
    ice.text('title', item.label);
    ice.load('content', html);

    // convert relative src to base url relative src.
    const $root = cheerio.load(ice.html).root();
    $root.find('img').each((i, el)=>{
      const $el = cheerio(el);
      const src = $el.attr('src');
      if (!src) return;
      if (src.match(/^http[s]?:/)) return;
      if (src.charAt(0) === '/') return;
      $el.attr('src', `./manual/${src}`);
    });
    $root.find('a').each((i, el)=>{
      const $el = cheerio(el);
      const href = $el.attr('href');
      if (!href) return;
      if (href.match(/^http[s]?:/)) return;
      if (href.charAt(0) === '/') return;
      if (href.charAt(0) === '#') return;
      $el.attr('href', `./manual/${href}`);
    });

    return $root.html();
  }

  /**
   * built manual card style index.
   * @param {ManualConfigItem[]} manualConfig - target manual config.
   * @return {IceCap} built index.
   * @private
   */
  _buildManualCardIndex(manualConfig) {
    const cards = [];
    for (const manualItem of manualConfig) {
      if (manualItem.references) {
        const filePath = path.resolve(this._config.destination, 'identifiers.html');
        const html = fs.readFileSync(filePath).toString();
        const $ = cheerio.load(html);
        const card = $('.content').html();
        const identifiers = this._findAllIdentifiersKindGrouping();
        const sectionCount = identifiers.class.length +
          identifiers.interface.length +
          identifiers.function.length +
          identifiers.typedef.length +
          identifiers.external.length;

        cards.push({label: 'References', link: 'identifiers.html', card: card, type: 'reference', sectionCount: sectionCount});
        continue;
      }

      for (const filePath of manualItem.paths) {
        const type = manualItem.type;
        const fileName = this._getManualOutputFileName(manualItem, filePath);
        const html = this._buildManual(manualItem, filePath);
        const $root = cheerio.load(html).root();
        const h1Count = $root.find('h1').length;
        const sectionCount = $root.find('h1,h2,h3,h4,h5').length;

        $root.find('h1').each((i, el)=>{
          const $el = cheerio(el);
          const label = $el.text();
          const link = h1Count === 1 ? fileName : `${fileName}#${$el.attr('id')}`;
          let card = `<h1>${label}</h1>`;
          const nextAll = $el.nextAll();

          for (let i = 0; i < nextAll.length; i++) {
            const next = nextAll.get(i);
            const tagName = next.tagName.toLowerCase();
            if (tagName === 'h1') return;
            const $next = cheerio(next);
            card += `<${tagName}>${$next.html()}</${tagName}>`;
          }

          cards.push({label, link, card, type, sectionCount});
        });
      }
    }

    const ice = new IceCap(this._readTemplate('manualCardIndex.html'));
    ice.loop('cards', cards, (i, card, ice)=>{
      ice.text('label-inner', card.label);
      ice.attr('label', 'class', `manual-color manual-color-${card.type}`);

      const sectionCount = Math.min((card.sectionCount / 5) + 1, 5);
      ice.attr('label', 'data-section-count', '■'.repeat(sectionCount));

      ice.attr('link', 'href', card.link);
      ice.load('card', card.card);
    });

    if (this._config.manual.index) {
      const userIndex = this._convertMDToHTML(this._config.manual.index);
      ice.load('manualUserIndex', userIndex);
    } else {
      ice.drop('manualUserIndex', true);
    }

    ice.drop('manualBadge', !this._config.manual.coverage);

    return ice;
  }

  /**
   * built manual index.
   * @param {ManualConfigItem[]} manualConfig - target manual config.
   * @return {IceCap} built index.
   * @private
   */
  _buildManualIndex(manualConfig) {
    const ice = new IceCap(this._readTemplate('manualIndex.html'));
    const _manualConfig = manualConfig.filter((item) => (item.paths && item.paths.length) || item.references);

    ice.loop('manual', _manualConfig, (i, item, ice)=>{
      const toc = [];
      if (item.references) {
        const identifiers = this._findAllIdentifiersKindGrouping();
        toc.push({label: 'Reference', link: 'identifiers.html', indent: 'indent-h1'});
        if (identifiers.class.length) toc.push({label: 'Class', link: 'identifiers.html#class', indent: 'indent-h2'});
        if (identifiers.interface.length) toc.push({label: 'Interface', link: 'identifiers.html#interface', indent: 'indent-h2'});
        if (identifiers.function.length) toc.push({label: 'Function', link: 'identifiers.html#function', indent: 'indent-h2'});
        if (identifiers.variable.length) toc.push({label: 'Variable', link: 'identifiers.html#variable', indent: 'indent-h2'});
        if (identifiers.typedef.length) toc.push({label: 'Typedef', link: 'identifiers.html#typedef', indent: 'indent-h2'});
        if (identifiers.external.length) toc.push({label: 'External', link: 'identifiers.html#external', indent: 'indent-h2'});

        toc[0].sectionCount = identifiers.class.length +
          identifiers.interface.length +
          identifiers.function.length +
          identifiers.typedef.length +
          identifiers.external.length;
      } else {
        for (const filePath of item.paths) {
          const fileName = this._getManualOutputFileName(item, filePath);
          const html = this._convertMDToHTML(filePath);
          const $root = cheerio.load(html).root();
          const h1Count = $root.find('h1').length;
          const sectionCount = $root.find('h1,h2,h3,h4,h5').length;

          $root.find('h1,h2,h3,h4,h5').each((i, el)=>{
            const $el = cheerio(el);
            const label = $el.text();
            const indent = `indent-${el.tagName.toLowerCase()}`;

            let link = `${fileName}#${$el.attr('id')}`;
            if (el.tagName.toLowerCase() === 'h1' && h1Count === 1) link = fileName;

            toc.push({label, link, indent, sectionCount});
          });
        }
      }

      ice.attr('manual', 'data-toc-name', item.type);
      ice.loop('manualNav', toc, (i, tocItem, ice)=>{
        if (tocItem.indent === 'indent-h1') {
          ice.attr('manualNav', 'class', `${tocItem.indent} manual-color manual-color-${item.type}`);
          const sectionCount = Math.min((tocItem.sectionCount / 5) + 1, 5);
          ice.attr('manualNav', 'data-section-count', '■'.repeat(sectionCount));
        } else {
          ice.attr('manualNav', 'class', tocItem.indent);
        }

        ice.attr('manualNav', 'data-link', tocItem.link.split('#')[0]);
        ice.text('link', tocItem.label);
        ice.attr('link', 'href', tocItem.link);
      });
    });

    return ice;
  }

  /**
   * get manual file name.
   * @param {ManualConfigItem} item - target manual config item.
   * @param {string} filePath - target manual markdown file path.
   * @returns {string} file name.
   * @private
   */
  _getManualOutputFileName(item, filePath) {
    if (item.fileName) return item.fileName;

    const fileName = path.parse(filePath).name;
    return `manual/${item.type}/${fileName}.html`;
  }

  /**
   * convert markdown to html.
   * if markdown has only one ``h1`` and it's text is ``item.label``, remove the ``h1``.
   * because duplication ``h1`` in output html.
   * @param {string} filePath - target.
   * @returns {string} converted html.
   * @private
   */
  _convertMDToHTML(filePath) {
    const content = fs.readFileSync(filePath).toString();
    const html = markdown(content);
    const $root = cheerio.load(html).root();
    return $root.html();
  }
}
