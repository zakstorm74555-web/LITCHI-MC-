import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = { const firebaseConfig = {
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
const auth = getAuth(app);
const db = getDatabase(app);

// Google Sign-In
const provider = new GoogleAuthProvider();
document.getElementById('login-btn').onclick = () => signInWithPopup(auth, provider);

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadOrders();
    }
});

// Admin Functions
window.addRank = () => {
    push(ref(db, 'ranks'), {
        name: document.getElementById('r-name').value,
        price: document.getElementById('r-price').value,
        description: document.getElementById('r-desc').value
    });
    alert("Rank Added!");
};

window.addCrate = () => {
    push(ref(db, 'crates'), {
        name: document.getElementById('c-name').value,
        type: document.getElementById('c-type').value,
        price: document.getElementById('c-price').value
    });
    alert("Crate Added!");
};

function loadOrders() {
    onValue(ref(db, 'orders'), (snapshot) => {
        const list = document.getElementById('order-list');
        list.innerHTML = '';
        snapshot.forEach(child => {
            const order = child.val();
            list.innerHTML += `<p>User: ${order.email} | Item: ${order.item} | Status: ${order.status}</p>`;
        });
    });
}

window.showTab = (id) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
};
