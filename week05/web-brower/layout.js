function getStyle(el) {
  if (!el.style) {
    el.style = {};
  }

  for (let v in el.computedStyle) {
    const p = el.computedStyle.value;
    el.style[v] = el.computedStyle[v].value;

    if (el.style[v].toString().match(/px$/)) {
      el.style[v] = parseInt(el.style[v]);
    }
    if (el.style[v].toString().match(/^[0-9\.]+$/)) {
      el.style[v] = parseInt(el.style[v]);
    }
  }
  return el.style;
}


module.exports = function (el) {
  if (!el.computedStyle) {
    return;
  }

  const elStyle = getStyle(el);
  if (elStyle.display !== 'flex') return;

  const items = el.children.filter(e => e.type === 'element');
  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0);
  });
  const style = elStyle;
  ['width', 'height'].forEach(size => {
    if (style[size] === 'auto' || style[size] === '') {
      style[size] = null;
    }
  });

  if (!style.flexDirection || style.flexDirection === 'auto') {
    style.flexDirection = 'row';
  }
  if (!style.alignItems || style.alignItems === 'auto') {
    style.alignItems = 'stretch';
  }
  if (!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if (!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';
  }
  if (!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }
  let mainSize, mainSrart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase;
  if (style.flexDirection === 'row') {
    mainSize = 'width';
    mainSrart = 'left';
    mainEnd = 'right';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if (style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainSrart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }

  if (style.flexDirection === 'column') {
    mainSize = 'height';
    mainSrart = 'top';
    mainEnd = 'bottom';
    mainSign = +1;
    mainBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }
  if (style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainSrart = 'bottom';
    mainEnd = 'top';
    mainSign = -1;
    mainBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }

  if (style.flexWrap === 'wrap-reverse') {
    let tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  let isAutoMainSize = false;
  if (!style[mainSize]) {
    elStyle[mainSize] = 0;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] === 'auto') {
        elStyle[mainSize] = elStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }

  let flexLine = [];
  let flexLines = [flexLine];

  let mainSpace = elStyle[mainSize];
  let crossSpace = 0;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemStyle = getStyle(item);

    if (typeof itemStyle[mainSize] !== 'number') {
      itemStyle[mainSize] = 0;
    }

    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === 'nowrap' && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        flexLine.push(item);
      }
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  flexLine.mainSpace = mainSize;

  if (style.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {
    let scale = style[mainSize] / (style[mainSize] - mainSpace);
    let currentMain = mainBase;

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);
      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }
      itemStyle[mainSize] = itemStyle[mainSize] * scale;
      itemStyle[mainSrart] = currentMain;
      itemStyle[mainEnd] = itemStyle[mainSrart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    flexLines.forEach((items) => {
      let mainSpace = items.mainSpace;
      let flexTotal = 0;
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemStyle = getStyle(item);
        if ((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }
      // 计算主轴
      if (flexTotal > 0) {
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemStyle = getStyle(item);
          if (itemStyle.flex) {
            itemStyle[mainSize] = ((items.crossSpace- currentMain) / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainSrart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainSrart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        let currentMain, step;
        if (style.justifyContent === 'flex-start') {
          currentMain = mainBase;
          step = 0;
        }
        if (style.justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSign + mainBase;
          step = 0;
        }
        if (style.justifyContent === 'center') {
          currentMain = mainSpace / 2 * mainSign + mainBase;
          step = 0;
        }
        if (style.justifyContent === 'space-between') {
          step = mainSpace / (items.length - 1) + mainSign;
          currentMain = mainBase;
        }
        if (style.justifyContent === 'space-around') {
          step = mainSpace / items.length * mainSign;
          currentMain = step / 2 + mainBase;
        }
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemStyle = getStyle(item);
          itemStyle[mainSrart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainSrart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }

    });
  }

  // let crossSpace;
  if (!style[crossSize]) {
    crossSpace = 0;
    elStyle[crossSize] = 0;
    for (let i = 0; i < flexLines.length; i++) {
      elStyle[crossSize] = elStyle[crossSize] + flexLines[i].crossSpace;
    }
  } else {
    crossSpace = style[crossSize];
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if (style.flexWrap === 'wrap-reverse') {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }
  let lineStyle = style[crossSize] / flexLines.length;

  let step;
  if (style.alignContent === 'flex-start') {
    crossBase += 0;
    step = 0;
  }
  if (style.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if (style.alignContent === 'center') {
    crossBase += crossSign * crossSpace / 2;
    step = 0;
  }
  if (style.alignContent === 'space-between') {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if (style.alignContent === 'space-around') {
    step = crossSpace / (flexLines.length);
    crossBase += crossSign * step / 2;
  }
  if (style.alignContent === 'stretch') {
    crossBase += 0;
    step = 0;
  }
  flexLines.forEach((items) => {
    let lineCrossSize = style.alignContent === 'stretch' ?
      items.crossSpace + crossSpace / flexLines.length :
      items.crossSpace;
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let itemStyle = getStyle(item);

      let align = itemStyle.alignSelf || style['align-items'] ||style.alignItems;
      if (typeof item[crossSize] !== 'number') {
        itemStyle[crossSize] = lineCrossSize;
      }
      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'flex-end') {
        itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
      }
      if (align === 'center') {
        itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
        itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === 'stretch') {
        // itemStyle[crossStart] = crossBase;
        // itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[cross]))
      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
  // console.log(items);
};
