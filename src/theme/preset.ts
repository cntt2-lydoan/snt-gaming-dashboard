// default theme preset
export const preset = {
    colors: {
      text: '#000',
      background: '#fff',
      primary: '#07c',
      secondary: '#30c',
      muted: '#f6f6f9',
      gray: '#dddddf',
      highlight: 'hsla(205, 100%, 40%, 0.125)',
    },
    fonts: {
      body: 'system-ui, sans-serif',
      heading: 'inherit',
      monospace: 'Menlo, monospace',
    },
    fontSizes: [
      12, 14, 16, 20, 24, 32, 48, 64, 96
    ],
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
      avatar: 48,
    },
    radii: {
      default: 4,
      circle: 99999,
    },
    shadows: {
      card: '0 0 4px rgba(0, 0, 0, .125)',
    },
    styles: {
      root: {
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      },
    },
}