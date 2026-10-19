// Script de Interactividad - Documentación Fab Academy

document.addEventListener('DOMContentLoaded', () => {

    // 1. Manejo del Tema Claro / Oscuro
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    
    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    // 2. Buscador / Filtrado en Vivo para la Tabla BOM
    const bomSearch = document.getElementById('bomSearch');
    const bomTable = document.getElementById('bomTable');

    if (bomSearch && bomTable) {
        bomSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const rows = bomTable.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // 3. Botón para Copiar Código
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const codeBlock = document.getElementById('codeBlock');

    if (copyCodeBtn && codeBlock) {
        copyCodeBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                const originalText = copyCodeBtn.textContent;
                copyCodeBtn.textContent = '✅ Copiado!';
                copyCodeBtn.style.color = '#4ade80';
                
                setTimeout(() => {
                    copyCodeBtn.textContent = originalText;
                    copyCodeBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Error al copiar: ', err);
            }
        });
    }

    // 4. Smooth Scrolling para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
