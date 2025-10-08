/**
 * Utility functions for parsing and manipulating MDX nodes
 */

import { MDXNode, MDXAttribute, ParsedComponentProps } from "./types";

/**
 * Parses attributes from an MDX node into a props object
 */
export const parseMDXAttributes = (mdastNode?: MDXNode): ParsedComponentProps => {
  if (!mdastNode?.attributes) return {};

  return mdastNode.attributes.reduce((acc, attr: MDXAttribute) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {} as ParsedComponentProps);
};

/**
 * Gets a specific attribute value from an MDX node
 */
export const getAttribute = <T = any>(
  mdastNode: MDXNode | undefined,
  attributeName: string,
  defaultValue?: T
): T | undefined => {
  if (!mdastNode?.attributes) return defaultValue;

  const attr = mdastNode.attributes.find(
    (attr: MDXAttribute) => attr.name === attributeName
  );

  return attr?.value ?? defaultValue;
};

/**
 * Validates that required attributes are present
 */
export const validateAttributes = (
  mdastNode: MDXNode | undefined,
  requiredAttributes: string[]
): boolean => {
  if (!mdastNode?.attributes) return false;

  const attributeNames = mdastNode.attributes.map((attr) => attr.name);
  return requiredAttributes.every((required) =>
    attributeNames.includes(required)
  );
};

/**
 * Serializes props into MDX component string
 */
export const serializeToMDX = (
  componentName: string,
  props: ParsedComponentProps
): string => {
  const propsString = Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value}"`;
      } else if (typeof value === "number" || typeof value === "boolean") {
        return `${key}={${value}}`;
      } else if (typeof value === "object") {
        return `${key}={${JSON.stringify(value)}}`;
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");

  return `<${componentName} ${propsString} />`;
};

/**
 * Creates a component code template for insertion
 */
export const createComponentTemplate = (
  componentName: string,
  defaultProps: ParsedComponentProps = {}
): string => {
  return serializeToMDX(componentName, defaultProps);
};
