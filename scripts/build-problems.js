const fs = require("fs");
const path = require("path");

// Directory containing the problem JSON files
const PROBLEMS_DIR = path.join(__dirname, "../public/problems");

// Output file path
const OUTPUT_FILE = path.join(__dirname, "../src/problems.js");

// Read all JSON files from the problems directory
function buildProblems() {
  try {
    // Create problems directory if it doesn't exist
    if (!fs.existsSync(PROBLEMS_DIR)) {
      fs.mkdirSync(PROBLEMS_DIR, { recursive: true });
    }

    // Get all JSON files
    const files = fs
      .readdirSync(PROBLEMS_DIR)
      .filter((file) => file.endsWith(".json"));

    // Read and parse each JSON file
    const problemSets = files.map((file) => {
      const content = fs.readFileSync(path.join(PROBLEMS_DIR, file), "utf8");
      const data = JSON.parse(content);
      const name = path
        .basename(file, ".json")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return {
        label: name,
        file: file,
        problems: data.problems,
      };
    });

    // Generate the JavaScript file content
    const jsContent = `// This file is auto-generated. Do not edit manually.
// Generated on: ${new Date().toISOString()}

export const PROBLEM_SETS = ${JSON.stringify(problemSets, null, 2)};
`;

    // Write the output file
    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log("✅ Successfully generated problems.js");
    console.log(
      "📦 Problem sets:",
      problemSets.map((set) => set.label).join(", ")
    );
  } catch (error) {
    console.error("❌ Error building problems:", error);
    process.exit(1);
  }
}

buildProblems();
