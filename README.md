````markdown
# Softoo Assessment API

This is the API for the Softoo Assessment project. It provides endpoints to manage and retrieve stock data.

## Installation

1. Clone the repository to your local machine.
2. Install the dependencies using npm or yarn:

   ```bash
   yarn install

   OR

   npm install
   ```
````

## Usage

1. Make sure you have Node.js and npm installed.
2. Run the application:

   ```bash
   yarn start

   OR

   npm run start
   ```

3. The application will be available at `http://localhost:3000`.

## Endpoints

### List Stocks

- **URL**: `/`
- **Method**: GET
- **Description**: Retrieve a list of stocks and quantities.
- **Response**:
  ```json
  [
    {
      "sku": "string",
      "qty": number
    },
    // ...
  ]
  ```

### Get Stock Data

- **URL**: `/:sku`
- **Method**: GET
- **Description**: Retrieve stock data for a specific SKU.
- **Parameters**:
  - `sku` (String, required): SKU of the product.
- **Response**:
  ```json
  {
    "sku": "string",
    "qty": number
  }
  ```

## Swagger Documentation

You can access the Swagger documentation for the API by navigating to `http://localhost:3000/api`.

## Configuration

The configuration can be modified in the `main.ts` file, where you can customize various settings, such as the API title and description.

## Testing

To run tests, use the following command:

```bash
yarn test

OR

npm run test
```

## Environment Configuration

Create a `.env` file based on the `.env.example` file provided and set the desired configuration variables.

Example `.env` file content:

```env
PORT=3000
```

## Test Coverage

| File                         | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ---------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                    | 44.21     | 66.66      | 61.53     | 43.9      |
| src                          | 28.33     | 0          | 37.5      | 24.52     |
| app.controller.ts            | 90.9      | 100        | 66.66     | 88.88     | 16                  |
| app.module.ts                | 0         | 100        | 100       | 0         | 1-12                |
| app.service.ts               | 25.92     | 0          | 25        | 20.83     | 18-62               |
| main.ts                      | 0         | 0          | 0         | 0         | 1-31                |
| src/interfaces               | 100       | 100        | 100       | 100       |
| enums.ts                     | 100       | 100        | 100       | 100       |
| src/shared                   | 0         | 100        | 100       | 0         |
| shared.module.ts             | 0         | 100        | 100       | 0         | 1-8                 |
| src/shared/services          | 0         | 100        | 100       | 0         |
| services.module.ts           | 0         | 100        | 100       | 0         | 1-8                 |
| src/shared/services/helper   | 100       | 100        | 100       | 100       |
| helper.service.ts            | 100       | 100        | 100       | 100       |
| ---------------------------- | --------- | ---------- | --------- | --------- | ------------------- |

Test Suites: 2 passed, 2 total
Tests: 7 passed, 7 total
