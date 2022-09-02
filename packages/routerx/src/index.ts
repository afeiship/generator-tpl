import { RouteObject } from 'react-router-dom';
import React from 'react';

// typings for routerx
type WalkFn = (item: NestedTreeObject, index: number, ctx: NestedTreeObject) => void;
type RequireFn = (value) => any;
type NestedTreeObject = RouteObject & {
  routerPath?: string;
  routerFilePath?: string;
  routerIndex?: boolean;
  children?: NestedTreeObject[];
};

function walk(ctx: NestedTreeObject, fn: WalkFn) {
  if (ctx.children) {
    ctx.children.forEach((item, index) => {
      if (!Array.isArray(item)) {
        fn(item, index, ctx);
      }
      if (item.children) walk(item, fn);
    });
  }
}

export default (routerRC: NestedTreeObject, req: RequireFn): RouteObject[] => {
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
