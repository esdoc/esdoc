import IceCap from 'ice-cap';
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
   */
  exec(callback, callbackForCopy) {
    if (!this._config.manual) return;

    const manualConfig = this._getManualConfig();
    const ice = this._buildLayoutDoc();
    ice.autoDrop = false;
    ice.attr('rootContainer', 'class', ' manual-root');

    {
      const fileName = 'manual/index.html';
      const baseUrl = this._getBaseUrl(fileName);
      this._buildManualIndex(manualConfig);
      ice.load('content', this._buildManualIndex(manualConfig), IceCap.MODE_WRITE);
      ice.load('nav', this._buildManualNav(manualConfig), IceCap.MODE_WRITE);
      ice.text('title', 'Manual', IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      callback(ice.html, fileName);
    }

    for (let item of manualConfig) {
      if (!item.paths) continue;
      const fileName = this._getManualOutputFileName(item);
      const baseUrl = this._getBaseUrl(fileName);
      ice.load('content', this._buildManual(item), IceCap.MODE_WRITE);
      ice.load('nav', this._buildManualNav(manualConfig), IceCap.MODE_WRITE);
      ice.text('title', item.label, IceCap.MODE_WRITE);
      ice.attr('baseUrl', 'href', baseUrl, IceCap.MODE_WRITE);
      callback(ice.html, fileName);
    }

    if (this._config.manual.asset) {
      callbackForCopy(this._config.manual.asset, 'manual/asset');
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
    if (m.installation) manualConfig.push({label: 'Installation', paths: m.installation});
    if (m.tutorial) manualConfig.push({label: 'Tutorial', paths: m.tutorial});
    if (m.usage) manualConfig.push({label: 'Usage', paths: m.usage});
    if (m.configuration) manualConfig.push({label: 'Configuration', paths: m.configuration});
    if (m.example) manualConfig.push({label: 'Example', paths: m.example});
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
   * @return {IceCap} built manual.
   * @private
   */
  _buildManual(item) {
    const html = this._convertMDToHTML(item);
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
      $el.attr('src', './manual/' + src);
    });
    $root.find('a').each((i, el)=>{
      const $el = cheerio(el);
      const href = $el.attr('href');
      if (!href) return;
      if (href.match(/^http[s]?:/)) return;
      if (href.charAt(0) === '/') return;
      if (href.charAt(0) === '#') return;
      $el.attr('href', './manual/' + href);
    });

    return $root.html();
  }

  /**
   * built manual index.
   * @param {ManualConfigItem[]} manualConfig - target manual config.
   * @return {IceCap} built index.
   * @private
   */
  _buildManualIndex(manualConfig) {
    const ice = new IceCap(this._readTemplate('manualIndex.html'));

    ice.loop('manual', manualConfig, (i, item, ice)=>{
      const toc = [];
      if (item.references) {
        const identifiers = this._findAllIdentifiersKindGrouping();
        if (identifiers.class.length) toc.push({label: 'Class', link: 'identifiers.html#class', indent: 'indent-h1'});
        if (identifiers.interface.length) toc.push({label: 'Interface', link: 'identifiers.html#interface', indent: 'indent-h1'});
        if (identifiers.function.length) toc.push({label: 'Function', link: 'identifiers.html#function', indent: 'indent-h1'});
        if (identifiers.variable.length) toc.push({label: 'Variable', link: 'identifiers.html#variable', indent: 'indent-h1'});
        if (identifiers.typedef.length) toc.push({label: 'Typedef', link: 'identifiers.html#typedef', indent: 'indent-h1'});
        if (identifiers.external.length) toc.push({label: 'External', link: 'identifiers.html#external', indent: 'indent-h1'});
      } else {
        const fileName = this._getManualOutputFileName(item);
        const html = this._convertMDToHTML(item);
        const $root = cheerio.load(html).root();
        const isHRise = $root.find('h1').length === 0;
        $root.find('h1,h2,h3,h4,h5').each((i, el)=>{
          const $el = cheerio(el);
          const label = $el.text();
          const link = `${fileName}#${$el.attr('id')}`;
          let indent;
          if (isHRise) {
            const tagName = `h${parseInt(el.tagName.charAt(1), 10) - 1}`;
            indent = `indent-${tagName}`;
          } else {
            indent = `indent-${el.tagName.toLowerCase()}`;
          }
          toc.push({label, link, indent});
        });
      }

      ice.attr('manual', 'data-toc-name', item.label.toLowerCase());
      ice.text('title', item.label);
      ice.attr('title', 'href', this._getManualOutputFileName(item));
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
   * @returns {string} file name.
   * @private
   */
  _getManualOutputFileName(item) {
    if (item.fileName) return item.fileName;
    return `manual/${item.label.toLowerCase()}.html`;
  }

  /**
   * convert markdown to html.
   * if markdown has only one ``h1`` and it's text is ``item.label``, remove the ``h1``.
   * because duplication ``h1`` in output html.
   * @param {ManualConfigItem} item - target.
   * @returns {string} converted html.
   * @private
   */
  _convertMDToHTML(item) {
    const contents = [];
    for (let path of item.paths) {
      contents.push(fs.readFileSync(path).toString());
    }
    const content = contents.join('\n\n');
    const html = markdown(content);
    const $root = cheerio.load(html).root();
    return $root.html();
  }

  /**
   * get label synonyms.
   * @param {string} label - target item label.
   * @returns {string[]} synonyms
   * @private
   */
  _getLabelSynonyms(label) {
    switch (label.toLowerCase()) {
      case 'overview':
        return ['overview'];
      case 'installation':
        return ['installation', 'install'];
      case 'tutorial':
        return ['tutorial'];
      case 'configuration':
        return ['configuration', 'config'];
      case 'usage':
        return ['usage'];
      case 'example':
        return ['example', 'examples'];
      case 'faq':
        return ['faq'];
      case 'changelog':
        return ['changelog', 'change log'];
    }
  }
}
