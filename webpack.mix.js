const mix = require('laravel-mix')

mix.ts('resources/ts/index.tsx', 'js')
    .sass('resources/sass/app.scss', 'css')

if(mix.inProduction()) {
    mix.version();
}