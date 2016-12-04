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
      ice.load('content', this._buildManualIndex(manualConfig, true), IceCap.MODE_WRITE);
      ice.load('nav', this._buildManualNav(manualConfig), IceCap.MODE_WRITE);
      ice.text('title', 'Manual', IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      callback(ice.html, fileName);
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
      const starCount = Math.min(Math.floor((manualConfig.length - 1) / 2), 5);
      const star = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);

      let color;
      if (starCount <= 3) {
        color = '#db654f';
      } else if (starCount <= 4) {
        color = '#dab226';
      } else {
        color = '#4fc921';
      }

      let badge = this._readTemplate('image/manual-badge.svg');
      badge = badge.replace(/@star@/g, star);
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
    if (m.overview) manualConfig.push({label: 'Overview', paths: m.overview});
    if (m.design) manualConfig.push({label: 'Design', paths: m.design});
    if (m.installation) manualConfig.push({label: 'Installation', paths: m.installation});
    if (m.tutorial) manualConfig.push({label: 'Tutorial', paths: m.tutorial});
    if (m.usage) manualConfig.push({label: 'Usage', paths: m.usage});
    if (m.configuration) manualConfig.push({label: 'Configuration', paths: m.configuration});
    if (m.example) manualConfig.push({label: 'Example', paths: m.example});
    if (m.advanced) manualConfig.push({label: 'Advanced', paths: m.advanced});
    manualConfig.push({label: 'Reference', fileName: 'identifiers.html', references: true});
    if (m.faq) manualConfig.push({label: 'FAQ', paths: m.faq});
    if (m.changelog) manualConfig.push({label: 'Changelog', paths: m.changelog});
    return manualConfig;
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
   * built manual index.
   * @param {ManualConfigItem[]} manualConfig - target manual config.
   * @param {boolean} [badge=false] - show badge.
   * @return {IceCap} built index.
   * @private
   */
  _buildManualIndex(manualConfig, badge = false) {
    const ice = new IceCap(this._readTemplate('manualIndex.html'));

    if (!badge) ice.drop('badge');

    ice.loop('manual', manualConfig, (i, item, ice)=>{
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
      } else {
        for (const filePath of item.paths) {
          const fileName = this._getManualOutputFileName(item, filePath);
          const html = this._convertMDToHTML(filePath);
          const $root = cheerio.load(html).root();

          $root.find('h1,h2,h3,h4,h5').each((i, el)=>{
            const $el = cheerio(el);
            const label = $el.text();
            const link = `${fileName}#${$el.attr('id')}`;
            const indent = `indent-${el.tagName.toLowerCase()}`;
            toc.push({label, link, indent});
          });
        }
      }

      ice.attr('manual', 'data-toc-name', item.label.toLowerCase());
      ice.loop('manualNav', toc, (i, item, ice)=>{
        ice.attr('manualNav', 'class', item.indent);
        ice.text('link', item.label);
        ice.attr('link', 'href', item.link);
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
    return `manual/${item.label.toLowerCase()}/${fileName}.html`;
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
