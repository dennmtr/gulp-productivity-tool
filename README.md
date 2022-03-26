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

### Example using Bootstrap

#### Override gulp configuration and paths

```console
cp resources/gulp-user-overrides.example.ts resources/gulp-user-overrides.ts
```

> resources/gulp-user-overrides.ts

```typescript script
const override: UserOverride = (paths, { bootstrapV5, fontAwesomeV6 }) => ({
  templates: [bootstrapV5 /*fontAwesomeV6*/],
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

#### Remove bootstrap from _optionalDependencies_ inside **package.json** and run

```console
npm install bootstrap --no-optional
```

#### Override global theme and customize

```console
cp resources/.profiles/bootstrap-5/_bootstrap5.example.scss resources/.profiles/bootstrap-5/_bootstrap5.scss
```

> https://bootstrap.build/app

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

#### Configure your server

```console
cp .env-cmdrc.example .env-cmdrc
```

#### Watch

```console
npm run gulp:start
```
