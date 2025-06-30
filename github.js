document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.github.com/users/RolandHaden/repos")
    .then((response) => response.json())
    .then((data) => {
      // Sort repositories by most recently updated
      data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      const reposArray = data.map((repo) => ({
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description || "No description available",
      }));

      displayRepos(reposArray);
    })
    .catch((error) => console.error("Error fetching data:", error));

  function displayRepos(reposArray) {
    const reposContainer = document.getElementById("repos-container");

    reposArray.forEach((repo) => {
      const repoDiv = document.createElement("div");
      repoDiv.classList.add("repo-item");

      const nameElement = document.createElement("strong");
      nameElement.classList.add("name-element"); // Assign the name-element class
      nameElement.textContent = "";
      const nameValue = document.createTextNode(repo.name);
      nameElement.appendChild(nameValue);

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = `${repo.description}`;

      const urlElement = document.createElement("p");
      const urlLink = document.createElement("a");
      urlElement.classList.add("url-element"); // Assign the url-element class
      urlLink.classList.add("link-element"); // Assign the link-element class

      urlLink.href = repo.html_url;
      urlLink.target = "_blank";
      urlLink.textContent = repo.html_url;
      urlElement.appendChild(urlLink);



      repoDiv.appendChild(nameElement);
      repoDiv.appendChild(descriptionElement);
      repoDiv.appendChild(urlElement);

      reposContainer.appendChild(repoDiv);
    });
  }
});