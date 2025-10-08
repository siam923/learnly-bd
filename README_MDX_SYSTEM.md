# MDX Component System

A professional, extensible MDX editor and renderer system for interactive educational content.

## 🏗️ Architecture

```
src/lib/mdx/
├── types.ts          # Type definitions for all components
├── registry.ts       # Central component registry
├── utils.ts          # Parsing and serialization utilities
├── components.tsx    # Runtime component map
└── index.ts          # Main entry point

src/components/admin/mdx-editors/
├── EditorAdapters.tsx           # Bridge between MDX nodes and editors
├── ComponentEditorWrapper.tsx   # Reusable wrapper for editor components
└── [Component]Editor.tsx        # Visual editors for each component

src/components/lesson/
├── MDXRenderer.tsx              # Main renderer component
└── LessonRenderer.tsx           # Legacy wrapper (deprecated)
```

## 🚀 Usage

### In the Editor (Admin)

The editor automatically uses the component registry:

```tsx
import { LessonEditor } from '@/components/admin/LessonEditor';

<LessonEditor chapters={chapters} />
```

### Rendering Content

Use the `MDXRenderer` component:

```tsx
import { MDXRenderer } from '@/components/lesson/MDXRenderer';

<MDXRenderer content={lessonContent} />
```

### In Other Projects

Export the component system for use in separate projects:

```tsx
// Import the component map
import { MDX_COMPONENTS } from './lib/mdx';
import { MDXProvider } from '@mdx-js/react';

// Use with MDXProvider
<MDXProvider components={MDX_COMPONENTS}>
  <YourMDXContent />
</MDXProvider>
```

## 📦 Adding New Components

1. **Create the Interactive Component** (`src/components/interactive/`)
```tsx
export const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  return <div>...</div>;
};
```

2. **Add Type Definition** (`src/lib/mdx/types.ts`)
```tsx
export interface MyComponentProps {
  prop1: string;
  prop2: number;
}

export type ComponentPropsMap = {
  // ... existing
  MyComponent: MyComponentProps;
};
```

3. **Create Visual Editor** (`src/components/admin/mdx-editors/MyComponentEditor.tsx`)
```tsx
export const MyComponentEditor = ({ prop1, prop2 }: MyComponentProps) => {
  return (
    <ComponentEditorWrapper componentName="MyComponent" icon={<Icon />}>
      {/* Visual representation */}
    </ComponentEditorWrapper>
  );
};
```

4. **Create Editor Adapter** (`src/components/admin/mdx-editors/EditorAdapters.tsx`)
```tsx
export const MyComponentEditorAdapter = ({ mdastNode }: EditorAdapterProps) => {
  const props = parseMDXAttributes(mdastNode);
  return <MyComponentEditor {...props} />;
};
```

5. **Register Component** (`src/lib/mdx/registry.ts`)
```tsx
export const MDX_COMPONENT_REGISTRY = {
  // ... existing
  MyComponent: {
    name: "MyComponent",
    kind: "flow",
    source: "./components/interactive/MyComponent",
    props: [
      { name: "prop1", type: "string", required: true },
      { name: "prop2", type: "number", required: false },
    ],
    hasChildren: false,
    Editor: MyComponentEditorAdapter,
  },
};
```

6. **Add to Component Map** (`src/lib/mdx/components.tsx`)
```tsx
import { MyComponent } from "@/components/interactive/MyComponent";

export const MDX_COMPONENTS = {
  // ... existing
  MyComponent,
};
```

## 🛠️ Utilities

### Parse MDX Attributes
```tsx
import { parseMDXAttributes } from '@/lib/mdx/utils';

const props = parseMDXAttributes(mdastNode);
```

### Get Specific Attribute
```tsx
import { getAttribute } from '@/lib/mdx/utils';

const value = getAttribute(mdastNode, 'attributeName', defaultValue);
```

### Serialize to MDX
```tsx
import { serializeToMDX } from '@/lib/mdx/utils';

const mdx = serializeToMDX('ComponentName', { prop: 'value' });
// Output: <ComponentName prop="value" />
```

## 🎨 Component Editor Wrapper

Use the `ComponentEditorWrapper` for consistent editor styling:

```tsx
<ComponentEditorWrapper
  componentName="MyComponent"
  icon={<MyIcon />}
  onDelete={() => handleDelete()}
>
  <div>Your editor content</div>
</ComponentEditorWrapper>
```

## 🔒 Type Safety

All components are fully typed:

```tsx
import type { MyComponentProps } from '@/lib/mdx/types';

const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  // TypeScript knows the exact types
};
```

## 📚 Available Components

- **Quiz**: Interactive quizzes with multiple choice questions
- **VideoEmbed**: Embedded video players (YouTube, Vimeo)
- **MathPuzzle**: Math problem with hints and answers
- **PhysicsSimulator**: Interactive physics simulations
- **PeriodicTableVisualizer**: Interactive periodic table
- **AngleVisualizer**: Geometric angle visualization

## 🔄 Migration from Legacy Code

Old code:
```tsx
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
```

New code:
```tsx
import { MDXRenderer } from '@/components/lesson/MDXRenderer';
```

The old `LessonRenderer` still works but is deprecated.

## 🌟 Best Practices

1. **Centralize**: Always register components in the registry
2. **Type-safe**: Use TypeScript interfaces for all props
3. **Reusable**: Use `ComponentEditorWrapper` for consistent styling
4. **Testable**: Utilities are pure functions, easy to test
5. **Scalable**: Add new components without touching existing code

## 📄 License

Part of the educational platform project.
