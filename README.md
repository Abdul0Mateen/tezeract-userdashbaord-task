# Project Title

User Managment Dashboard

## Getting Started

These instructions will help you set up and run the project on your local machine. Make sure to follow each step carefully.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- Git installed on your machine
- A Cloudinary account

### Installing

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Abdul0Mateen/tezeract-userdashbaord-task.git
    ```

2. Navigate to the project directory:

    ```bash
    cd tezeract-userdashbaord-task
    ```

3. Install the project dependencies:

    ```bash
    npm install
    ```

4. Create a copy of the `.env.example` file and name it `.env`. Update the file with your Cloudinary credentials:

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and add your Cloudinary `CLOUD_NAME` and `UPLOAD_PRESET`:

    ```env
    VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
    VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
    ```

### Running the Application

Once you have completed the installation, you can run the application using the following command:

```bash
npm run dev
