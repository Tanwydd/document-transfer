# Document Transfer Program

This program facilitates the transfer of documents between two projects in Aconex, an online collaboration platform for managing construction projects. The program is implemented in TypeScript and can be run with Node.js v18.x.

## Prerequisites

Before running the program, ensure that you have the following installed:

- Node.js v18.x
- npm (Node Package Manager)

## Installation

1. Clone the repository or download the project files.
2. Open a terminal and navigate to the project directory (`document-transfer`).
3. Install the dependencies by running the following command:

    ```
    npm install

    ```

## Configuration

To configure the program, you need to provide your Aconex login credentials in the `.env` file. Follow these steps:

1. Rename the `.env.example` file to `.env`.
2. Open the `.env` file in a text editor.
3. Replace the values of `ACONEX_USERNAME` and `ACONEX_PASSWORD` with your Aconex login credentials.

## Usage

To transfer documents between projects, follow these steps:

1. Open a terminal and navigate to the project directory (`document-transfer`).
2. Run the program using the following command:

    ```
    npm run transfer-documents

    ```

The program will authenticate with Aconex using the provided credentials, list the API-enabled projects in Majestic Builders, and prompt you to select the source and target projects for document transfer. After the transfer is complete, the program will verify the existence of the transferred documents in the target project.

## Running Tests

Integration tests are included to verify the functionality of the document transfer program. To run the tests, follow these steps:

1. Open a terminal and navigate to the project directory (`document-transfer`).
2. Run the tests using the following command:

    ```
    npm test

    ```

The test results will be displayed in the terminal, indicating whether the document transfer process passed or failed.

## Dependencies

The following dependencies are used in this project:

- [axios](https://www.npmjs.com/package/axios): Used for making HTTP requests to interact with the Aconex web APIs.
- [dotenv](https://www.npmjs.com/package/dotenv): Used to load environment variables from the `.env` file.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to explore the source code in the `documentTransfer.ts` and `documentTransfer.test.ts` files for more details on the implementation.

Please ensure that you have proper access permissions and comply with any security guidelines while using the program with your Aconex account.

If you have any questions or issues, please don't hesitate to reach out.

Happy document transferring!
