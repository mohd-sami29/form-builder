# Form Builder

## Overview

The **Form Builder** is a web application that allows users to create, manage, and share custom forms easily. The project is built using **React (with Vite)** for the frontend and a **JSON Server** for storing form data. It also features **Redux Toolkit** for state management.

## Technologies Used
- **Frontend**: React, Redux Toolkit, React Router, Vite, Tailwind CSS
- **Backend** : JSON Server (using db.json as the data source)
- **State Management** : Redux Toolkit
- **Styling** : Tailwind CSS

## Features

- **Authentication (Admin Login Required)**
- **Customizable Fields (Text, Radio, Checkbox, etc.)**
- **Save Forms to JSON Server**
- **Allow Users to Submit Responses**
- **View Submitted Responses**
- **Fully Responsive UI (Mobile & Desktop)**

## Setup and Installation

### 1️⃣ Clone the repository:

```bash
git clone <repository_url> cd <project_folder>
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Start the JSON Server:

```bash
npx json-server --watch db.json --port 5000
```

### 4️⃣ Start the development server:

```bash
npm run dev
```

The application will be running at: `http://localhost:5173`

## Usage

- **Admin Login:** Access the form builder using admin credentials (`admin/admin@123`).
- **Create Forms:** Add various input fields, customize labels, and set required fields.
- **Save Forms:** Store forms in the JSON Server database.
- **View Responses:** Users can submit form responses, and admins can review them.
