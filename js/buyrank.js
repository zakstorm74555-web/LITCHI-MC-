import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyATEVA8BKDzB-eKTCAsTVRd3cDzpp7lRhs",
  authDomain: "heroflix-d64ac.firebaseapp.com",
  databaseURL: "https://heroflix-d64ac-default-rtdb.firebaseio.com",
  projectId: "heroflix-d64ac",
  storageBucket: "heroflix-d64ac.firebasestorage.app",
  messagingSenderId: "451233952566",
  appId: "1:451233952566:web:b48a10bd8e1dbcabb77997",
  measurementId: "G-X00Z042LD4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const rankContainer = document.getElementById('rank-container');

// Real-time database se ranks load karna
const ranksRef = ref(db, 'ranks'); // Admin.html mein ranks isi path pe save honi chahiye
onValue(ranksRef, (snapshot) => {
    rankContainer.innerHTML = ''; // Container saaf karo
    const data = snapshot.val();
    
    if (data) {
        Object.keys(data).forEach(key => {
            const rank = data[key];
            const rankEl = document.createElement('div');
            rankEl.className = 'rank-card';
            rankEl.innerHTML = `
                <h3>${rank.name}</h3>
                <p>${rank.description}</p>
                <div class="rank-price">$${rank.price}</div>
                <a href="#" class="buy-btn">Purchase Now</a>
            `;
            rankContainer.appendChild(rankEl);
        });
    } else {
        rankContainer.innerHTML = '<p>No ranks available currently.</p>';
    }
});
