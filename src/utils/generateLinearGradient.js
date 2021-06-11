import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs';

const colorThief = new ColorThief();

function getRGBA(valueArr, alpha = 1) {
  return `rgba(${valueArr[0]}, ${valueArr[1]}, ${valueArr[2]}, ${alpha})`;
}

function darkestColorsFromPalette(palette) {
  const sortedPalette = palette.sort((a, b) => {
    return a[0] - b[0];
  });

  // approximately the closest colors we need
  const darkerColor = getRGBA(sortedPalette[1]);
  const lighterColor = getRGBA(sortedPalette[2], 0.8);

  return {
    darkerColor,
    lighterColor
  }
}

function linearGradient(clr1, clr2) {
  return `linear-gradient(to right, ${clr1} 150px, ${clr2} 100%)`;
}

function setLinearGradient(img, elemToAddGradient) {
  const palette = colorThief.getPalette(img);
  const colors = darkestColorsFromPalette(palette);
  const gradient = linearGradient(colors.darkerColor, colors.lighterColor);

  elemToAddGradient.style.backgroundImage = gradient;
}

export {
  setLinearGradient
}
