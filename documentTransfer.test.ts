
/* 
This example uses Jest as the testing framework and mocks the Axios library to simulate API requests and responses.
It includes test cases to cover the authentication process, retrieving API-enabled projects, uploading documents,
transferring documents, verifying document existence, and handling errors.
 */



import axios from 'axios';
import { authenticate, getApiEnabledProjects, uploadDocuments, transferDocuments, verifyDocumentsExistence } from './documentTransfer';

jest.mock('axios');

describe('Document Transfer Program', () => {
  const mockToken = 'mockToken';
  const mockProjects = ['Project1', 'Project2'];
  const mockDocuments = [
    { documentNumber: 'Document-1', version: 1 },
    { documentNumber: 'Document-2', version: 1 },
    { documentNumber: 'Document-3', version: 1 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate successfully', async () => {
    const mockAuthResponse = { data: { token: mockToken } };
    axios.post.mockResolvedValueOnce(mockAuthResponse);

    const token = await authenticate();

    expect(axios.post).toHaveBeenCalledWith(
      'https://ea1.aconex.com/api/auth/login',
      { username: 'poleary', password: 'Auth3nt1c' }
    );
    expect(token).toBe(mockToken);
  });

  it('should get API-enabled projects successfully', async () => {
    const mockProjectsResponse = { data: mockProjects };
    axios.get.mockResolvedValueOnce(mockProjectsResponse);

    const projects = await getApiEnabledProjects(mockToken);

    expect(axios.get).toHaveBeenCalledWith(
      'https://ea1.aconex.com/api/projects',
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
    expect(projects).toEqual(mockProjects);
  });

  it('should upload documents successfully', async () => {
    const mockUploadResponse = {};
    axios.post.mockResolvedValueOnce(mockUploadResponse);

    await uploadDocuments(mockToken, 'Project1', 3);

    expect(axios.post).toHaveBeenCalledTimes(3);
    expect(axios.post).toHaveBeenCalledWith(
      'https://ea1.aconex.com/api/projects/Project1/documents',
      expect.objectContaining({ documentNumber: expect.any(String), version: 1 }),
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });

  it('should transfer documents successfully', async () => {
    const mockTransferResponse = {};
    axios.post.mockResolvedValueOnce(mockTransferResponse);

    await transferDocuments(mockToken, 'Project1', 'Project2');

    expect(axios.get).toHaveBeenCalledWith(
      'https://ea1.aconex.com/api/projects/Project1/documents',
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
    expect(axios.post).toHaveBeenCalledTimes(mockDocuments.length);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/transfer'),
      expect.objectContaining({ targetProject: 'Project2' }),
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });

  it('should verify document existence successfully', async () => {
    const mockDocumentsResponse = { data: mockDocuments };
    axios.get.mockResolvedValueOnce(mockDocumentsResponse);

    const exists = await verifyDocumentsExistence(mockToken, 'Project2');

    expect(axios.get).toHaveBeenCalledWith(
      'https://ea1.aconex.com/api/projects/Project2/documents',
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
    expect(exists).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    axios.post.mockRejectedValueOnce(new Error('Authentication failed'));

    await expect(authenticate()).rejects.toThrow('Authentication failed');
  });
});
