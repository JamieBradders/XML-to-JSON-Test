// Built using https://www.npmjs.com/package/xml2js

const util = require("util");
const { parseString, Builder } = require("xml2js");

const builder = new Builder();

async function run() {
  try {
    console.log("\n---\nConverting Weather XML to JSON...\n---\n");

    const res = await fetch(
      `http://api.weatherapi.com/v1/current.xml?key=eed6481d76664c718d593619240606&q=London&aqi=no`,
      {
        headers: {
          "Content-Type": "application/xml",
        },
      }
    );

    // Get XML data back
    const data = await res.text();

    // Parse XML data, converting to JSON
    parseString(
      data,
      { explicitArray: false, explicitRoot: false },
      (err, result) => {
        console.log(util.inspect(result, false, null));
      }
    );
  } catch (error) {
    console.error("error", error);
  }
}

function build() {
  console.log("\n---\nConverting JSON to XML...\n---\n");
  const obj = {
    PropertySearchRequest: {
      LoginDetails: {
        Login: "jamie",
        Password: "password",
      },
    },
  };

  const xml = builder.buildObject(obj);

  console.log("Here is our XML:", xml);
}

console.log("\n---\nStarting....\n---\n");

run();

build();
