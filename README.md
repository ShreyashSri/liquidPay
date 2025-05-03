# 💧 LiquidPay

**LiquidPay** is an AI-driven financial behavior platform designed to help users—especially in underserved communities—develop smarter money habits through predictive analytics and blockchain-based rewards.

---

## 🌟 Inspiration

In many underserved communities, managing finances is challenging due to a lack of awareness and incentives. LiquidPay goes beyond simple expense tracking—it helps users understand spending patterns and rewards them for making better financial choices.

---

## 💡 Features

- 🔍 **Smart Transaction Classification**  
  Automatically labels transactions as *needs* or *wants* using a trained ML model.

- 📊 **Financial Forecasting**  
  Predicts the upcoming week’s financial health using an LSTM model trained on the last 60 days of spending.

- 🎯 **Personalized Daily Goals**  
  Generates actionable goals using behavioral insights from the Gemini API.

- 🪙 **Blockchain Rewards**  
  Rewards users with SaveIT (SIT) tokens (ERC-20 on Polygon Amoy Testnet) for completing goals (5 SIT per goal).

- 📈 **Interactive Dashboard**  
  Displays live stats including:
  - Total balance
  - Savings rate
  - Goal tracking
  - Notifications
  - Recent transactions

---

## ⚙️ Tech Stack

### 🔧 Frontend
- **React.js** – Interactive dashboard UI

### 🧠 Backend
- **Node.js & Express** – API server
- **MongoDB** – Stores user data and transactions

### 🧮 Machine Learning
- **Transaction Classifier** – Categorizes expenses
- **LSTM Model** – Forecasts financial conditions

### 🧠 Behavioral Intelligence
- **Gemini API** – Tailors financial goals based on user behavior

### 🪙 Blockchain
- **Polygon Amoy Testnet** – SIT token deployment
- **Thirdweb** – Smart contract & token interaction

---

## 🧗 Challenges

- Seamlessly connecting ML models with backend infrastructure
- Ensuring high accuracy in transaction classification
- Handling daily goal lifecycle (creation, expiry, tracking)
- Managing blockchain reward logic & wallet integration
- Synchronizing frontend with live backend + blockchain data

---

## 🏆 Accomplishments

- Integrated AI, behavior analysis, and blockchain in a cohesive ecosystem
- Built a real-time ERC-20 rewards engine
- Designed a fluid experience from transaction logging to goal completion and rewards
- Created a solution with genuine potential to improve financial habits

---

## 📚 What We Learned

- Applied LSTM on real-world time-series data for financial prediction
- Hands-on experience in blockchain and ERC-20 token integration
- Used behavioral APIs to personalize financial planning
- Mastered real-time frontend-backend data communication

---

## 🚀 What’s Next

- 🔌 Connect to real financial data via **Plaid** or **RazorpayX**
- 🤝 Launch **Peer Challenge Mode** for social goal-setting
- ⚠️ Introduce **AI Nudges** to warn about risky spending trends
- 📱 Roll out a **mobile-first version** for better accessibility
- 💵 Enable **token-to-cash conversion** for crypto-free rewards

---

## 📎 Additional Info

Want to explore visuals, API documentation, smart contracts, or live demo?

📩 Reach out or check the repo’s `/docs` folder (coming soon).

---

## 🧪 Demo

[Link](https://youtu.be/LKmpacW3xrE?si=8dq2NihrmMZIKoxu)

---

## 📝 License

MIT License © 2025 LiquidPay
