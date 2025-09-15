import {db} from "../../src/server/db"
import departments from "../../src/lib/seed_data/departments.json"


async function SeedDepartments() {
  for (const department of departments) {
    await db.department.upsert({
      where: { id: department.id },
      update: {
        name: department.name,
        description: department.description,
      },
      create: department,
    });
  }
}

export default SeedDepartments
