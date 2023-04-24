// navbar
async function loadDataNavbar() {
  const response = await fetch("http://localhost:4567/category");
      const jsonData = await response.json();
      jsonData.forEach(element => {
          var linkCat = document.createElement("a");
          linkCat.className = "p-4 block bg-teal-500 text-white";
          linkCat.href= "../html/categorie.html?id="+element.id;
          var linkCat_text = document.createTextNode(element.name);
          linkCat.appendChild(linkCat_text);
          document.getElementById("dropdown").appendChild(linkCat);
      });

      if(localStorage.getItem("token")){
          var button= document.getElementById("connect");
          button.innerHTML="Se déconnecter";
          button.onclick= (e)=>{
              e.preventDefault()
              localStorage.removeItem("token");
              window.location.reload()
          }
      }
  }
