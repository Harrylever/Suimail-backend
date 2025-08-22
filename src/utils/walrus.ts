import axios from 'axios';
import { InternalServerError } from './AppError';

interface BlobObject {
  blobId: string;
}

interface WalrusResponse {
  newlyCreated?: {
    blobObject: BlobObject;
  };
  alreadyCertified?: BlobObject;
}

const sendToWalrus = async (
  payload: string | Buffer | Buffer<ArrayBufferLike>,
): Promise<WalrusResponse | null> => {
  try {
    const uploadToWalrus = await axios.put(
      'https://walrus.testnet.publisher.stakepool.dev.br/v1/blobs?epochs=50',
      {
        message: payload,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return uploadToWalrus.data;
  } catch (error) {
    throw new InternalServerError('Failed to send to Walrus', {
      error,
    });
  }
};

const getFromWalrus = async (blobId: string): Promise<any> => {
  try {
    const fetchFromWalrus = await axios.get(
      `https://wal-aggregator-testnet.staketab.org/v1/blobs/${blobId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return fetchFromWalrus.data;
  } catch (error) {
    throw new InternalServerError('Failed to get from Walrus', {
      error,
    });
  }
};

export { sendToWalrus, getFromWalrus };
