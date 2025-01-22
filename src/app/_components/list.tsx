import { deleteFile } from "@/app/actions";
import { groupFilesByType } from "@/app/utils";
import fs from "fs/promises";
import Image from "next/image";
import {Card, CardHeader} from "@/components/ui/card";
import {buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import getFileUploadDate from "@/components/get-file-upload-date";

const List = async () => {
  let files: string[] = [];

  try {
    files = await fs.readdir("uploads");
  } catch (error) {
    console.error(error);
    await fs.mkdir("uploads", { recursive: true });
  }

  const groupedFiles = groupFilesByType(files);

  const handleDelete = async (fileName: string) => {
    "use server";
    await deleteFile(fileName);
  };

  return (
    <>
      {Object.entries(groupedFiles).map(([type, typeFiles]) => (
        <div key={type} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 capitalize text-[#f8f8f2]">
            {type} Files
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typeFiles.map((file) => (
              <Card
                key={file}
                className="p-4 rounded-lg"
              >
                <CardHeader className="flex flex-row items-center justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {file.substring(file.indexOf("-") + 1)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getFileUploadDate(parseInt(file.split("-")[0]))}
                    </p>
                  </div>
                  <form action={handleDelete.bind(null, file)}>
                    <button
                      type="submit"
                      className={`${buttonVariants({variant: "destructive"})}`}
                    >
                      Delete
                    </button>
                  </form>
                </CardHeader>

                {type === "image" && (
                  <div className="relative aspect-video rounded-md">
                    <Image
                      src={`/api/download/${file}`}
                      alt={file}
                      fill
                      className="rounded-md object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                {type === "video" && (
                  <video
                    className="w-full rounded-md"
                    controls
                    src={`/api/download/${file}`}
                  />
                )}
                {type === "audio" && (
                  <audio
                    className="w-full mt-3"
                    controls
                    src={`/api/download/${file}`}
                    preload="none"
                  />
                )}
                {(type === "document" || type === "other") && (
                  <div className="mt-2">
                    <Link
                      href={`/api/download/${file}`}
                      className="text-emerald-500 hover:text-emerald-400 text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download File
                    </Link>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}

      {files.length === 0 && (
        <Card className="text-center py-12 rounded-lg border">
          <p className="text-gray-500">No files uploaded yet</p>
        </Card>
      )}
    </>
  );
};

export { List };
