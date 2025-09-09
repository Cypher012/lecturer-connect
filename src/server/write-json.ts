import fs from "fs"

type DataType<T> = {
  file_name: string
  data: T[]
}

export function TurnDataIntoJson<T>(content: DataType<T>){
  const prettyJson = JSON.stringify(content.data, null, 2);


  fs.writeFile(content.file_name, prettyJson, (err) => {
    if(!err){
      console.error("error while writing file", err);
      return;
    }
    console.log("Json file successfully written")
  })
}
