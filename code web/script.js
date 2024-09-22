document.addEventListener('DOMContentLoaded', () => {
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    const outputFrame = document.getElementById('output').contentWindow.document;
    const outputFrameContainer = document.getElementById('output');

    // Load saved code from local storage
    htmlCode.value = localStorage.getItem('html') || '<h1>Hello World!</h1>';
    cssCode.value = localStorage.getItem('css') || 'h1 { color: blue; }';
    jsCode.value = localStorage.getItem('js') || 'console.log("Hello from JavaScript!");';

    document.getElementById('run-btn').addEventListener('click', () => {
        const html = htmlCode.value;
        const css = `<style>${cssCode.value}</style>`;
        const js = `<script>${jsCode.value}<\/script>`;
        
        outputFrame.open();
        outputFrame.write(html + css + js);
        outputFrame.close();
    });

    document.getElementById('toggle-output-btn').addEventListener('click', () => {
        if (outputFrameContainer.style.display === "none") {
            outputFrameContainer.style.display = "block";
            document.getElementById('toggle-output-btn').textContent = "Hide Output";
        } else {
            outputFrameContainer.style.display = "none";
            document.getElementById('toggle-output-btn').textContent = "Show Output";
        }
    });

    document.getElementById('save-btn').addEventListener('click', () => {
        localStorage.setItem('html', htmlCode.value);
        localStorage.setItem('css', cssCode.value);
        localStorage.setItem('js', jsCode.value);
        alert('Code saved locally!');
    });

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const selectedTab = button.getAttribute('data-tab');
            document.querySelectorAll('.editor-textarea').forEach(textarea => {
                textarea.classList.remove('active');
                if (textarea.id === `${selectedTab}-code`) {
                    textarea.classList.add('active');
                }
            });
        });
    });

    // Initialize the display
    document.querySelector('.tab-button.active').click();
});
