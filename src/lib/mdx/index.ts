/**
 * MDX System - Main Entry Point
 * 
 * This module provides a complete MDX component system that can be:
 * 1. Used in the editor for authoring content
 * 2. Used in the renderer for displaying content
 * 3. Exported to other projects for consistent rendering
 * 
 * Usage in other projects:
 * ```tsx
 * import { MDX_COMPONENTS } from './lib/mdx';
 * import { MDXProvider } from '@mdx-js/react';
 * 
 * <MDXProvider components={MDX_COMPONENTS}>
 *   <MDXContent />
 * </MDXProvider>
 * ```
 */

// Types
export * from "./types";

// Registry
export * from "./registry";

// Utilities
export * from "./utils";

// Components
export * from "./components";
