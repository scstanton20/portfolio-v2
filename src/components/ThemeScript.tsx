export function ThemeScript() {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        const theme = localStorage.getItem('theme') || 'dark';
                        if (theme === 'dark') {
                            document.documentElement.classList.add('dark');
                        }
                    })();
                `,
            }}
        />
    );
}
