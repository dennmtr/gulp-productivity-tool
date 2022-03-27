# gulp-productivity-tool

### Bundling assets using Gulp and predifined templates

> Almost not for begginers, you have to know Gulp workflow and how a static web site is structured in advance

- Use predifined template profiles to import common libraries
- Inject scss variables and create custom themes out of the box

#### Installation

```console
npm install
```

#### Common (optional) tasks per environment:

- asset revisioning
- minification
- line ending correction
- source maps
- comment removal
- strip debugging
- transpiling & modularity
- delete duplicate css
- remove empty classes
- purge css
- preserve a single charset
- autoprefixer
- import external assets
- file watch

### Example using a Bootstrap project from scratch

> [See more examples](#list-of-predefined-profile-templates)

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
  //purgeCss: false,
  //minify: true,
})
```

#### Install

```console
npm i bootstrap
```

#### Override global theme and customize

```console
cp resources/.profiles/bootstrap/_variables.example.scss resources/.profiles/bootstrap/_variables.scss
```

> [Free Bootstrap Theme Builder](https://bootstrap.build/app/ 'Free Bootstrap Theme Builder')

#### Import bootstrap variables to your application

```console
cp resources/src/scss/app.example.scss resources/src/scss/app.scss
```

> resources/src/scss/app.scss

```scss
@import 'bootstrap/overrides';

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

<details><summary>Asset revisioning</summary><blockquote>
  If you will use asset revisioning, import app/rev.php to your php script (example, views/index.example.php), or integrate it as a helper function to your framework (then you will need to modify the manifest path inside function). Import vendor.css, app.css, vendor.js, app.js to header and footer view partials, wrapping them in rev function
</blockquote></details>

#### Watch

```console
npm run gulp:start
```

### List of predefined profile templates

#### Libraries

| Library                                   | Template Profile   | Install                             | Override file (.profiles)                                                         |
| ----------------------------------------- | ------------------ | ----------------------------------- | --------------------------------------------------------------------------------- |
| Bootstrap 3.4.3                           | bootstrapV3_jQuery | `npm i jquery bootstrap-sass@3.4.3` | `bootstrap-3/_variables.bs3.scss`                                                 |
| Bootstrap 4.6.1                           | bootstrapV4_jQuery | `npm i jquery bootstrap@v4.6.1`     | `bootstrap-4/_variables.bs4.scss`                                                 |
| Bootstrap 5                               | bootstrapV5        | `npm i bootstrap`                   | `bootstrap/_variables.scss`                                                       |
| Materialize                               | materialize        | `npm i materialize-css@next`        | `materialize/_materialize_colors.scss`, `materialize/_materialize_variables.scss` |
| Material Design for Bootstrap (jQuery)    | mdBootstrap_jQuery | `npm i mdbootstrap`                 | `mdbootstrap/_mdbootstrap_colors.scss`, `mdbootstrap/_mdbootstrap_variables.scss` |
| Material Design for Bootstrap 5 (Vanilla) | mdb3               | `npm i mdb-ui-kit`                  | `mdb3/_mdb3.scss`                                                                 |
| jQuery                                    | jQuery             | `npm i jquery`                      | -                                                                                 |

#### Icons

| Library               | Template Profile    | Install                                      |
| --------------------- | ------------------- | -------------------------------------------- |
| Bootstrap Icons       | bootstrapIcons      | `npm i bootstrap-icons`                      |
| Codicons              | codIcons            | `npm i @vscode/codicons`                     |
| Devicon               | devIcons            | `npm i devicons`                             |
| Font Awesome 4.7.0    | fontAwesomeV4       | `npm i font-awesome`                         |
| Font Awesome 5.15.4   | fontAwesomeV5       | `npm i @fortawesome/fontawesome-free@5.15.4` |
| Font Awesome 6        | fontAwesomeV6       | `npm i @fortawesome/fontawesome-free`        |
| Ionicons              | ionIcons            | `npm i ionicons`                             |
| Material Design Icons | materialDesignIcons | `npm i material-design-icons`                |
| Material Icons        | materialIcons       | `npm i material-icons`                       |
| Remix Icon            | remixIcon           | `npm i remixicon`                            |
| Typicons              | typIcons            | `npm i typicons.font`                        |
| Weather Icons         | weatherIcons        | `npm i weathericons`                         |
