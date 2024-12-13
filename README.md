# Invoice Management Console (INMACO)

The Invoice Management Console is a React web-application designed to provide a streamlined and secure way for administrators to manage invoices. It includes a variety of features and follows best practices for both usability and security.
Backend URL: "https://inmaco-backend.onrender.com", Frontend URL: https://inmaco.netlify.app/
## Features

### 1. **Admin Authentication**
- **Encrypted Passwords**: Admin credentials are securely stored in MongoDB Atlas using encryption.
- **No Third-Party Services**: The authentication system is self-contained, ensuring no reliance on external services.
- **Time Synchronization Check**: The system validates the time difference between the client and server, disallowing login if the mismatch exceeds 5 minutes.

### 2. **Dashboard**
- **Intuitive Data Display**: View invoice details such as:
  - Invoice Number
  - Invoice Date
  - Invoice Amount
- The dashboard is designed for quick insights and an efficient viewing experience.

### 3. **Invoice Management**
- **CRUD Operations**:
  - Create new invoices with relevant details.
  - Update existing invoices with the latest information.
  - Delete invoices that are no longer required.
- **Filtering and Searching**:
  - Filter invoices based on specific criteria like date range or by financial year.
  - Search functionality to locate invoices by their invoice number.

## Build Instructions

### Prerequisites
Ensure that the following tools are installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### Steps to Build and Run the Project

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   Using npm:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory of the project.
   - Add the following variables:
     ```env
     REACT_APP_API_BASE_URL=<backend-api-url>
     ```

4. **Run the Application**:
   Using npm:
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

5. **Build for Production**:
   To create an optimized production build:
   ```bash
   npm run build
   ```
   The build output will be in the `build/` directory.

6. **Testing**:
   If testing scripts are available, run:
   ```bash
   npm test
   ```

### Notes
- Ensure that the backend service is running and accessible at the `REACT_APP_API_BASE_URL` specified in the `.env` file.
- MongoDB Atlas must be configured to store encrypted admin credentials and invoice data.

## Contributions
I welcome contributions to enhance the functionality or fix issues. Please fork the repository, create a branch for your changes, and submit a pull request.

---
Thank you for using INMACO!

