import { BlobServiceClient } from '@azure/storage-blob'
import { logger } from '../utils/Logger.js'
const blobStorage = BlobServiceClient.fromConnectionString(process.env.AZURE_BLOB_CONNECTION)

class BlobsService {
  async create(containerName, file) {
    const container = blobStorage.getContainerClient(containerName)
    const blockBlob = container.getBlockBlobClient(file.name)
    logger.log(file)
    const response = await blockBlob.upload(file.data, file.data.length)
    logger.log(response)
    return blockBlob.url
  }
}

export const blobsService = new BlobsService()
