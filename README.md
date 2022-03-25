# gulp-static-boilerplate

### A handy tool, bundling assets using Gulp and predifined templates

> Almost not for begginers, you have to know how Gulp works and how a static web site is structured in advance

* Use predifined templates to import common libraries
* Inject scss variables and create custom themes out of the box

#### Installation

```console
npm install --no-optional

cp resources/gulp-user-overrides.example.ts resources/gulp-user-overrides.ts
```

#### Example ***gulp-user-overrides.ts***

> resources/gulp-user-overrides.ts

```typescript script
const override: UserOverride = (
  paths,
  {
    bootstrapV5,
    fontAwesomeV5,
  },
) => ({
  templates: [
    bootstrapV5,
    fontAwesomeV5,
  ],
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
