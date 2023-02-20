const CryptoJS = require("crypto-js");

// Generate a new encryption key
const key = "83b36a0b93a96240c7b9f55f468df96f"; // 16 bytes key
const iv = "ce7f5fe1733832b1edaffe11f4863e82"; // 16 bytes iv

// Sample JSON object to encrypt
const json_data = [
  {
    operatingSystemName: "Windows",
    operatingSystemVersion: "10",
    browserName: "Chrome",
    browserVersion: "110.0.0.0",
    titleOfThePage:
      "Customer Support Request and Bug Capture Platform - Redpen",
    pageURL: "https://www.redpen.ai/",
    tabWidth: 1049,
    tabHeight: 929,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    screenWidth: 1920,
    screenHeight: 1080,
    logs: [],
    customData: {
      client: "website",
      "rp:labels": ["RedpenMarketingSiteFeedback"],
    },
    summary: "test",
    description:
      "\n* *dhaval.vala@ajmerainfotech.com* reported this issue from [Customer Support Request and Bug Capture Platform - Redpen|https://www.redpen.ai].\n\n ",
    newAttachments: ["97dc30c9-f3ad-401f-bf8c-09b08023dc76"],
    reporterEmailAddress: "dhaval.vala@ajmerainfotech.com",
  },
];

// Function to encrypt string values in a JSON object recursively
function encrypt_json(json_data) {
  for (let [key, value] of Object.entries(json_data)) {
    if (typeof value === "string") {
      const ciphertext = CryptoJS.AES.encrypt(value, key, { iv });
      json_data[key] = ciphertext.toString();
    } else if (typeof value === "object" && value !== null) {
      encrypt_json(value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "string") {
          const ciphertext = CryptoJS.AES.encrypt(item, key, { iv });
          value[index] = ciphertext.toString();
        } else if (typeof item === "object" && item !== null) {
          // If the item is an object, call the function recursively
          encrypt_json(item);
        }
      });
    }
  }
}

function decrypt_json(json_data) {
  for (let [key, value] of Object.entries(json_data)) {
    if (typeof value === "string") {
      const bytes = CryptoJS.AES.decrypt(value, key, { iv });
      json_data[key] = bytes.toString(CryptoJS.enc.Utf8);
    } else if (typeof value === "object" && value !== null) {
      decrypt_json(value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "string") {
          const bytes = CryptoJS.AES.decrypt(item, key, { iv });
          value[index] = bytes.toString(CryptoJS.enc.Utf8);
        } else if (typeof item === "object" && item !== null) {
          // If the item is an object, call the function recursively
          decrypt_json(item);
        }
      });
    }
  }
}
function printobject(json_data) {
  for (let [key, value] of Object.entries(json_data)) {
    if (typeof value === "string" || typeof value === "boolean") {
      console.log(key, value);
    } else if (typeof value === "object" && value !== null) {
      printobject(value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "string") {
          console.log(key, value);
        } else if (typeof item === "object" && item !== null) {
          // If the item is an object, call the function recursively
          printobject(item);
        }
      });
    }
  }
}

// Encrypt the JSON object recursively
encrypt_json(json_data);

// Output the encrypted JSON object
const encrypted_json = JSON.stringify(json_data);
console.log(encrypted_json);
decrypt_json(json_data);
console.log("===================================================");
printobject(json_data);
console.log("===================================================");
// Output the encryption key and IV
console.log(key.toString(CryptoJS.enc.Hex));
console.log(iv.toString(CryptoJS.enc.Hex));
