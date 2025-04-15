# PetFolio-A-Comprehensive-Pet-Management-Mobile-Application

## 🐾 Pet Management Application

A cross-platform mobile application to manage pets' data using **React Native (Expo)** for the frontend and **Spring Boot + MySQL** for the backend.

---

## 📱 Features

- Add, update, and delete pet information
- View pet profiles
- Track pet vaccinations and medical records
- Manage pet owners
- Backend RESTful API with secure authentication

---

## 🛠️ Tech Stack

### Frontend
- React Native (Expo)
- Axios
- React Navigation
- AsyncStorage

### Backend
- Spring Boot
- Spring Security (JWT Auth)
- MySQL
- JPA (Hibernate)

---

## 🔧 Installation

### Frontend Setup (React Native Expo)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pet-management-app.git
   cd pet-management-app/frontend
2. Install dependencies
   ```bash
   npm install
3. Start the application
   ```bash
   npx expo start

### Backend Setup (Springboot with Mysql)

1. Navigate to the backend folder
   ```bash
   cd ../backend
2. Configure the application.properties file
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/pet_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   jwt.secret=yourSecretKey

### Project Structure

```bash
pet-management-app/
├── backend/              # Spring Boot backend
├── frontend/             # React Native frontend
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   └── App.js

```
### 🙋‍♂️ Author
Disitha Ranasinghe @Disitha395ra

