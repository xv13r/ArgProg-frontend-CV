const getRandomUser = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        reject(
          "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
            response.status
        );
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
};

const setFrontInfo = (data) => {
    let info = data.results[0];

    const hero = document.getElementById("hero");
    const name = document.getElementsByClassName("hero_title")[0];
    const fullname = document.getElementById("fullname");
    const age = document.getElementById("age");
 
    hero.src = info.picture.large;
    name.innerText = "Hola, Soy " + info.name.first;
    fullname.innerText = info.name.first + " " + info.name.last;
    age.innerText = info.dob.age;

};

const header = document.querySelector(".navbar");

window.onscroll = () => {
  const top = window.scrollY;
  if (top >= 100) {
    header.classList.add("navbarDark");
  } else {
    header.classList.remove("navbarDark");
  }
};

const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarSupportedContent");

navLinks.forEach((l) => {
  l.addEventListener("click", () => {
    new bootstrap.Collapse(menuToggle).toggle();
  });
});

window.addEventListener("load", async function () {
    await getRandomUser("https://randomuser.me/api")
    .then(data => {
        setFrontInfo(data);
    })
    .catch((err) => {
      console.log("Error encontrado:", err);
    });
});
