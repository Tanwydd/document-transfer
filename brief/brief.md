# Transfer documents between 2 Aconex projects

## Aconex

Aconex is an online collaboration platform for managing construction projects.
One outstanding feature is its support for [Documents](https://help.aconex.com/en/aconex/our-main-application/using-aconex/working-with-documents).
You can familiarize yourself with this feature in its user interface by [logging in](https://ea1.aconex.com/Logon) to its developer instance using the following credentials.

Login Name: poleary\
Password: Auth3nt1c

## The problem

You are to implement a program that would transfer documents between 2 projects of the organization **Majestic Builders** by interacting with its [web-apis](https://help.aconex.com/DisplayContent/1481789091507-documents).
Along with integration tests that prove successful transfers.

## The test

An integration test that:
1. Uploads 2 - 10 documents to one project,
2. Transfers those uploaded documents to a second project,
3. Then asserts those documents correctly exist in the second project.

## Considerations

### Not all projects are api enabled.

You will have to explore to find projects that support api access.
Here's a short list of some projects that are known to be enabled
- Breeze Tower Phase3
- Hotel VIP Resort

### Documents may have multiple versions

Make sure your solution supports multi-version documents.

### Document fields are configurable per project

Failing to comply with this [configuration](https://help.aconex.com/en/DisplayContent/checking-document-fields-are-correct) would result in failed uploads.

For the purpose of this quiz, it is acceptable that you edit the project's configurations to simplify the constraints.
Beware that other users also have access to your chosen projects.

### Document Numbers must be unique

Attempting to upload a document with a document number the same as an existing document would fail.
For the purpose of this quiz, generating unique strings for the document number value will suffice.

## Guidelines

### Programming language

The program is to be implemented in Typescript.

### Runtime

The program is to be run with Node.js v18.x.

### Source code

Place all source code under a directory `solution/` in this directory.

### External libraries

You are free to use any external libraries of choice.

### Package manager

You are free to use any package manager of choice.

### Documentation

Write a README.md in `solution/` giving minimal instructions on how to successfully build and run the implemented program and its tests.
List any build-time dependencies that are needed, i.e. package managers.
