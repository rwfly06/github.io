/* ═══════════ RWFLY06 — ARCH NEON PORTFOLIO ═══════════ */
'use strict';
const USER = 'Rwfly06';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══ BOOT SCREEN ═══ */
(() => {
  const boot = document.getElementById('boot');
  const out  = document.getElementById('bootText');
  const lines = [
    ['svc', 'Arch Linux 6.9-zen (tty1)'],
    ['ok',  '[  OK  ] Mounted /boot — EFI System Partition'],
    ['ok',  '[  OK  ] Started Network Manager'],
    ['ok',  '[  OK  ] Reached target Graphical Interface'],
    ['ok',  '[  OK  ] Started Hyprland Compositor'],
    ['svc', ':: Synchronizing package databases...'],
    ['svc', ':: Loading portfolio modules... [neon] [glass] [cyber]'],
    ['ok',  '[  OK  ] rwfly06.service — Full Stack Developer ready'],
    ['svc', ''],
    ['cyan','Welcome, visitor. Launching interface...'],
  ];
  let i = 0;
  const done = () => { boot.classList.add('hide'); setTimeout(() => boot.remove(), 800); };
  if (reduced) return done();
  const next = () => {
    if (i >= lines.length) return setTimeout(done, 650);
    const [cls, txt] = lines[i++];
    const el = document.createElement('div');
    el.className = cls; el.textContent = txt;
    out.appendChild(el);
    setTimeout(next, 170 + Math.random() * 240);
  };
  next();
  boot.addEventListener('click', done);
})();

/* ═══ TYPING ROLES ═══ */
(() => {
  const roles = ['Linux Enthusiast','Full Stack Developer','Open Source Contributor','Cyber Security Learner','Arch Linux User'];
  const el = document.getElementById('typeRole');
  let r = 0, c = 0, del = false;
  const tick = () => {
    const word = roles[r];
    el.textContent = word.slice(0, c);
    if (!del && c < word.length) { c++; setTimeout(tick, 70); }
    else if (!del) { del = true; setTimeout(tick, 1600); }
    else if (c > 0) { c--; setTimeout(tick, 34); }
    else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 350); }
  };
  tick();
})();

/* ═══ PARTICLES ═══ */
(() => {
  if (reduced) return;
  const cv = document.getElementById('particles'), ctx = cv.getContext('2d');
  const COLORS = ['#00E5FF', '#0099FF', '#8A2BE2', '#FF00FF'];
  let W, H, pts = [];
  const resize = () => {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    const n = Math.min(110, (W * H) / 16000 | 0);
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
      r: Math.random() * 1.8 + .6, c: COLORS[Math.random() * COLORS.length | 0],
    }));
  };
  addEventListener('resize', resize); resize();
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.globalAlpha = .8; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = .1; ctx.strokeStyle = '#00E5FF'; ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = dx * dx + dy * dy;
      if (d < 13000) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
    }
    requestAnimationFrame(loop);
  })();
})();

/* ═══ MATRIX RAIN ═══ */
(() => {
  if (reduced) return;
  const cv = document.getElementById('matrix'), ctx = cv.getContext('2d');
  const CHARS = 'アイウエオカキクケコ01</>{}#$アルチArch';
  let W, H, cols, drops;
  const resize = () => {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    cols = W / 16 | 0; drops = Array(cols).fill(0).map(() => Math.random() * -60 | 0);
  };
  addEventListener('resize', resize); resize();
  setInterval(() => {
    ctx.fillStyle = 'rgba(5,5,5,.10)'; ctx.fillRect(0, 0, W, H);
    ctx.font = '14px JetBrains Mono, monospace';
    drops.forEach((y, x) => {
      ctx.fillStyle = Math.random() < .12 ? '#FF00FF' : '#00E5FF';
      ctx.fillText(CHARS[Math.random() * CHARS.length | 0], x * 16, y * 16);
      drops[x] = y * 16 > H && Math.random() > .975 ? 0 : y + 1;
    });
  }, 66);
})();

/* ═══ NEON CURSOR + SPOTLIGHT ═══ */
(() => {
  const cur = document.getElementById('cursor'), glow = document.getElementById('cursorGlow');
  addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
  });
  document.addEventListener('mouseover', e => {
    cur.classList.toggle('link', !!e.target.closest('a,button,input,.badge'));
  });
})();

/* ═══ SCROLL REVEAL ═══ */
(() => {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ═══ 3D TILT ═══ */
(() => {
  if (matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
})();

/* ═══ NAVBAR ═══ */
(() => {
  const burger = document.getElementById('burger'), links = document.querySelector('.nav-links');
  burger.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
})();

/* ═══ SKILLS ═══ */
(() => {
  const SKILLS = [
    ['HTML', 'devicon-html5-plain', 95], ['CSS', 'devicon-css3-plain', 90],
    ['JavaScript', 'devicon-javascript-plain', 88], ['TypeScript', 'devicon-typescript-plain', 80],
    ['React', 'devicon-react-original', 85], ['Next.js', 'devicon-nextjs-plain', 78],
    ['Node.js', 'devicon-nodejs-plain', 82], ['Express', 'devicon-express-original', 75],
    ['Python', 'devicon-python-plain', 80], ['PHP', 'devicon-php-plain', 70],
    ['Laravel', 'devicon-laravel-original', 68], ['MySQL', 'devicon-mysql-plain', 78],
    ['PostgreSQL', 'devicon-postgresql-plain', 72], ['Docker', 'devicon-docker-plain', 74],
    ['Linux', 'devicon-linux-plain', 90], ['Arch Linux', 'devicon-archlinux-plain', 92],
    ['Git', 'devicon-git-plain', 88], ['GitHub', 'devicon-github-original', 90],
    ['Bash', 'devicon-bash-plain', 84], ['Cyber Security', null, 65],
  ];
  document.getElementById('skillGrid').innerHTML = SKILLS.map(([name, ico, p]) => `
    <div class="skill glass">
      <div class="skill-head">
        ${ico ? `<i class="${ico} colored"></i>` : '<span class="emo">🛡️</span>'}
        <b>${name}</b><span>${p}%</span>
      </div>
      <div class="bar"><i style="--p:${p}%"></i></div>
    </div>`).join('');
})();

/* ═══ TECH BADGES ═══ */
(() => {
  const TECH = ['HTML5','CSS3','Tailwind','JavaScript','TypeScript','React','Next.js','Node.js','Express',
    'Python','PHP','Laravel','MySQL','PostgreSQL','Docker','Git','GitHub Actions','Bash','Fish','Vite',
    'Linux','Arch Linux','Hyprland','Neovim','Tmux','REST API','Figma'];
  document.getElementById('badgeCloud').innerHTML =
    TECH.map(t => `<span class="badge">${t}</span>`).join('');
})();

/* ═══ GITHUB API ═══ */
(async () => {
  const $ = id => document.getElementById(id);
  const animate = (el, target) => {
    const t0 = performance.now(), dur = 1300;
    const step = t => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))).toLocaleString();
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  try {
    const u = await (await fetch(`https://api.github.com/users/${USER}`)).json();
    if (u.login) {
      animate($('cFollowers'), u.followers); animate($('cFollowing'), u.following);
      animate($('cRepos'), u.public_repos);
    }
    const repos = await (await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`)).json();
    if (Array.isArray(repos)) {
      animate($('cStars'), repos.reduce((s, r) => s + r.stargazers_count, 0));
      const top = repos.filter(r => !r.fork).sort((a, b) =>
        b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 6);
      window.__repos = top;
      $('projectGrid').innerHTML = top.length ? top.map(r => `
        <article class="proj-card glass tilt" data-tilt>
          <div class="proj-thumb">${r.name[0].toUpperCase()}</div>
          <div class="proj-body">
            <h3>${r.name} <span class="p-status ${r.archived ? 'archived' : ''}">${r.archived ? 'ARCHIVED' : 'ACTIVE'}</span></h3>
            <p>${r.description || 'No description — but the code speaks for itself.'}</p>
            <div class="p-tech">${(r.topics || []).slice(0, 4).map(t => `<span>${t}</span>`).join('') || (r.language ? `<span>${r.language}</span>` : '')}</div>
            <div class="p-meta"><span>★ ${r.stargazers_count}</span><span>⑂ ${r.forks_count}</span><span>${r.language || ''}</span></div>
            <div class="p-links">
              ${r.homepage ? `<a class="demo" href="${r.homepage}" target="_blank" rel="noopener">◉ Live Demo</a>` : ''}
              <a href="${r.html_url}" target="_blank" rel="noopener">⌥ Repository</a>
            </div>
          </div>
        </article>`).join('')
        : '<p class="loading-hint">Belum ada repositori publik — saatnya push project pertama! 🚀</p>';
      // re-bind tilt untuk card baru
      document.dispatchEvent(new Event('cards:ready'));
    }
    const [prs, issues] = await Promise.all([
      fetch(`https://api.github.com/search/issues?q=author:${USER}+type:pr`).then(r => r.json()).catch(() => null),
      fetch(`https://api.github.com/search/issues?q=author:${USER}+type:issue`).then(r => r.json()).catch(() => null),
    ]);
    if (prs?.total_count != null) animate($('cPRs'), prs.total_count);
    if (issues?.total_count != null) animate($('cIssues'), issues.total_count);
  } catch {
    $('projectGrid').innerHTML = '<p class="loading-hint">⚠ GitHub API rate-limit — coba refresh beberapa menit lagi.</p>';
  }
})();

/* re-bind tilt for dynamic cards */
document.addEventListener('cards:ready', () => {
  if (matchMedia('(hover:none)').matches) return;
  document.querySelectorAll('.proj-card[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
});

/* ═══ FAKE CLOCK (waybar) ═══ */
setInterval(() => {
  const d = new Date();
  document.getElementById('fakeClock').textContent =
    `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}, 1000);

/* ═══ INTERACTIVE TERMINAL ═══ */
(() => {
  const out = document.getElementById('termOut'), inp = document.getElementById('termIn');
  const print = (html) => { out.insertAdjacentHTML('beforeend', html + '\n'); out.scrollTop = out.scrollHeight; };
  const NEOFETCH = `<span class="cyan">       /\\
      /  \\
     /\\   \\        <span class="pink">rwfly06</span>@<span class="pink">archbtw</span>
    /  __  \\       ─────────────────
   /  (  )  \\      OS: Arch Linux x86_64
  / __|  |__ \\     WM: Hyprland | Bar: Waybar
 /.\`      \`.\\   Shell: fish | Term: kitty
                   Editor: Neovim (btw)
                   CPU: Passion Core i9
                   Memory: ∞ / ∞ (dreams)</span>`;
  const CMDS = {
    help: () => print(`<span class="dim">Perintah tersedia:</span>
  <span class="cyan">whoami</span>     → identitas
  <span class="cyan">neofetch</span>   → spesifikasi sistem
  <span class="cyan">skills</span>     → daftar skill
  <span class="cyan">projects</span>   → repositori unggulan
  <span class="cyan">contact</span>    → sosial media
  <span class="cyan">clear</span>      → bersihkan layar`),
    whoami: () => print(`<span class="pink">«Full Stack Developer»</span> — Linux enthusiast, open source contributor, Arch user (btw).`),
    neofetch: () => print(NEOFETCH),
    skills: () => print(`<span class="green">HTML CSS JavaScript TypeScript React Next.js Node.js Express
Python PHP Laravel MySQL PostgreSQL Docker
Linux ArchLinux Git GitHub Bash CyberSecurity</span>`),
    projects: () => {
      const rs = window.__repos;
      if (!rs?.length) return print(`<span class="dim">Repositori belum termuat — scroll ke section Projects.</span>`);
      rs.forEach(r => print(`<span class="cyan">▸ ${r.name}</span> <span class="dim">★${r.stargazers_count} — ${r.description || 'no description'}</span>`));
    },
    contact: () => print(`<span class="cyan">GitHub</span>   → github.com/${USER}
<span class="cyan">Email</span>    → youremail@example.com
<span class="cyan">Discord</span>  → rwfly06 | <span class="cyan">Telegram</span> → @rwfly06`),
    clear: () => { out.innerHTML = ''; },
    'sudo pacman -syu': () => print(`<span class="green">:: Synchronizing package databases...
 core is up to date
 extra is up to date
:: Starting full system upgrade... there is nothing to do ✔</span>`),
    'rm -rf /': () => print(`<span class="pink">nice try. 🛡️ permission denied — protected by anime girl firewall.</span>`),
  };
  print(`<span class="dim">Ketik <span class="cyan">help</span> untuk melihat daftar perintah.</span>`);
  inp.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const raw = inp.value.trim(); inp.value = '';
    if (!raw) return;
    print(`<span class="green">rwfly06@arch</span><span class="cyan">:~$</span> <span class="cmd">${raw.replace(/</g, '&lt;')}</span>`);
    const fn = CMDS[raw.toLowerCase()];
    fn ? fn() : print(`<span class="dim">bash: ${raw.replace(/</g, '&lt;')}: command not found — coba</span> <span class="cyan">help</span>`);
  });
  document.querySelector('.term').addEventListener('click', () => inp.focus());
})();
