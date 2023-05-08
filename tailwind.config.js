module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primaryBase: "#AADF9F",
        subText: "#5C5C77",
        secondaryLight: "#DBD7FD",
        secondaryLightHover: '#C2BBFC',
        secondaryBase: "#7B66FA",
        secondaryBaseHover: "#8C7AFB",
        darkBackgroundColor: '#3C3C3C',
        draculaBackground: '#282a36',
        draculaCurrentLine: '#44475a',
        draculaForeground: '#f8f8f2',
        draculaComment: '#6272a4',
        draculaCyan: '#8be9fd',
        draculaGreen: '#50fa7b',
        draculaOrange: '#ffb86c',
        draculaPink: '#ff79c6',
        draculaPurple: '#bd93f9',
        draculaRed: '#ff5555',
        draculaYellow: '#f1fa8c',
      },
      textColor: {
        primaryBase: "#AADF9F",
        subText: "#5C5C77",
        secondaryLight: "#DBD7FD",
        secondaryLightHover: '#C2BBFC',
        secondaryBase: "#7B66FA",
        secondaryBaseHover: "#8C7AFB",
        darkBackgroundColor: '#3C3C3C',
        draculaForeground: '#f8f8f2',
        draculaComment: '#6272a4',
        draculaCyan: '#8be9fd',
        draculaGreen: '#50fa7b',
        draculaOrange: '#ffb86c',
        draculaPink: '#ff79c6',
        draculaPurple: '#bd93f9',
        draculaRed: '#ff5555',
        draculaYellow: '#f1fa8c',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
