<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="logo">
            <router-link to="/" class="footer-logo-link">
                <img src="@/assets/images/JokesAppLogo.png" alt="Joke App Logo" class="footer-logo" />
            </router-link>
        </div>
  
        <div class="social-media-icons">
          <a href="https://www.facebook.com" target="_blank" class="social-icon">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" class="social-icon">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" class="social-icon">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" class="social-icon">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped lang="scss">
    @use '@/assets/styles/footer' as footerStyles;
  </style>