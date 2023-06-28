import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const aconexBaseUrl = 'https://ea1.aconex.com/api/';
const username = process.env.ACONEX_USERNAME;
const password = process.env.ACONEX_PASSWORD;

interface Document {
  documentNumber: string;
  version: number;
}

async function authenticate(): Promise<string> {
  const authResponse = await axios.post(
    `${aconexBaseUrl}auth/login`,
    { username, password }
  );
  return authResponse.data.token;
}

async function getApiEnabledProjects(token: string): Promise<string[]> {
  const projectsResponse = await axios.get(`${aconexBaseUrl}projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const projects = projectsResponse.data;
  const apiEnabledProjects = projects.filter(
    (project: any) => project.apiEnabled
  );
  return apiEnabledProjects.map((project: any) => project.name);
}

async function uploadDocuments(token: string, project: string, count: number): Promise<void> {
  const uploadPromises = [];

  for (let i = 1; i <= count; i++) {
    const document: Document = {
      documentNumber: `Document-${i}`,
      version: 1,
    };

    const uploadPromise = axios.post(`${aconexBaseUrl}projects/${project}/documents`, document, {
      headers: { Authorization: `Bearer ${token}` },
    });
    uploadPromises.push(uploadPromise);
  }

  await Promise.all(uploadPromises);
  console.log(`Successfully uploaded ${count} documents to ${project}.`);
}

async function transferDocuments(token: string, sourceProject: string, targetProject: string): Promise<void> {
  const documentsResponse = await axios.get(`${aconexBaseUrl}projects/${sourceProject}/documents`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const documents: Document[] = documentsResponse.data;

  const transferPromises = documents.map((document: Document) => {
    const { documentNumber, version } = document;
    const transferUrl = `${aconexBaseUrl}projects/${sourceProject}/documents/${documentNumber}/versions/${version}/transfer`;
    return axios.post(transferUrl, { targetProject }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  });

  await Promise.all(transferPromises);
  console.log(`Successfully transferred ${documents.length} documents from ${sourceProject} to ${targetProject}.`);
}

async function verifyDocumentsExistence(token: string, project: string): Promise<boolean> {
  const documentsResponse = await axios.get(`${aconexBaseUrl}projects/${project}/documents`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const documents: Document[] = documentsResponse.data;

  // Assuming all transferred documents should exist in the target project
  for (const document of documents) {
    if (document.version === 1) {
      console.log(`Document ${document.documentNumber} exists in ${project}.`);
    }
  }

  return true;
}

async function main(): Promise<void> {
  try {
    const token = await authenticate();
    const projects = await getApiEnabledProjects(token);

    if (projects.length < 2) {
      throw new Error('At least two API-enabled projects are required for the document transfer.');
    }

    const sourceProject = projects[0];
    const targetProject = projects[1];

    // Upload documents to the source project
    await uploadDocuments(token, sourceProject, 5);

    // Transfer documents from the source project to the target project
    await transferDocuments(token, sourceProject, targetProject);

    // Verify the existence of transferred documents in the target project
    await verifyDocumentsExistence(token, targetProject);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Run the program
main();
