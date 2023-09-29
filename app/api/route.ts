import path from "path";
import { existsSync } from "fs";
import fs from "fs/promises";

export const GET = (req: Request) => {
  return Response.json({ type: "GET" });
};

export async function POST(req: Request) {
  const formData = await req.formData();
  console.log(formData);

  const fileArr = formData.getAll("img");

  if (!fileArr) {
    return Response.json({}, { status: 400 });
  }

  const fileSavePromiseArr = fileArr.map(async (f) => {
    const file = f as File;
    // console.log(`File name: ${file.name}`);
    // console.log(`Content-Length: ${file.size}`);

    const destinationDirPath = path.join(process.cwd(), "public/upload");
    // console.log(destinationDirPath);

    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath)) {
      fs.mkdir(destinationDirPath, { recursive: true });
    }
    await fs.writeFile(
      path.join(destinationDirPath, file.name),
      Buffer.from(fileArrayBuffer),
    );
  });

  // @note: send response according to this
  const promiseSetttleStatus = await Promise.allSettled(fileSavePromiseArr);

  return Response.json({ status: "OK" });
}
