document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    
    canvas.id = 'skyCanvas';
    document.body.appendChild(canvas);
  
    const ctx = canvas.getContext('2d');
    const stars = [];
    let animationFrameId;
    let lastUpdateTime = 0;
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };
  
    const createStars = () => {
      stars.length = 0;
      const starCount = Math.floor((canvas.width * canvas.height) / 2000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          brightness: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.0005 + Math.random() * 0.001,
          opacity: 1,
          fadingOut: false,
        });
      }
    };
  
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'black');
      gradient.addColorStop(1, '#000033');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
  
    const drawStars = () => {
      stars.forEach((star) => {
        const twinkle = (Math.sin(star.brightness) + 1) / 2;
        const alpha = twinkle * star.opacity * 0.8 + 0.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(star.x, star.y, 1, 1);
        star.brightness += star.twinkleSpeed;
  
        if (star.fadingOut) {
          star.opacity -= 0.06;
          if (star.opacity <= 0) {
            star.opacity = 0;
            star.fadingOut = false;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
          }
        } else if (star.opacity < 1) {
          star.opacity += 0.06;
          if (star.opacity >= 1) {
            star.opacity = 1;
          }
        }
      });
    };
  
    const updateStars = () => {
      stars.forEach((star) => {
        if (Math.random() < 0.2) {
          star.fadingOut = true;
        }
      });
    };
  
    const animate = (currentTime) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawStars();
  
      if (currentTime - lastUpdateTime >= 2500) {
        updateStars();
        lastUpdateTime = currentTime;
      }
  
      animationFrameId = requestAnimationFrame(animate);
    };
  
    resizeCanvas();
    createStars();
    lastUpdateTime = performance.now();
    animate(performance.now());
  
    window.addEventListener('resize', resizeCanvas);
  
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  });