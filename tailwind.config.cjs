module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        card: "1rem",
      },
      spacing: {
        sidebar: "188px",
        "gamify-hero-top": "60px",
        "gamify-btn-pad": "9px",
      },
      fontSize: {
        "gamify-hero-title": ["28px", { lineHeight: "140%" }],
        "gamify-hero-lead": ["16px", { lineHeight: "140%" }],
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        gamify: {
          "card-border": "#F0E8F4",
          heading: "#4A235A",
          accent: "#C530C5",
          "icon-badge": "#FBCFFB",
        },
        brand: {
          "purple-bg": "#F5F0FF",
          border: "#E9E4F5",
          content: "#FDF4FF",
        },
      },
      boxShadow: {
        card: "0 1px 4px rgba(139,92,246,0.08)",
        btn: "0 4px 20px rgba(139,92,246,0.35)",
        modal: "0 24px 64px rgba(139,92,246,0.2)",
      },
    },
  },
  plugins: [],
};
