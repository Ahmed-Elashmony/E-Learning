import {BlobServiceClient,generateBlobSASQueryParameters,BlobSASPermissions,StorageSharedKeyCredential } from "@azure/storage-blob"

const uploadFile=(containerName,blobName)=>{
    const accountName = process.env.accountName;
    const accountKey =process.env.accountKey;
    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      sharedKeyCredential
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get the blob client
    const blobClient = containerClient.getBlobClient(blobName);

    // Get the Blob URL

    // Define the SAS options
    const sasOptions = {
      startsOn: new Date(),
      expiresOn: new Date(new Date().getTime() +86400),
      permissions: BlobSASPermissions.parse('racwd'),
    };

    try {
      // Generate the SAS token
      const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
      const blobUrlWithSas = blobClient.url + sasToken;
      return {sasToken:sasToken , blobUrlWithSas:blobUrlWithSas}
    } catch (error) {
      console.error('Error generating SAS token:' + error);
    }
}
export default uploadFile;