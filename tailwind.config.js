module.exports = {
  prefix: "",
  purge: {
    content: ["./src/**/*.{html,ts}"]
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        inherit: "inherit",
        transparent: "transparent",
        black: "black",
        white: "white",
        blue: {
          "00AFFF": "#00AFFF",
          "4882C7": "#4882C7",
          "39A0D3": "#39A0D3",
          E1F6FF: "#E1F6FF",
          EBF2F8: "#EBF2F8",
          "30BEFF": "#30BEFF",
          "3577A2": "#3577A2",
          ECFAFF: "#ECFAFF",
          "61BBE7": "#61BBE7",
          "000842": "#000842",
          "0C21C1": "0C21C1"
        },
        grey: {
          "999": "#999",
          CCC: "#CCC",
          "777": "#777",
          DDD: "#DDD",
          D3D3D3: "#D3D3D3",
          E2E7ED: "#E2E7ED",
          EAF0F6: "#EAF0F6",
          E5E8EC: "#E5E8EC",
          E7E7E7: "#E7E7E7",
          FAFAFA: "#FAFAFA",
          F5F5F5: "#F5F5F5",
          F3F3F3: "#F3F3F3",
          EEE: "#EEE",
          FCFCFD: "#FCFCFD",
          E6E6E6: "#E6E6E6",
          B7B7B7: "#B7B7B7"
        },
        black: {
          "555": "#555"
        },
        green: {
          "89CD7F": "#89CD7F",
          BFFEE7: "#BFFEE7"
        },
        red: {
          E57979: "#E57979",
          CE1818: "#CE1818",
          DC6565: "#DC6565"
        },
        yellow: {
          F9AC30: "#F9AC30"
        }
      },
      fontWeight: {
        "weight-300": "300",
        "weight-400": "400",
        "weight-500": "500",
        "weight-600": "600",
        "weight-700": "700",
        "weight-bold": "700"
      },
      fontSize: {
        "8": "8px",
        "10": "10px",
        "11": "11px",
        "12": "12px",
        "13": "13px",
        "14": "14px",
        "15": "15px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "24": "24px",
        "28": "28px",
        "30": "30px",
        "36": "36px"
      },
      lineHeight: {
        normal: "normal",
        "1": "1",
        "9": "9px",
        "16.8": "16.8px",
        "17": "17px",
        "19.2": "19.2px",
        "19.6": "19.6px",
        "20": "20px",
        "28": "28px"
      },
      borderWidth: {
        // TODO: Check with border-0 in bootstrap
        "0": "0px",
        "1": "1px",
        "2": "2px",
        "3": "3px",
        "4": "4px"
      },
      borderRadius: {
        none: "0",
        "4": "4px",
        "5": "5px",
        "6": "6px",
        "12": "12px",
        "15": "15px",
        "20": "20px",
        "1/2": "50%",
        full: "100%"
      },
      spacing: {
        "0": "0px",
        "0.5": "1px",
        "1": "1px",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "5": "5px",
        "6": "6px",
        "7": "7px",
        "8": "8px",
        "9": "9px",
        "10": "10px",
        "11": "11px",
        "12": "12px",
        "14": "14px",
        "15": "15px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "22": "22px",
        "24": "24px",
        "27": "27px",
        "28": "28px",
        "30": "30px",
        "32": "32px",
        "33": "33px",
        "36": "36px",
        "40": "40px",
        "44": "44px",
        "48": "48px",
        "52": "52px",
        "56": "56px",
        "60": "60px",
        "64": "64px",
        "67": "67px",
        "72": "72px",
        "75": "75px",
        "80": "80px",
        "88": "88px",
        "96": "96px",
        "100": "100px",
        "132": "132px",
        "149": "149px",
        "160": "160px"
      },
      margin: {
        "auto-0": "auto 0",
        "0-auto": "0 auto"
      },
      minWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%"
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "100": "100px",
        "170": "170px",
        "190": "190px",
        "200": "200px"
      },
      width: {
        auto: "auto",
        unset: "unset",
        "50%": "50%",
        "1/2": "50%",
        "3/4": "75%",
        "210": "210px",
        "180": "180px",
        "130": "130px"
      },
      height: {
        "340": "340px",
        "210": "210px",
        "130": "130px",
        "180": "180px"
      },
      zIndex: {
        "1": "1",
        "2": "2"
      },
      boxShadow: {
        "0_1_4_black-15%": "0px 1px 4px rgba(0, 0, 0, 0.15)",
        "0_0_0_1_ccc": "0px 0px 0px 1px #ccc"
      },
      gridTemplateColumns: {
        "1fr": "1fr",
        "1fr_auto": "1fr auto",
        "1/2_1/2": "50% 50%"
      },
      gridTemplateRows: {
        "1fr": "1fr",
        "100%": "100%"
      }
    },
    minHeight: {
      0: "0px",
      full: "100%",
      screen: "100vh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    },
    minWidth: {
      0: "0px",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    },
    opacity: {
      0: "0",
      5: "0.05",
      10: "0.1",
      20: "0.2",
      25: "0.25",
      30: "0.3",
      40: "0.4",
      50: "0.5",
      60: "0.6",
      70: "0.7",
      75: "0.75",
      80: "0.8",
      90: "0.9",
      95: "0.95",
      100: "1"
    },
    rotate: {
      0: "0deg",
      45: "45deg",
      90: "90deg",
      180: "180deg"
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
