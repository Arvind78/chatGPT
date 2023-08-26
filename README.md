# ChatGPT Clone Application

This repository contains a ChatGPT Clone application built using React.js, Node.js, and MongoDB. The application aims to provide a simple demonstration of a chat interface where users can interact with a GPT-3.5 powered chatbot.

## Features

- Real-time chat interface with the ChatGPT-powered bot.
- Messages are stored and retrieved from a MongoDB database.
- User-friendly and responsive design for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Model**: OpenAI's GPT-3.5

## Getting Started

Follow the steps below to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your system.
- MongoDB should be installed and running.

### Installation

1. Clone the repository:

   ```bash
  frontend git clone https://github.com/Arvind78/chatGPT.git
  backend git clone  https://github.com/Arvind78/chatgptserver.git
   ```

2. Install frontend dependencies:

   ```bash
   cd chatGPT
   npm install
     ```

3. Configure the MongoDB connection:
   
   In the `backend` folder, create a `.env` file and add your MongoDB connection URI:

   ```env
   MONGODB_URI=your_mongodb_connection_uri
   ```

4. Obtain your GPT-3.5 API key:

   Visit the OpenAI website and generate an API key for the GPT-3.5 model.

5. Configure the GPT-3.5 API key:

   In the `backend` folder, open the `gptConfig.js` file and replace `'YOUR_API_KEY'` with your actual GPT-3.5 API key.

### Running the Application

 
1. Start the backend server:

   ```bash
   cd backend
   nodemon start
   ```

2. Start the frontend development server:

   ```bash
   cd chatgpt
   npm run dev
   ```

3. Access the application in your web browser:

 Open your browser and navigate to `http://localhost:5173` to see the ChatGPT Clone application in action.

## Usage

- Type your message in the input field at the bottom and press Enter to send.
- The GPT-3.5 powered bot will respond to your messages.
- Conversations will be saved in the MongoDB database and can be retrieved when you refresh the page.

## Future Improvements

This project serves as a basic example of how to create a chat application using React.js, Node.js, and MongoDB. Here are some ideas for future improvements:

- Implement user authentication and allow multiple users to have separate conversations.
- Add support for more advanced interactions with the GPT-3.5 model, like providing specific instructions.
- Enhance the frontend design and user experience.
- Implement features like message editing and deletion.

## Contributing

Contributions to this project are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.

