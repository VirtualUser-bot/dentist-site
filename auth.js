document.getElementById('admin-login-btn').addEventListener('click', () => {
    const email = prompt("Введіть email адміна:");
    const password = prompt("Введіть пароль:");
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('admin-panel').style.display = 'block';
        })
        .catch(error => alert("Помилка входу: " + error.message));
});
