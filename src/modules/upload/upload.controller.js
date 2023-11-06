import { asyncHandler } from "../../utils/asyncHandling.js"
import uploadFile from "../../utils/uploadFile.js"
import { v4 as uuidv4 } from "uuid";

export const getBlobUrl = asyncHandler(async (req, res, next) => {
    const {fileName} = req.body
    const connectionString =process.env.connectionString;
    const containerName = 'test-create-container';
    const blobName =`${fileName}/${uuidv4()}`
    const {sasToken , blobUrlWithSas}=uploadFile(blobName,containerName)
    res.json({sasToken:sasToken , blobUrlWithSas:blobUrlWithSas})

})

