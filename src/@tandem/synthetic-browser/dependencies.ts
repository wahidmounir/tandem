import { SyntheticBrowser } from "./browser";
import { syntheticElementClassType, SyntheticDOMNode } from "./dom";
import { Dependency, Dependencies, MimeTypeDependency } from "@tandem/common";
import { entityType, BaseDOMNodeEntity, DefaultSyntheticDOMEntity } from "./entities";

export class SyntheticDOMElementClassDependency extends Dependency<syntheticElementClassType> {
  static readonly SYNTHETIC_ELEMENT_CLASS_NS_PREFIX = "syntheticMarkupElementClass/";

  constructor(readonly xmlns: string, readonly tagName: string, value: syntheticElementClassType) {
    super(SyntheticDOMElementClassDependency.getNamespace(xmlns, tagName), value);
  }

  clone() {
    return new SyntheticDOMElementClassDependency(this.xmlns, this.tagName, this.value);
  }

  static getNamespace(xmlns: string, tagName: string) {
    return [this.SYNTHETIC_ELEMENT_CLASS_NS_PREFIX, encodeURIComponent(xmlns), tagName].join("/");
  }

  static findAll(dependencies: Dependencies) {
    return dependencies.queryAll<SyntheticDOMElementClassDependency>([this.SYNTHETIC_ELEMENT_CLASS_NS_PREFIX, "**"].join("/"));
  }
}

export class SyntheticDOMNodeEntityClassDependency extends Dependency<entityType> {
  static readonly SYNTHETIC_NODE_COMPONENT_NS_PREFIX = "syntheticNodeComponentClass";

  constructor(readonly xmlns: string, readonly tagName: string, value: entityType) {
    super(SyntheticDOMNodeEntityClassDependency.getNamespace(xmlns, tagName), value, true);
  }

  clone() {
    return new SyntheticDOMNodeEntityClassDependency(this.xmlns, this.tagName, this.value);
  }

  create(source: SyntheticDOMNode) {
    return new this.value(source);
  }

  static getNamespace(xmlns: string, tagName: string) {
    return [this.SYNTHETIC_NODE_COMPONENT_NS_PREFIX, encodeURIComponent(xmlns), tagName].join("/");
  }

  static reuse(source: SyntheticDOMNode, entity: BaseDOMNodeEntity<any, any>, dependencies: Dependencies) {
    if (entity && entity.source.nodeName === source.nodeName) {
      entity.source = source;
      return entity;
    } else {
      return this.create(source, dependencies);
    }
  }

  static find(source: SyntheticDOMNode, dependencies: Dependencies) {
    return this.findByNodeName(source.namespaceURI, source.nodeName, dependencies);
  }

  static findByNodeName(xmlns: string, nodeName: string, dependencies: Dependencies) {
    return dependencies.query<SyntheticDOMNodeEntityClassDependency>(this.getNamespace(xmlns, nodeName));
  }

  static create(source: SyntheticDOMNode, dependencies: Dependencies) {
    const factory = this.find(source, dependencies) || this.findByNodeName(source.namespaceURI, "default", dependencies) || this.findByNodeName(undefined, "default", dependencies);
    return factory ? factory.create(source) : new DefaultSyntheticDOMEntity(source);
  }
}

export class MarkupMimeTypeXMLNSDependency extends Dependency<string> {
  static readonly MARKUP_MIME_TYPE_XMLNS = "markupMimeTypeXMLNS";
  constructor(readonly mimeType: string, readonly xmlns: string) {
    super(MarkupMimeTypeXMLNSDependency.getNamespace(mimeType), xmlns);
  }
  static getNamespace(mimeType: string) {
    return [this.MARKUP_MIME_TYPE_XMLNS, mimeType].join("/");
  }
  static lookup(path: string, dependencies: Dependencies): string {
    const mimeType = MimeTypeDependency.lookup(path, dependencies);
    const dependency = dependencies.query<MarkupMimeTypeXMLNSDependency>(this.getNamespace(mimeType));
    return dependency && dependency.value;
  }
}

/**
 * Casts vanilla objects as synthetic DOM nodes. Used to mount library components such as
 * React, Vue, Ember, Angular, and others.
 */

export interface IMarkupDOMCaster {
  cast(object: any, browser: SyntheticBrowser): Promise<SyntheticDOMNode>|SyntheticDOMNode;
}

export class SyntheticDOMCasterDependency extends Dependency<IMarkupDOMCaster> {
  static readonly MARKUP_DOM_CASTER_NS = "markupDOMCaster";
  constructor(id: string, value: IMarkupDOMCaster) {
    super(SyntheticDOMCasterDependency.getNamespace(id), value);
  }

  static getNamespace(id: string) {
    return [this.MARKUP_DOM_CASTER_NS, id].join("/");
  }

  static async castAsDOMNode(object: any, browser: SyntheticBrowser, dependencies: Dependencies): Promise<SyntheticDOMNode> {
    for (const dep of dependencies.queryAll<SyntheticDOMCasterDependency>(this.getNamespace("**"))) {
      const ret = await dep.value.cast(object, browser);
      if (ret instanceof SyntheticDOMNode) return ret;
    }
    return undefined;
  }
}