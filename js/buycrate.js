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

const crateContainer = document.getElementById('crate-container');

// Real-time database se crates load karna
const cratesRef = ref(db, 'crates'); 
onValue(cratesRef, (snapshot) => {
    crateContainer.innerHTML = '';
    const data = snapshot.val();
    
    if (data) {
        Object.keys(data).forEach(key => {
            const crate = data[key];
            const crateEl = document.createElement('div');
            crateEl.className = 'crate-card';
            crateEl.innerHTML = `
                <h3>${crate.name}</h3>
                <p>${crate.description}</p>
                <div class="crate-price">$${crate.price}</div>
                <a href="#" class="buy-btn">Unlock Crate</a>
            `;
            crateContainer.appendChild(crateEl);
        });
    } else {
        crateContainer.innerHTML = '<p style="text-align:center;">No crates available right now.</p>';
    }
});
