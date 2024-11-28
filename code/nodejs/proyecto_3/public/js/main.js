function test_axios(){
    
    
    const loadingSpinner = document.getElementById('loading');
    const dataContainer = document.getElementById('dataContainer');
    
    // Mostrar el spinner
    loadingSpinner.classList.remove('d-none');

    // Limpiar contenido previo
    dataContainer.innerHTML = '';

    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const data = response.data.slice(0, 5); // Tomar elementos para ejemplo
            const table = document.createElement('table');
            table.className = 'table table-striped table-bordered';

            // Encabezado de la tabla
            table.innerHTML = `
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Contenido</th>
                    </tr>
                </thead>
            `;

            // Cuerpo de la tabla
            const tbody = document.createElement('tbody');
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.body}</td>
                `;
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            const dataContainer = document.getElementById('dataContainer');
            dataContainer.innerHTML = ''; // Limpiar contenido previo
            dataContainer.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        })
        .finally(() => {
            // Ocultar el spinner
            loadingSpinner.classList.add('d-none');
        });

}