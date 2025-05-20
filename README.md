# DialogueDock

**DialogueDock** is a web platform that enables users to share their thoughts, ideas, and engage in meaningful discussions through posts and comments. It solves the problem of fragmented conversations by providing a centralized, interactive space for thoughtful dialogue.

🔗 **Live Site:** [https://ephemeral-cactus-81fe5b.netlify.app/](https://ephemeral-cactus-81fe5b.netlify.app/)

---

## 🚀 Features

- **🔐 User Authentication**  
  Secure sign-up and login using JSON Web Tokens (JWT) to ensure privacy and data protection.

- **📝 Post Management**  
  Users can create, edit, and delete their posts using a rich text editor.

- **💬 Comments & Interaction**  
  Users can comment on posts, promoting active engagement within the community.

---

## 🛠️ Tech Stack

| Technology   | Description         |
|--------------|---------------------|
| **Frontend** | React.js            |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB             |
| **Auth**     | JSON Web Tokens (JWT) |

---

## 🧪 Demo Login Credentials

You can explore the application using the following test credentials:

- **Email:** j@j.com  
- **Password:** j@j.com

---

## 🧑‍💻 Local Setup Instructions

Follow these steps to run the project locally on your machine:

```bash
# 1. Clone the Repository
git clone https://github.com/username/DialogueDock.git

# 2. Navigate to the Project Directory
cd DialogueDock

# 3. Install Dependencies
npm install

# 4. Set Up Environment Variables
# Create a .env file in the root directory and add the following:
# (Replace the values with your own credentials)

echo "DB_URI=your_mongodb_connection_string" >> .env
echo "JWT_SECRET=your_jwt_secret" >> .env

# 5. Run the Development Server
npm start
