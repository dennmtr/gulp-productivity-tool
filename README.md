# gulp-productivity-tool

### A handy tool, bundling assets using Gulp and predifined templates

> Almost not for begginers, you have to know Gulp workflow and how a static web site is structured in advance

- Use predifined templates to import common libraries
- Inject scss variables and create custom themes out of the box

#### Installation

```console
npm install --no-optional
```

#### Common (optional) tasks per environment:

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

### Example using a Bootstrap project from scratch

#### Override gulp configuration and paths

```console
cp resources/gulp-user-overrides.example.ts resources/gulp-user-overrides.ts
```

> resources/gulp-user-overrides.ts

```typescript script
const override: UserOverride = (
  paths,
  { bootstrapV5 /*, fontAwesomeV6*/ },
) => ({
  templates: [bootstrapV5 /*, fontAwesomeV6*/],
  vendor: {
    scripts: [
      //paths.libs + 'quill.js',
      //paths.node + 'quill/dist/quill.js'
    ],
    styles: [
      //paths.libs + 'quill.snow.css',
      //paths.node + 'quill/dist/quill.snow.css'
    ],
  },
  app: {
    scripts: ['app.js'],
    styles: ['app.scss'],
  },
})
```

#### Move bootstrap from _optionalDependencies_ to _dependencies_ inside **package.json** and run

```console
npm install --no-optional
```

#### Override global theme and customize

```console
cp resources/.profiles/bootstrap-5/_bootstrap5.example.scss resources/.profiles/bootstrap-5/_bootstrap5.scss
```

> [Free Bootstrap Builder](https://bootstrap.build/app/ 'Free Bootstrap Builder')

#### Import bootstrap variables to your application

```console
cp resources/src/scss/app.example.scss resources/src/scss/app.scss
```

> resources/src/scss/app.scss

```scss
@import 'bootstrap-5/config';

.myselection {
  color: $primary;
}
```

#### Create a script file

```console
cp resources/src/app.example.js resources/src/app.js
```

#### Server configuration

```console
cp .env-cmdrc.example .env-cmdrc
```

_If you will use asset revisioning (recommended) import app/rev.php to your php script (example, views/index.example.php), or integrate it as a helper function to your framework (then you will need to modify the manifest path inside function). Import vendor.css, app.css, vendor.js, app.js to header and footer view partials wrapping them in rev function_

#### Watch

```console
npm run gulp:start
```
