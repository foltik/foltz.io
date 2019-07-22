window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    console.log(canvas.getBoundingClientRect());

    let mouse = {x: 0, y: 0};
    let threshold = 180;

    const circle = p => {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke();
    };

    const line = (p1, p2, alpha) => {
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    };

    const distance = (d1, d2) => Math.sqrt(((d2.x - d1.x) ** 2) + ((d2.y - d1.y) ** 2));
    const lerp = (a, b, f) => a + f * (b - a);

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        dots.map(d1 => {
            circle(d1);

            [...dots, mouse].map(d2 => {
                const dist = distance(d1, d2);
                if (dist < threshold)
                    line(d1, d2, lerp(0.2, 0.7, threshold / dist));
            });
        });

        circle({x: 236, y: 588});
    };

    const update = () => {
        dots.map(d => {
            d.x += d.vx / 60;
            d.y += d.vy / 60;
            if (d.x < 0 || d.x > canvas.width)
                d.vx = -d.vx;
            if (d.y < 0 || d.y > canvas.height)
                d.vy = -d.vy;
        });
    };

    const tick = () => {
        draw();
        update();
        requestAnimationFrame(tick);
    };

    canvas.addEventListener('mousemove', e => {
        const bounds = canvas.getBoundingClientRect();
        mouse.x = e.clientX - bounds.left;
        mouse.y = e.clientY - bounds.top;
    });

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let n = Math.floor((canvas.width * canvas.height) / 18000);

    dots = [];
    for (let i = 0; i < n; i++)
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.floor(Math.random() * 50) - 25,
            vy: Math.floor(Math.random() * 50) - 25
        });

    tick();
});
