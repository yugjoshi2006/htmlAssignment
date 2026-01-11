
// Login Form Handler
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple validation 
    if (username && password) {
       
        window.location.href = 'dashboard.html';
    } else {
        alert('Please enter both username and password');
    }
}

// Snackbar functionality - Global function
function showSnackbar(message, type) {
    const snackbar = document.getElementById('snackbar');
    const snackbarMessage = document.getElementById('snackbarMessage');
    
    if (snackbar && snackbarMessage) {
        snackbarMessage.textContent = message;
        snackbar.className = `snackbar show ${type}`;
        
        setTimeout(() => {
            snackbar.classList.remove('show');
        }, 3000);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LOGIN PAGE FUNCTIONALITY
    // ============================================
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    
    // Mobile sidebar functionality
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');

    if (mobileMenuToggle && sidebar) {
        // Mobile menu toggle
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.add('show');
            document.body.classList.add('sidebar-open');
        });

        // Close sidebar
        if (sidebarClose) {
            sidebarClose.addEventListener('click', closeSidebar);
        }

        function closeSidebar() {
            sidebar.classList.remove('show');
            document.body.classList.remove('sidebar-open');
        }

        // Close sidebar on window resize if screen becomes large
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                closeSidebar();
            }
        });
        
        // Close sidebar when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                closeSidebar();
            });
        });
    }

    //Mobile search bar functionality is removed - cleaner design

    // file upload functionality
    
    const uploadButton = document.getElementById('uploadButton');
    const fileUpload = document.getElementById('fileUpload');
    const fileName = document.getElementById('fileName');

    if (uploadButton && fileUpload && fileName) {
        uploadButton.addEventListener('click', function() {
            fileUpload.click();
        });

        fileUpload.addEventListener('change', function(e) {
            const selectedFile = e.target.files[0] ? e.target.files[0].name : 'No item selected';
            fileName.textContent = selectedFile;
        });
    }

   
    // Floating label functionality
  
    
    document.querySelectorAll('.floating-label input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });


    // Snackbar functionality
  
    
    const snackbarClose = document.getElementById('snackbarClose');
    if (snackbarClose) {
        snackbarClose.addEventListener('click', function() {
            const snackbar = document.getElementById('snackbar');
            if (snackbar) {
                snackbar.classList.remove('show');
            }
        });
    }

   
    // Form Validation
  
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });

    
    // Navigation functionality
   
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // Close mobile sidebar when navigation link is clicked
            const sidebar = document.getElementById('sidebar');
            
            if (sidebar && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                document.body.classList.remove('sidebar-open');
            }
            
            // If it's a page navigation link (has href and not #), allow default behavior
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                // Let the browser handle the page navigation
                return true;
            }
        });
    });

    
    // Mobile navigation bar functionality

    
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        // Add click handler to the entire nav item for better mobile UX
        item.addEventListener('click', function(e) {
            // If clicking on the link itself, let it handle navigation
            if (e.target.classList.contains('nav-link')) {
                return;
            }
            
            // Otherwise, trigger the link click
            if (link) {
                link.click();
            }
        });
    });

    
    // Keyboard navigation
   
    
    document.addEventListener('keydown', function(e) {
        // Close sidebar with Escape key
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            
            if (sidebar && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
                document.body.classList.remove('sidebar-open');
            }
        }
    });
});


// Utility function


function validateField(field) {
    const value = field.value.trim();
    const isValid = field.checkValidity();
    
    if (!isValid && value !== '') {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    } else if (isValid && value !== '') {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
    } else {
        field.classList.remove('is-invalid', 'is-valid');
    }
}