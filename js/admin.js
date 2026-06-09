import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase(app);

const provider = new GoogleAuthProvider();

document.getElementById('login-btn').addEventListener('click', () => {
    signInWithPopup(auth, provider).catch((error) => console.error(error));
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'block';
        loadOrders();
    }
});

// Admin Functions with Currency Support
window.addRank = () => {
    push(ref(db, 'ranks'), {
        name: document.getElementById('r-name').value,
        price: document.getElementById('r-price').value,
        currency: document.getElementById('r-currency').value, // Currency selection
        description: document.getElementById('r-desc').value
    }).then(() => alert("Rank Added Successfully!"));
};

window.addCrate = () => {
    push(ref(db, 'crates'), {
        name: document.getElementById('c-name').value,
        type: document.getElementById('c-type').value,
        price: document.getElementById('c-price').value,
        currency: document.getElementById('c-currency').value // Added currency for crates too
    }).then(() => alert("Crate Added Successfully!"));
};

function loadOrders() {
    onValue(ref(db, 'orders'), (snapshot) => {
        const list = document.getElementById('order-list');
        list.innerHTML = '';
        if (snapshot.exists()) {
            snapshot.forEach(child => {
                const order = child.val();
                list.innerHTML += `
                    <div class="p-4 mb-2 bg-gray-900 border-l-4 border-red-600 rounded">
                        <span class="font-bold text-red-400">${order.email}</span> 
                        requested <strong>${order.item}</strong> 
                        Status: <span class="text-green-400">${order.status}</span>
                    </div>`;
            });
        } else {
            list.innerHTML = '<p class="text-gray-500 text-center">No orders yet.</p>';
        }
    });
}

window.showTab = (id) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
};
