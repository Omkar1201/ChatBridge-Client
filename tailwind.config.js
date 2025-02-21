module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {              // custom theme name
          "primary": "#E1E1E1", // set primary color to red
          "secondary": "#00FF00",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          // Add more color definitions if needed
        },
      },
    ],
  },
}
