import G6 from '@antv/g6';

const colors = {
  B: '#5B8FF9',
  R: '#F46649',
  Y: '#EEBC20',
  G: '#5BD8A6',
  DI: '#A7A7A7',
};

G6.registerNode(
  'blocks',
  {
    shapeType: 'blocks',
    draw(cfg, group) {
      const {
        name = '',
        variableName,
        variableValue,
        variableUp,
        label,
        collapsed,
        currency,
        status,
        rate,
      } = cfg;
      const grey = '#CED4D9';
      // 逻辑不应该在这里判断
      const rectConfig = {
        width: 202,
        height: 60,
        lineWidth: 1,
        fontSize: 12,
        fill: '#fff',
        radius: 4,
        stroke: grey,
        opacity: 1,
      };

      const nodeOrigin = {
        x: -rectConfig.width / 2,
        y: -rectConfig.height / 2,
      };

      const textConfig = {
        textAlign: 'left',
        textBaseline: 'bottom',
      };

      const rect = group.addShape('rect', {
        attrs: {
          x: nodeOrigin.x,
          y: nodeOrigin.y,
          ...rectConfig,
        },
      });

      const rectBBox = rect.getBBox();

      // label title
      group.addShape('text', {
        attrs: {
          ...textConfig,
          x: 12 + nodeOrigin.x,
          y: 20 + nodeOrigin.y,
          text: name.length > 28 ? name.substr(0, 28) + '...' : name,
          fontSize: 12,
          opacity: 0.85,
          fill: '#000',
          cursor: 'pointer',
        },
        name: 'name-shape',
      });

      // price
      const price = group.addShape('text', {
        attrs: {
          ...textConfig,
          x: 12 + nodeOrigin.x,
          y: rectBBox.maxY - 12,
          text: label,
          fontSize: 16,
          fill: '#000',
          opacity: 0.85,
        },
      });

      // label currency
      group.addShape('text', {
        attrs: {
          ...textConfig,
          x: price.getBBox().maxX + 5,
          y: rectBBox.maxY - 12,
          text: currency,
          fontSize: 12,
          fill: '#000',
          opacity: 0.75,
        },
      });

      // percentage
      const percentText = group.addShape('text', {
        attrs: {
          ...textConfig,
          x: rectBBox.maxX - 8,
          y: rectBBox.maxY - 12,
          text: `${((variableValue || 0) * 100).toFixed(2)}%`,
          fontSize: 12,
          textAlign: 'right',
          fill: colors[status],
        },
      });

      // percentage triangle
      const symbol = variableUp ? 'triangle' : 'triangle-down';
      const triangle = group.addShape('marker', {
        attrs: {
          ...textConfig,
          x: percentText.getBBox().minX - 10,
          y: rectBBox.maxY - 12 - 6,
          symbol,
          r: 6,
          fill: colors[status],
        },
      });

      // variable name
      group.addShape('text', {
        attrs: {
          ...textConfig,
          x: triangle.getBBox().minX - 4,
          y: rectBBox.maxY - 12,
          text: variableName,
          fontSize: 12,
          textAlign: 'right',
          fill: '#000',
          opacity: 0.45,
        },
      });

      // bottom line background
      const bottomBackRect = group.addShape('rect', {
        attrs: {
          x: nodeOrigin.x,
          y: rectBBox.maxY - 4,
          width: rectConfig.width,
          height: 4,
          radius: [0, 0, rectConfig.radius, rectConfig.radius],
          fill: '#E0DFE3',
        },
      });

      // bottom percent
      const bottomRect = group.addShape('rect', {
        attrs: {
          x: nodeOrigin.x,
          y: rectBBox.maxY - 4,
          width: rate * rectBBox.width,
          height: 4,
          radius: [0, 0, 0, rectConfig.radius],
          fill: colors[status],
        },
      });

      // collapse rect
      if (cfg.children && cfg.children.length) {
        group.addShape('rect', {
          attrs: {
            x: rectConfig.width / 2 - 8,
            y: -8,
            width: 16,
            height: 16,
            stroke: 'rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            fill: '#fff',
          },
          name: 'collapse-back',
          modelId: cfg.id,
        });

        // collpase text
        group.addShape('text', {
          attrs: {
            x: rectConfig.width / 2,
            y: -1,
            textAlign: 'center',
            textBaseline: 'middle',
            text: collapsed ? '+' : '-',
            fontSize: 16,
            cursor: 'pointer',
            fill: 'rgba(0, 0, 0, 0.25)',
          },
          name: 'collapse-text',
          modelId: cfg.id,
        });
      }

      this.drawLinkPoints(cfg, group);
      return rect;
    },
    update(cfg, item) {
      const group = item.getContainer();
      this.updateLinkPoints(cfg, group);
    },
    setState(name, value, item) {
      if (name === 'collapse') {
        const group = item.getContainer();
        const collapseText = group.find(
          (e) => e.get('name') === 'collapse-text'
        );
        if (collapseText) {
          if (!value) {
            collapseText.attr({
              text: '-',
            });
          } else {
            collapseText.attr({
              text: '+',
            });
          }
        }
      }
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5],
      ];
    },
  },
  'rect'
);
