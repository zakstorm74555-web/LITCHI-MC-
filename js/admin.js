import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

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

// Google Sign-In
document.getElementById('login-btn').addEventListener('click', () => {
    signInWithPopup(auth, provider).catch((error) => console.error("Auth Error:", error));
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex'; // Changed to flex to match side-nav
        loadOrders();
    }
});

// Admin Functions
window.addRank = () => {
    push(ref(db, 'ranks'), {
        name: document.getElementById('r-name').value,
        price: document.getElementById('r-price').value,
        currency: document.getElementById('r-currency').value,
        description: document.getElementById('r-desc') ? document.getElementById('r-desc').value : ""
    }).then(() => alert("Rank Deployed Successfully!"));
};

window.addCrate = () => {
    push(ref(db, 'crates'), {
        name: document.getElementById('c-name').value,
        type: document.getElementById('c-type').value,
        price: document.getElementById('c-price').value,
        currency: document.getElementById('c-currency').value
    }).then(() => alert("Crate Deployed Successfully!"));
};

// Orders Management
function loadOrders() {
    const list = document.getElementById('order-list');
    onValue(ref(db, 'orders'), (snapshot) => {
        list.innerHTML = '';
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const orderKey = childSnapshot.key;
                const order = childSnapshot.val();
                
                const div = document.createElement('div');
                div.className = "p-5 bg-black border border-red-900 rounded-xl shadow-lg hover:border-red-500 transition flex justify-between items-center";
                div.innerHTML = `
                    <div>
                        <p class="text-red-400 font-bold">${order.email || 'Anonymous'}</p>
                        <p class="text-white text-lg font-semibold">${order.item || 'N/A'}</p>
                        <p class="text-sm text-gray-400">Status: <span class="text-green-400">${order.status || 'Pending'}</span></p>
                    </div>
                    <button onclick="removeOrder('${orderKey}')" class="text-red-600 hover:text-white text-xl font-bold p-2">✕</button>
                `;
                list.appendChild(div);
            });
        } else {
            list.innerHTML = '<p class="text-gray-500 italic text-center w-full">No active orders found.</p>';
        }
    });
}

// Global scope for HTML onclick
window.removeOrder = (key) => {
    if(confirm("Are you sure you want to delete this order?")) {
        remove(ref(db, `orders/${key}`));
    }
};

window.showTab = (id) => {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
};
