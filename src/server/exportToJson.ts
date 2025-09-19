import fs from "fs";
import path from "path";
import { getLecturers } from "../lib/actions/lecturers"; // wherever your function lives

async function exportLecturersToJson() {
  try {
    const lecturers = await getLecturers();

    // Define output file path
    const filePath = path.join(`${process.cwd()}/src/lib/chat/data`, "lecturers.json");

    // Write data to JSON file (pretty-printed with 2 spaces)
    fs.writeFileSync(filePath, JSON.stringify(lecturers, null, 2), "utf-8");

    console.log(`✅ Exported ${lecturers.length} lecturers to ${filePath}`);
  } catch (error) {
    console.error("❌ Failed to export lecturers:", error);
  }
}

// Run the export
exportLecturersToJson();
