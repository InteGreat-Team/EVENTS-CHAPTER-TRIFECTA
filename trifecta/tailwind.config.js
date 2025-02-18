/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      gray: "#f6f5f7",
      "gray-light": "rgb(156 163 175)",
      "dark-gray": "#374151",
      red: "#fecaca",
      "red-dark": "rgb(220 38 38)",
      "red-darker": "rgb(183, 28, 28)",
      black: "#000000",
      purple: "#6239c5",
      green: "#3D7200",
      orange: "rgb(234 88 12)",
      teal: "rgb(20 184 166)",
      "dark-blue": "#1F2544",
      "brand-purple": "#7077A1",
      "brand-blue": "#1F8FF9",
      "purple-light": "#6962AD",
      "brand-gray": "#374151",
      "blue-save": "#1434A4",
      yellow: "#eab308",
    },
    backgroundImage: {
      gradient: "linear-gradient(92deg, #F2B23C -16.2%, #1F8FF9 114.08%)",
      "gradient-text": "linear-gradient(92deg, #F2B23C 35.2%, #1F8FF9 70.08%)",
      "gradient-overlay":
        "linear-gradient(92deg, rgba(242,178,60,0.8) -16.2%, rgba(31,143,249,0.8) 114.08%)",
      "gradient-color": "linear-gradient(135deg, #690D65, #0B61B0)",
      login: "url('./assets/login_img.jpeg')",
    },
    backgroundClip: {
      text: "text",
    },
    textColor: {
      transparent: "transparent",
      gray: "#f6f5f7",
      "dark-gray": "#D3D3D3",
      black: "#121214",
      white: "#ECECEC",
      red: "#D9422D",
      "red-dark": "rgb(220 38 38)",
      blue: "#2482ff",
      green: "#3D7200",
      yellow: "#F2B23C",
      orange: "#FFA500",
    },

    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
    require("tailwind-scrollbar"),
  ],
};
