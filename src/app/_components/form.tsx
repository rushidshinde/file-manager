"use client";
import { upload } from "@/app/actions";
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/app/constants";
import { formatFileSize } from "@/app/utils";
import { useState } from "react";
import {buttonVariants} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent} from "@/components/ui/card";

const Form = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUpload = async (formData: FormData) => {
    const result = await upload(formData);
    if (!result.success) {
      setErrorMessage(result.message);
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className={'p-5'}>
        <form action={handleUpload}>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-500 rounded-lg p-6">
              <Input
                  name="file"
                  type="file"
                  accept={Object.keys(ALLOWED_TYPES).join(",")}
                  className={'file:p-1 file:px-5 file:rounded-md file:border-0 border-0 outline-0'}
              />
              <p className="mt-2 text-gray-500">
                Max file size: {formatFileSize(MAX_FILE_SIZE)}
              </p>
            </div>
            {errorMessage && <p className="text-[#ff5555]">{errorMessage}</p>}
            <button
              type="submit"
              className={`${buttonVariants({variant: "default"})} w-full`}
            >
              Upload File
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { Form };
