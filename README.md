# gulp-productivity-tool

### A handy tool, bundling assets using Gulp and predifined templates

> Almost not for begginers, you have to know Gulp workflow and how a static web site is structured in advance

- Use predifined templates to import common libraries
- Inject scss variables and create custom themes out of the box

#### Installation

```console
npm install --no-optional

cp resources/gulp-user-overrides.example.ts resources/gulp-user-overrides.ts
```

#### Common optional tasks per environment:

- asset revisioning
- minification
- line ending correction
- source maps
- comment removal
- strip debugging
- beautify
- transpile
- modular & non modular support
- delete duplicate css
- remove empty classes
- purge css
- preserve a single charset
- autoprefixer
- import external assets
- file watch

#### Example **_gulp-user-overrides.ts_**

> resources/gulp-user-overrides.ts

```typescript script
const override: UserOverride = (paths, { bootstrapV5, fontAwesomeV5 }) => ({
  templates: [bootstrapV5, fontAwesomeV5],
  vendor: {
    scripts: [
      paths.libs + 'quill.js',
      //paths.node + 'quill/dist/quill.js'
    ],
    styles: [
      paths.libs + 'quill.snow.css',
      //paths.node + 'quill/dist/quill.snow.css'
    ],
  },
  app: {
    scripts: ['app.js'],
    styles: ['app.scss'],
  },
})
```

#### Override theme

```console
cp resources/.profiles/bootstrap-5/_bootstrap5.example.scss resources/.profiles/bootstrap-5/_bootstrap5.scss
```

> https://bootstrap.build/app
