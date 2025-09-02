# PacifisAI Dashboard  

A **React-based dashboard** for [PacifisAI.com](http://pacifisai.com/), built with a **light theme** using the brand colors `#7446f4` (purple) and `#30e87a` (green).  
The dashboard showcases **AI-powered features** for customer support teams with a functional **Login/Register system** (using temporary session storage).  

---

## 🚀 Features  

### 🔐 Authentication  
- **Register**: Create an account (stored in local/session storage).  
- **Validation**: Prevents duplicate registrations.  
- **Login**: Uses registered credentials.  
- **Error Handling**: Invalid email/password → error message.  
- **Logout**: Clears session and redirects to login.  

### 📊 Dashboard (Sidebar Menus)  
- **Overview** → KPI cards (Customer Sentiment, Avg Response Time, Tickets Resolved).  
- **Empathy-Driven AI Responses** → Demo card showing sentiment-based replies.  
- **Intelligent Escalation** → Mock workflow for escalation logic.  
- **Multi-Channel Integration** → Demo cards for Chat, Email, Social.  
- **Knowledge Base Assistance** → FAQ/Q&A instant suggestions.  
- **Analytics Dashboard** → Charts (Sentiment Trends, Resolution Rate, Agent Efficiency).  
- **Notifications Center** → Simulated alerts for support queries.  
- **AI Agent Simulation** → Demo chatbot widget with scripted AI replies.  
- **Customer Feedback Insights** → Pie chart of positive/neutral/negative feedback.  
- **User Settings** → Update profile & password (demo only).  
- **Logout** → Ends session.  

---

## 🛠️ Tech Stack  
- **Frontend:** React + Vite  
- **Routing:** React Router  
- **Styling:** Tailwind CSS / CSS  
- **Charts:** Recharts (for analytics & insights)  
- **Animations:** Framer Motion  
- **Storage:** LocalStorage / SessionStorage (for auth demo)  

---

## 📂 Project Structure  
pacifisai-dashboard/
│── public/ # Static files (logo placeholder, assets)
│── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Dashboard pages (each sidebar menu = one page)
│ ├── context/ # Auth context (login/register/session)
│ ├── App.jsx # Main app with routes
│ ├── index.css # Styles
│ └── main.jsx # Entry point
│── package.json
│── vite.config.js
│── README.md


---

## ⚡ Getting Started  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/pacifisai-dashboard.git
cd pacifisai-dashboard

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev


The app will be available at http://localhost:5173/

4️⃣ Build for Production
npm run build

🎨 Branding

Primary Color: #7446f4 (Purple)

Secondary Color: #30e87a (Green)

Typography: Inter + Poppins

📌 Notes

This project uses temporary session storage for authentication (not a real backend).

Charts and chatbot are demo-only with mock data.

Future versions can integrate with APIs and real databases.


