document.addEventListener("DOMContentLoaded", function() {
    // Existing functionality for switching forms
    const emailRadio = document.getElementById("email");
    const phoneRadio = document.getElementById("phone");
    const emailForm = document.querySelector("form.email");
    const phoneForm = document.querySelector("form.phone");

    function updateFormVisibility() {
        if (emailRadio.checked) {
            phoneForm.classList.remove("active");
            emailForm.classList.add("active");
        } else if (phoneRadio.checked) {
            emailForm.classList.remove("active");
            phoneForm.classList.add("active");
        }
    }

    emailRadio.addEventListener("change", updateFormVisibility);
    phoneRadio.addEventListener("change", updateFormVisibility);

    // Call updateFormVisibility on page load
    updateFormVisibility();

    // Function to handle smooth scrolling with delay
    function delayedScroll(targetSelector, delay = 500) {
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, delay);
        }
    }

    // Smooth scroll for "Get the App"
    const scrollButton = document.querySelector('a[href="#getTheApp"]');
    
    if (scrollButton) {
        scrollButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor click behavior
            delayedScroll('#getTheApp', 1); // Adjust the delay as needed
        });
    }

    // Modal functionality
    const loginButton = document.querySelector('#loginButton'); // Assuming "Log In" is the second button
    const signupButton = document.querySelector('#signupButton'); // Assuming "Sign Up" is the third button
    const logoutButton = document.querySelector('#logoutButton'); // Assuming there's a Logout button

    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeSignup = document.getElementById('closeSignup');


    function updateButtonStates() {
        const loginModalVisible = window.getComputedStyle(loginModal).display === 'block';
        const signupModalVisible = window.getComputedStyle(signupModal).display === 'block';
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (signupModalVisible) {
            signupButton.classList.add('navButtonIsActive');
        } else {
            signupButton.classList.remove('navButtonIsActive');
        }

        if (loginModalVisible) {
            loginButton.classList.add('navButtonIsActive');
        } else {
            loginButton.classList.remove('navButtonIsActive');
        }

        if (isLoggedIn) {
            loginButton.style.display = 'none';
            signupButton.style.display = 'none';
            logoutButton.style.display = 'block';

            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                const userData = JSON.parse(localStorage.getItem(loggedInUser));
                if (userData && userData.name) {
                    logoutButton.textContent = `Welcome! ${userData.name} - Log Out`;
                }
            }
        } else {
            loginButton.style.display = 'block';
            signupButton.style.display = 'block';
            logoutButton.style.display = 'none';
            logoutButton.textContent = 'Log Out'; // Reset text
        }
    }

    loginButton.addEventListener('click', () => {
        loginModal.style.display = 'block';
        signupModal.style.display = 'none';
        document.getElementById('menuShowMore').checked = false;
        updateButtonStates();
    });

    signupButton.addEventListener('click', () => {
        signupModal.style.display = 'block';
        loginModal.style.display = 'none';
        document.getElementById('menuShowMore').checked = false;
        updateButtonStates();
    });

    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
        updateButtonStates();
    });

    closeSignup.addEventListener('click', () => {
        signupModal.style.display = 'none';
        updateButtonStates();
    });

    // Close modals when clicking outside of them
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            updateButtonStates();
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
            updateButtonStates();
        }
    });

    //----------------------------------------------------------------------------------------------------------------------------------
    // Notification features

    const notificationContainer = document.getElementById('notification-container');

    // Function to show notification
    function showNotification(msg, backGroundColor = 'default') {
        const notification = document.createElement('div');
        notification.className = 'notification';

        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            closeNotification(notification);
        });
        notification.appendChild(closeButton);

        const message = document.createElement('span');
        message.textContent = msg;
        notification.appendChild(message);

        notificationContainer.prepend(notification);

        // Adjust height according to content
        notification.style.height = 'auto';
        
        // Hide notification after 2 seconds
        setTimeout(() => {
            if (notificationContainer.contains(notification)) {
                closeNotification(notification);
            }
        }, 3000);

        if (backGroundColor === 'success') {
            notification.style.backgroundColor = 'rgba(58, 116, 0, 0.61)';
        }
        if (backGroundColor === 'warning') {
            notification.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
        }
    }

    // Function to close notification with animation
    function closeNotification(notification) {
        notification.style.animation = 'slide-out 0.5s forwards';
        notification.addEventListener('animationend', () => {
            if (notificationContainer.contains(notification)) {
                notificationContainer.removeChild(notification);
            }
        });
    }

    // --------------------------------------------------------------------------------

    // For developing phase features
    const contactPhoneform = document.getElementById('contactPhone');
    const contactEmailform = document.getElementById('contactEmail');
    const contactNumber = document.getElementById('contactNumber');
    const contactEmail = document.getElementById('emailId');
    

    // Handling the form event for showing the feature is in developing phase
    contactPhoneform.addEventListener('submit', function(e){
        e.preventDefault();
        if(!contactNumber.value){
            showNotification('Please fill your Contact number','warning');
            return;
        }else{
            showNotification('This feature is in developing phase');
        }
    });

    contactEmailform.addEventListener('submit', function(e){
        e.preventDefault();
        if(!contactEmail.value){
            showNotification('Please fill your Contact email','warning');
            return;
        }else{
            showNotification('This feature is in developing phase');
        }
    });


    //---------------------------------------------------------------------------------------------

    // Login and SignUp functionality
    const signUpForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    // Handle sign up form submission
    signUpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if(!name||!username||!password||!confirmPassword){
            showNotification('Please fill all the fields', 'warning');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'warning');
            return;
        }
        
        const userData = {
            name,
            username,
            password
        };

        localStorage.setItem(username, JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', username);

        showNotification('Sign Up Successful!', 'success');
        signupModal.style.display = 'none';
        document.getElementById('menuShowMore').checked = true;
        updateButtonStates();
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if(!username||!password){
            showNotification('Please fill all the fields', 'warning');
            return;
        }

        const userData = JSON.parse(localStorage.getItem(username));

        if (userData && userData.password === password) {
            showNotification('Login Successful!', 'success');
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', username);
            loginModal.style.display = 'none';
            document.getElementById('menuShowMore').checked = true;
            updateButtonStates();
        } else {
            showNotification('Invalid username or password!', 'warning');
        }
    });

    // Handle logout
    logoutButton.addEventListener('click', () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('loggedInUser');
        showNotification('Logged Out Successfully!', 'warning');
        document.getElementById('menuShowMore').checked = false;
        updateButtonStates();
    });


    document.querySelector('#appStore').addEventListener('click',()=>{
        showNotification('The app is developing phase');
    });

    document.querySelector('#playStore').addEventListener('click',()=>{
        showNotification('The app is developing phase');
    });

    document.querySelector('#addBarberShop').addEventListener('click',()=>{
        showNotification('The app is developing phase');
    });



    // Initial button state update
    updateButtonStates();

    // ----------------------------------------------------------------------------------
});
