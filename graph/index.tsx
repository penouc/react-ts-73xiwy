import React, { useState, useRef, useEffect } from 'react';
import G6 from '@antv/g6';
import { uuid } from './utils';
import { mockData } from './demo/indexTree';
import './nodes';

//  组件props
const props = {
  data: mockData,
  config: {
    padding: [20, 50],
    defaultLevel: 3,
    defaultZoom: 0.8,
    modes: { default: ['zoom-canvas', 'drag-canvas'] },
  },
  onInit: (a) => a,
};

let graph = null;

function Graph() {
  const uid = uuid();

  useEffect(() => {
    const container = document.getElementById(uid);
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;

    // 默认配置
    const defaultConfig = {
      width,
      height,
      modes: {
        default: ['zoom-canvas', 'drag-canvas'],
      },
      fitView: true,
      animate: true,
      defaultNode: {
        type: 'blocks',
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#CED4D9',
        },
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 300,
        getHeight: () => {
          return 60;
        },
      },
    };

    const { onInit, config, data } = props;

    graph = new G6.TreeGraph({
      container: uid,
      ...defaultConfig,
      ...config,
    });
    if (typeof onInit === 'function') {
      onInit(graph);
    }
    graph.data(data);
    graph.render();
    graph.zoom(config.defaultZoom || 1);
  });

  return <div id={uid}></div>;
}

export { Graph };
