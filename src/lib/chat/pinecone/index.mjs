// import { initCoursePinecone } from "./course.mjs";
import { initLecturerPinecone } from "./lecturer.mjs";

(async() => {
    await initLecturerPinecone()
    // await initCoursePinecone()
    console.log("✅ Data ingestion completed.");
}
)()