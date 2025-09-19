import { initCoursePinecone } from "./course.mjs";
import { initLecturerPinecone } from "./lecturer.mjs";

(async() => {
    await initCoursePinecone()
    await initLecturerPinecone()
    console.log("✅ Data ingestion completed.");
}
)()