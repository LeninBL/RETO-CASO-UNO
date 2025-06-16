const data = [
  {
    cod_dig: "PRD001",
    producto: "Paracetamol 500mg",
    laboratorio: "Genfar",
    stock_actual: 150,
    stock_minimo: 50,
  },
  {
    cod_dig: "PRD002",
    producto: "Ibuprofeno 400mg",
    laboratorio: "Bayer",
    stock_actual: 80,
    stock_minimo: 100,
  },
  {
    cod_dig: "PRD003",
    producto: "Amoxicilina 250mg",
    laboratorio: "Pfizer",
    stock_actual: 45,
    stock_minimo: 30,
  },
  {
    cod_dig: "PRD004",
    producto: "Omeprazol 20mg",
    laboratorio: "Genfar",
    stock_actual: 120,
    stock_minimo: 60,
  },
  {
    cod_dig: "PRD005",
    producto: "Loratadina 10mg",
    laboratorio: "Bayer",
    stock_actual: 90,
    stock_minimo: 40,
  },
  {
    cod_dig: "PRD006",
    producto: "Diclofenaco 50mg",
    laboratorio: "Pfizer",
    stock_actual: 65,
    stock_minimo: 50,
  },
  {
    cod_dig: "PRD007",
    producto: "Cetirizina 10mg",
    laboratorio: "Genfar",
    stock_actual: 110,
    stock_minimo: 70,
  },
  {
    cod_dig: "PRD008",
    producto: "Metformina 500mg",
    laboratorio: "Bayer",
    stock_actual: 30,
    stock_minimo: 40,
  },
  {
    cod_dig: "PRD009",
    producto: "Atorvastatina 20mg",
    laboratorio: "Pfizer",
    stock_actual: 75,
    stock_minimo: 50,
  },
  {
    cod_dig: "PRD010",
    producto: "Losartán 50mg",
    laboratorio: "Genfar",
    stock_actual: 95,
    stock_minimo: 60,
  },
  {
    cod_dig: "PRD011",
    producto: "Salbutamol inhalador",
    laboratorio: "Bayer",
    stock_actual: 25,
    stock_minimo: 30,
  },
  {
    cod_dig: "PRD012",
    producto: "Ranitidina 150mg",
    laboratorio: "Pfizer",
    stock_actual: 60,
    stock_minimo: 40,
  },
  {
    cod_dig: "PRD013",
    producto: "Dexametasona 4mg",
    laboratorio: "Genfar",
    stock_actual: 40,
    stock_minimo: 20,
  },
  {
    cod_dig: "PRD014",
    producto: "Hidroclorotiazida 25mg",
    laboratorio: "Bayer",
    stock_actual: 85,
    stock_minimo: 50,
  },
  {
    cod_dig: "PRD015",
    producto: "Clonazepam 2mg",
    laboratorio: "Pfizer",
    stock_actual: 15,
    stock_minimo: 25,
  },
];

let currentPage = 1;
let itemsPerPage = 15;
let filteredData = [...data];

document.addEventListener("DOMContentLoaded", function () {
  renderCards();
  renderPagination();
  updatePaginationInfo();

  document.getElementById("searchInput").addEventListener("input", function () {
    filterData();
    currentPage = 1;
    renderCards();
    renderPagination();
    updatePaginationInfo();
  });

  document
    .getElementById("itemsPerPage")
    .addEventListener("change", function () {
      itemsPerPage = parseInt(this.value);
      currentPage = 1;
      renderCards();
      renderPagination();
      updatePaginationInfo();
    });
});

function filterData() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  filteredData = data.filter(
    (item) =>
      item.cod_dig.toLowerCase().includes(searchTerm) ||
      item.producto.toLowerCase().includes(searchTerm) ||
      item.laboratorio.toLowerCase().includes(searchTerm)
  );
}

function renderCards() {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentItems = filteredData.slice(startIndex, endIndex);

  if (currentItems.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">No se encontraron resultados</div>';
    return;
  }

  currentItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
                    <div class="card-header d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#collapse${item.cod_dig}">
                        <h5 class="mb-0">${item.producto}</h5>
                        <span class="badge bg-primary">${item.cod_dig}</span>
                    </div>
                    <div class="collapse show" id="collapse${item.cod_dig}">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <p><strong>Laboratorio:</strong> ${item.laboratorio}</p>
                                </div>
                                <div class="col-md-4">
                                    <p><strong>Stock actual:</strong> <span>${item.stock_actual}</span></p>
                                </div>
                                <div class="col-md-4">
                                    <p><strong>Stock mínimo:</strong> ${item.stock_minimo}</p>
                                </div>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-sm btn-outline-primary">Editar</button>
                            </div>
                        </div>
                    </div>
                `;

    container.appendChild(card);
  });
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (totalPages <= 1) return;

  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML =
    '<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
  prevLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderCards();
      renderPagination();
      updatePaginationInfo();
    }
  });
  pagination.appendChild(prevLi);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderCards();
      renderPagination();
      updatePaginationInfo();
    });
    pagination.appendChild(li);
  }

  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextLi.innerHTML =
    '<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
  nextLi.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderCards();
      renderPagination();
      updatePaginationInfo();
    }
  });
  pagination.appendChild(nextLi);
}

function updatePaginationInfo() {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);
  const totalItems = filteredData.length;

  document.getElementById(
    "paginationInfo"
  ).textContent = `Mostrando ${startItem} a ${endItem} de ${totalItems} registros`;
}
