function scrollToSection(event, sectionId) {
    event.preventDefault();

    document.getElementById('main-container').style.display = 'flex';
    document.getElementById('backpacking-container').style.display = 'none';

    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        history.replaceState(null, '', window.location.pathname);
    }
}

function copyEmail() {
    const email = 'jeffrey.xiao03@gmail.com';
    navigator.clipboard.writeText(email);

    const notification = document.getElementById('email-notification');
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function showBackpackingPage() {
    document.getElementById('main-container').style.display = 'none';
    const container = document.getElementById('backpacking-container');
    container.style.display = 'block';

    if (!container.dataset.loaded) {
        fetch('resources/gearlist.csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.trim().split('\n').map(line => line.split(','));
                const table = document.createElement('table');
                table.className = 'gearlist-table';

                rows.forEach((row, i) => {
                    const tr = document.createElement('tr');
                    row.forEach(cell => {
                        const td = document.createElement(i === 0 ? 'th' : 'td');
                        td.textContent = cell.trim();
                        tr.appendChild(td);
                    });
                    table.appendChild(tr);
                });

                container.appendChild(table);
                container.dataset.loaded = "true";
            })
            .catch(error => {
                container.innerHTML += "<p>Error loading gear list.</p>";
                console.error(error);
            });
    }
}