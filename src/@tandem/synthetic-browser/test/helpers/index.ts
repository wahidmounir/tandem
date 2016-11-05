import { Injector } from "@tandem/common";
import {
  SyntheticBrowser,
  SyntheticDocument,
  SyntheticDOMContainer,
  SyntheticDOMElement,
  SyntheticDOMText,
  parseCSS,
  evaluateCSS,
  parseMarkup,
  evaluateMarkup,
  SyntheticDOMComment,
  SyntheticCSSStyleSheet,
} from "@tandem/synthetic-browser";
import { createSandboxProviders, IFileResolver, IFileSystem } from "@tandem/sandbox";
import { createCoreApplicationProviders } from "@tandem/core";
import { sample, sampleSize, random } from "lodash";

export function createMockBrowser() {
  const deps = createSandboxProviders();
  return new SyntheticBrowser(new Injector(deps));
}

const CHARS = "abcdefg".split("");


function generateRandomText(maxLength: number = 5) {
  return sampleSize(CHARS, random(1, maxLength)).join("");
}

function generateRandomChar() {
  return sample(CHARS);
}


function generateRandomSyntheticHTMLElementSource(maxChildCount: number = 10, maxDepth: number = 10, maxAttributes: number = 10) {

  function createRandomSyntheticFragment() {

    const fragment = [];

    if (maxDepth)
    for (let i = random(0, maxChildCount); i--;) {
      fragment.push(generateRandomSyntheticHTMLElementSource(maxChildCount, random(0, maxDepth - 1), maxAttributes));
    }

    return fragment.join("");
  }


  function createRandomElement() {
    const tagName = generateRandomChar();
    let element = ["<", tagName];

    for (let i = random(0, maxAttributes); i--;) {
      element.push(" ", generateRandomChar(), '="', generateRandomText(), '"');
    }

    element.push(">", createRandomSyntheticFragment(), "</" + tagName + ">");

    return element.join("");
  }

  function createRandomTextNode() {
    return generateRandomText();
  }

  function createRandomComment() {
      return `<!--${generateRandomText()}-->`;
  }

  return maxDepth ? createRandomElement() : sample([createRandomElement, createRandomTextNode, createRandomComment])();
}

export function generateRandomSyntheticHTMLElement(document: SyntheticDocument, maxChildCount: number = 10, maxDepth: number = 10, maxAttributes: number = 10, generateShadow: boolean = false) {
  return evaluateMarkup(parseMarkup(generateRandomSyntheticHTMLElementSource(maxChildCount, maxDepth, maxAttributes)), document);
}

export function generateRandomStyleSheet(maxRules: number = 100, maxDeclarations: number = 20): SyntheticCSSStyleSheet {

  function createKeyFrameRule() {
    `@keyframes ${generateRandomChar()} {
      ${
        Array.from({ length: random(0, maxRules) }).map((v) => {
          return createStyleRule();
        }).join("\n")
      }
    }`
  }
  function createStyleRule() {
    return `.${generateRandomChar()} {
      ${
        Array.from({ length: random(0, maxDeclarations) }).map((v) => {
          return `${generateRandomChar()}: ${generateRandomText(2)};`;
        }).join("\n")
      }
    }`
  }
  function createMediaRule() {
    return `@media ${generateRandomChar()} {
      ${
        Array.from({ length: random(0, maxRules) }).map((v) => {
          return sample([createStyleRule, createKeyFrameRule])();
        }).join("\n")
      }
    }`;
  }

  const randomStyleSheet = Array
  .from({ length: random(0, maxRules) })
  .map(v => sample([createStyleRule])()).join("\n");

  return evaluateCSS(parseCSS(randomStyleSheet));
}