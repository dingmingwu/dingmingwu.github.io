(function () {
    'use strict';

    const storageKey = 'portfolio-theme';
    const themes = [
        { id: 'sage', label: '自然绿', paper: '#fafbf7', swatch: '#39735d' },
        { id: 'sky', label: '晴空蓝', paper: '#f8fbff', swatch: '#5289b8' },
        { id: 'cream', label: '奶油杏', paper: '#fdfaf4', swatch: '#c39867' },
        { id: 'mint', label: '薄荷青', paper: '#f6fcfa', swatch: '#58b89b' },
        { id: 'lavender', label: '淡雅紫', paper: '#fbf9fe', swatch: '#9b7ab4' }
    ];

    function applyTheme(value) {
        const theme = themes.find(item => item.id === value) || themes[0];
        document.documentElement.dataset.theme = theme.id;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme.paper;
        return theme.id;
    }

    // Restore before the first paint; storage may be unavailable in private browsing.
    let savedTheme;
    try { savedTheme = localStorage.getItem(storageKey); } catch (error) {}
    applyTheme(savedTheme);

    function ThemeSwitcher() {
        const [theme, setTheme] = React.useState(document.documentElement.dataset.theme);

        React.useEffect(() => {
            const syncTheme = event => {
                if (event.key === storageKey || event.key === null) {
                    setTheme(applyTheme(event.newValue));
                }
            };
            window.addEventListener('storage', syncTheme);
            return () => window.removeEventListener('storage', syncTheme);
        }, []);

        const changeTheme = value => {
            const nextTheme = applyTheme(value);
            setTheme(nextTheme);
            try { localStorage.setItem(storageKey, nextTheme); } catch (error) {}
        };

        return React.createElement('div', { className: 'theme-switcher', role: 'group', 'aria-label': '页面风格', lang: 'zh-CN' },
            themes.map(item => React.createElement('button', {
                key: item.id,
                type: 'button',
                className: 'theme-dot',
                title: item.label,
                'aria-label': item.label,
                'aria-pressed': theme === item.id,
                style: { '--swatch': item.swatch },
                onClick: () => changeTheme(item.id)
            }, React.createElement('span', { className: 'theme-swatch', 'aria-hidden': true })))
        );
    }

    window.PortfolioTheme = { ThemeSwitcher };
})();
