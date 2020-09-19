import tinycolor, { ColorFormats } from "tinycolor2";
import { rgba } from "polished";

const colorPalette = (() => {
  const hueStep = 2;
  const saturationStep = 0.16;
  const saturationStep2 = 0.05;
  const brightnessStep1 = 0.05;
  const brightnessStep2 = 0.15;
  const lightColorCount = 5;
  const darkColorCount = 4;

  const getHue = (hsv: ColorFormats.HSV, i: number, isLight: boolean) => {
    let hue;
    if (hsv.h >= 60 && hsv.h <= 240) {
      hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
    } else {
      hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
    }

    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }

    return Math.round(hue);
  };

  const getSaturation = (
    hsv: ColorFormats.HSV,
    i: number,
    isLight: boolean
  ) => {
    let saturation;
    if (isLight) {
      saturation = hsv.s - saturationStep * i;
    } else if (i === darkColorCount) {
      saturation = hsv.s + saturationStep;
    } else {
      saturation = hsv.s + saturationStep2 * i;
    }

    if (saturation > 1) {
      saturation = 1;
    }

    if (isLight && i === lightColorCount && saturation > 0.1) {
      saturation = 0.1;
    }

    if (saturation < 0.06) {
      saturation = 0.06;
    }

    return Number(saturation.toFixed(2));
  };

  const getValue = (hsv: ColorFormats.HSV, i: number, isLight: boolean) => {
    let value;
    if (isLight) {
      value = hsv.v + brightnessStep1 * i;
    } else {
      value = hsv.v - brightnessStep2 * i;
    }

    if (value > 1) {
      value = 1;
    }

    return Number(value.toFixed(2));
  };

  return function colorPalette(color: string, index: number = 6) {
    const isLight = index <= 6;
    const hsv = tinycolor(color).toHsv();
    const i = isLight
      ? lightColorCount + 1 - index
      : index - lightColorCount - 1;
    return tinycolor({
      h: getHue(hsv, i, isLight),
      s: getSaturation(hsv, i, isLight),
      v: getValue(hsv, i, isLight),
    }).toHexString();
  };
})();

export function mixinDarkTheme(
  code: string,
  themeSelector: string = "core-components-theme",
  global = false
): string {
  return `html[${themeSelector}="dark"] ${global ? "" : "&"} {
${code
  .split("\n")
  .map((a) => `  ${a.trim()}`)
  .join("\n")}
}
@media (prefers-color-scheme: dark) {
  html:not([${themeSelector}="light"]) ${global ? "" : "&"} {
${code
  .split("\n")
  .map((a) => `    ${a.trim()}`)
  .join("\n")}
  }
}`;
}

export function generateTheme(
  primaryColor: string,
  secondaryColor: string,
  themeSelector = "core-components-theme",
  isBuildStep = false
): string {
  const primaryColors = Array.from({ length: 10 }).map((_, i) =>
    colorPalette(primaryColor, i + 1)
  );
  const primaryColorsCss = primaryColors
    .map((a, i) => `--color-primary-${i + 1}: ${a};`)
    .join("\n  ");
  const dangerColors = Array.from({ length: 10 }).map((_, i) =>
    colorPalette("#FF392B", i + 1)
  );
  const dangerColorsCss = dangerColors
    .map((a, i) => `--color-danger-${i + 1}: ${a};`)
    .join("\n  ");
  const successColors = Array.from({ length: 10 }).map((_, i) =>
    colorPalette("#18B15C", i + 1)
  );
  const successColorsCss = successColors
    .map((a, i) => `--color-success-${i + 1}: ${a};`)
    .join("\n  ");
  const basicColors = [
    "#F8F8F8",
    "#F2F2F2",
    "#f5f5f5",
    "#EDEDED",
    "#DADADA",
    "#858585",
    "#757575",
    "#666666",
    "#454545",
    "#222222",
  ];
  const basicColorsCss = basicColors
    .map((a, i) => `--color-${i + 1}: ${a};`)
    .join("\n  ");
  const themedBasicColorsLight = basicColors
    .map((_, a) => `--color-basic-${a + 1}: var(--color-${a + 1});`)
    .join("\n");
  const themedBasicColorsDark = basicColors
    .map(
      (_, a) =>
        `--color-basic-${a + 1}: var(--color-${basicColors.length - a});`
    )
    .join("\n");
  const bothThemes = `
  ${primaryColorsCss}
  ${dangerColorsCss}
  ${basicColorsCss}
  ${successColorsCss}
  --color-primary-6-1: ${rgba(primaryColors[5], 0.1)};
  --color-danger-6-1: ${rgba(dangerColors[5], 0.1)};
  --text-color-light: rgba(0, 0, 0, 0.87);
  --text-color-dark: #fff;
`
    .split("\n")
    .map((a) => a.trim())
    .filter(Boolean)
    .map((a) => `  ${a}`)
    .join("\n");
  const lightTheme = `${themedBasicColorsLight}
  --text-color: var(--text-color-light);
  --text-color-invert: var(--text-color-dark);
  --layout-background-color: #fff;
  --color-toggle-background: rgba(0, 0, 0, 0.3);
  --basic-border-color: #ccc;
  --card-primary: var(--color-primary-3);
  --card-danger: var(--color-danger-3);`
    .split("\n")
    .map((a) => a.trim())
    .filter(Boolean)
    .map((a) => `  ${a}`)
    .join("\n");
  const darkTheme = `${themedBasicColorsDark}
  --text-color: var(--text-color-dark);
  --text-color-invert: var(--text-color-light);
  --layout-background-color: #121212;
  --color-toggle-background: rgba(255, 255, 255, 0.3);
  --basic-border-color: #444;
  --card-primary: var(--color-primary-5);
  --card-danger: var(--color-danger-5);`;
  const css = `
:root {
${bothThemes}
}
html:not([${themeSelector}="dark"]) {
${lightTheme}
}

${mixinDarkTheme(darkTheme, themeSelector, true)}
  `;
  if (isBuildStep) {
    return `${bothThemes}\n${lightTheme}`;
  }

  return css;
}

if (require.main === module) {
  console.log(generateTheme("#2148d9", "#fff"));
}
