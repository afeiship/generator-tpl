# routerx
> Generate routes for react-router.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/routerx
```

## structure
> tree ./src directory.

```conf
.
├── App.css
├── App.tsx
├── modules
│   ├── admin
│   │   ├── __init__.tsx
│   │   └── users
│   │       ├── __init__.tsx
│   │       ├── add.tsx
│   │       ├── edit.tsx
│   │       └── index.tsx
│   └── routes.tsx
```

## usage
> In webpack or CRA app.

```ts
import routerx from '@jswork/routerx';

const routerRC = require('./.routerc.json');
const req = (item) => require(`.${item}`);

export default routerx(routerRC, req);
```

## usage in vite
> When in vite app.

```ts
import routerx from '@jswork/routerx';
import viteRequire from '@jswork/vite-require';
import routerRC from './.routerc.json';

const moduleFiles = import.meta.glob('./admin/**/*.tsx', { eager: true });
const viteReq = viteRequire(moduleFiles);

export default routerx(routerRC as any, viteReq);
```

## license
Code released under [the MIT license](https://github.com/afeiship/routerx/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/routerx
[version-url]: https://npmjs.org/package/@jswork/routerx

[license-image]: https://img.shields.io/npm/l/@jswork/routerx
[license-url]: https://github.com/afeiship/routerx/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/routerx
[size-url]: https://github.com/afeiship/routerx/blob/master/dist/routerx.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/routerx
[download-url]: https://www.npmjs.com/package/@jswork/routerx
