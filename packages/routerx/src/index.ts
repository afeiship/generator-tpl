import { RouteObject } from 'react-router-dom';
import React from 'react';

function walk(ctx, fn) {
  if (ctx.children) {
    ctx.children.forEach((item, index) => {
      if (!Array.isArray(item)) {
        fn(item, index, ctx);
      }
      if (item.children) walk(item, fn);
    });
  }
}

export default (routerRC, req) => {
  walk(routerRC, (item) => {
    const Comp = req(item.routerFilePath);
    const Routes = Comp.Routes;

    item.element = React.createElement(Comp.default);

    if (item.routerPath) item.path = item.routerPath;
    if (item.routerIndex) item.index = item.routerIndex;

    Object.assign(item, Routes);

    delete item.routerIndex;
    delete item.routerPath;
    delete item.routerFilePath;
  });
  return routerRC.children as RouteObject[];
};
