const adminBtn = document.getElementById('current-btn');
adminBtn.addEventListener('click', () => {
    window.location.href = "input-ct.html";
    // Add code to redirect to admin.html page
});

const customerBtn = document.getElementById('potential-btn');
customerBtn.addEventListener('click', () => {
    window.location.href = "input-pt.html";
    // Add code to redirect to customer.html page
});
