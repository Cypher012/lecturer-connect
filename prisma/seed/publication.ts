import {db} from "../../src/server/db"
import publications from "../../src/lib/mockdata/publications.json"

async function seedPublications(){
  for (const pub of publications) {
  await db.publication.upsert({
    where: {
      title_year: {
        title: pub.title,
        year: pub.year,
      },
    },
    update: {
      doi: pub.doi,
      link: pub.link,
      lecturers: {
        connect: pub.lecturers.map((email: string) => ({ email })),
      },
    },
    create: {
      title: pub.title,
      type: pub.type,
      year: pub.year,
      doi: pub.doi,
      link: pub.link,
      lecturers: {
        connect: pub.lecturers.map((email: string) => ({ email })),
      },
    },
  });
}


}

export default seedPublications
