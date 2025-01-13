document.addEventListener("DOMContentLoaded", function() {
    fetch('xml/data.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const restaurants = xmlDoc.getElementsByTagName("restaurante");
            const restaurantList = document.getElementById("restaurant-list");

            function displayRestaurants(restaurants) {
                restaurantList.innerHTML = ''; 
                for (let i = 0; i < restaurants.length; i++) {
                    const name = restaurants[i].getElementsByTagName("nome")[0].textContent;
                    const location = restaurants[i].getElementsByTagName("localizacao")[0].textContent;
                    const description = restaurants[i].getElementsByTagName("descricao")[0].textContent;
                    const price = restaurants[i].getElementsByTagName("preco")[0].textContent;
                    const rating = restaurants[i].getElementsByTagName("pontuacao")[0].textContent;

                    const restaurantItem = document.createElement("div");
                    restaurantItem.innerHTML = `
                        <h3>${name}</h3>
                        <p>Localização: ${location}</p>
                        <p>${description}</p>
                        <p>Preço: ${price}</p>
                        <p>Pontuação: ${rating}</p>
                        <a href="restaurante.html?id=${i + 1}">Reservar</a>
                    `;
                    restaurantList.appendChild(restaurantItem);
                }
            }

            displayRestaurants(restaurants);

            const precoSelect = document.getElementById("preco");
            const pontuacaoSelect = document.getElementById("pontuacao");

            function filterRestaurants() {
                const selectedPrice = precoSelect.value;
                const selectedRating = pontuacaoSelect.value;

                let filteredRestaurants = Array.from(restaurants);

                if (selectedPrice === "crescente") {
                    filteredRestaurants.sort((a, b) => {
                        return parseFloat(a.getElementsByTagName("preco")[0].textContent) - parseFloat(b.getElementsByTagName("preco")[0].textContent);
                    });
                } else if (selectedPrice === "decrescente") {
                    filteredRestaurants.sort((a, b) => {
                        return parseFloat(b.getElementsByTagName("preco")[0].textContent) - parseFloat(a.getElementsByTagName("preco")[0].textContent);
                    });
                }

                if (selectedRating === "crescente") {
                    filteredRestaurants.sort((a, b) => {
                        return parseFloat(a.getElementsByTagName("pontuacao")[0].textContent) - parseFloat(b.getElementsByTagName("pontuacao")[0].textContent);
                    });
                } else if (selectedRating === "decrescente") {
                    filteredRestaurants.sort((a, b) => {
                        return parseFloat(b.getElementsByTagName("pontuacao")[0].textContent) - parseFloat(a.getElementsByTagName("pontuacao")[0].textContent);
                    });
                }

                displayRestaurants(filteredRestaurants);
            }

            precoSelect.addEventListener("change", filterRestaurants);
            pontuacaoSelect.addEventListener("change", filterRestaurants);
        });
});