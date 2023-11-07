import { asyncHandler } from "../../utils/asyncHandling.js"
import generateSASUrl from "../../utils/uploadFile.js"
import { v4 as uuidv4 } from "uuid";

export const getBlobUrl = asyncHandler(async (req, res, next) => {
    const {fileName,fileType} = req.body
    const containerName = 'upload';
    const blobName =`${fileName}_${uuidv4()}.${fileType}`
    const response =await generateSASUrl(process.env.accountName,process.env.accountKey,containerName,blobName,'racwd' , 30)
    res.json(response)

})

