const API_URL = "https://mysql-movie.onrender.com/api/movies";

// Obtener películas
async function getMovies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener películas.");

    const movies = await response.json();
    const list = document.getElementById("movieList");
    list.innerHTML = "";

    movies.forEach(movie => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${movie.imageUrl ? `<img src="${encodeURI(movie.imageUrl)}" alt="Poster de ${movie.title}" class="movie-poster" onerror="this.style.display='none'" />` : ''}
        <div class="movie-content">
          <div class="movie-title">${movie.title} (${movie.year})</div>
          <div class="movie-details">
            <strong>Director:</strong> ${movie.director}<br>
            <strong>Sinopsis:</strong> ${movie.synopsis}
          </div>
          <div class="button-container">
            <button onclick="deleteMovie(${movie.id})">Eliminar</button>
          </div>
        </div>
      `;
      list.appendChild(li);
    });
  } catch (error) {
    alert(error.message);
  }
}

// Crear nueva película
async function createMovie() {
  const title = document.getElementById("title").value;
  const director = document.getElementById("director").value;
  const year = parseInt(document.getElementById("year").value);
  const synopsis = document.getElementById("synopsis").value;
  const imageUrl = document.getElementById("imageUrl").value;

  if (!title || !director || !year || !synopsis) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, director, year, synopsis, imageUrl })
    });

    if (response.ok) {
      alert("✅ ¡Película creada exitosamente!");
      getMovies();
    } else {
      throw new Error("❌ Error al crear la película.");
    }
  } catch (error) {
    alert(error.message);
  }
}

// Eliminar película
async function deleteMovie(id) {
  if (!confirm("¿Seguro que deseas eliminar esta película?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      alert("✅ ¡Película eliminada exitosamente!");
      getMovies();
    } else {
      throw new Error("❌ Error al eliminar la película.");
    }
  } catch (error) {
    alert(error.message);
  }
}
