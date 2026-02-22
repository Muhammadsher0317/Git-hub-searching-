const form=document.querySelector("form")
const body=document.querySelector("body")
const mode=document.querySelector(".mode")
const input=document.querySelector(".input")
const datamainslar=document.querySelector(".datamainslar")
const loader=document.querySelector(".loader")
const getapi= async()=>{
  loader.classList.add("active")
let req =await fetch(`https://api.github.com/users/${input.value}`)
let data=await req.json()
writedata(data);
loader.classList.remove("active")
}
mode.addEventListener("click",()=>{
  if(darkmode=="dark"){
    darkmode="light"
  }else{
    darkmode="dark"
  }
  darkmodefunktion(darkmode)  
})
let darkmode=localStorage.getItem("darkmode")?localStorage.getItem("darkmode"):
"light"
const darkmodefunktion=(darkitems)=>{
if(darkitems==="light"){
  body.classList.add("active")
  mode.textContent="Dark"
  console.log(darkitems);
}else{
  body.classList.remove("active")
  mode.textContent="Light"
}
localStorage.setItem("darkmode",darkitems)
}
darkmodefunktion(darkmode)  
form.addEventListener("submit",(e)=>{
e.preventDefault()
getapi(`https://api.github.com/users/${input.value}`)
})
const writedata=(info)=>{
input.value=""
datamainslar.innerHTML=`
  <div class="mainimg">
                    <img src="${info.avatar_url}" alt="">
                 </div>
                 <div class="datainfo">
                    <div class="namesline">
                        <h2>${info.name ||"Not available"}</h2> <span class="createddate">${info.created_at ? info.created_at.slice(0,10) :"Not available"}</span>
                    </div>
                    <div class="datalinks">
                         <a href=""> ${info.id}</a>
                    </div>
                    <div class="bitolines">
                     <p>${info.bio ||"Not available"}</p>
                    </div>
                    <div class="followerwithfoloow">
                      <div class="repost">
                          <h1>Repos</h1>
                          <span>${info.public_repos}</span>
                      </div>
                      <div class="Followers">
                        <h1>Followers</h1>
                        <span>${info.followers}</span>
                      </div>
                      <div class="Following">
                        <h1>Following</h1>
                        <span>${info.following}</span>
                      </div>
                    </div>
                    <div class="locations">
                        <p><i class="fa-solid fa-location-dot"></i> ${info.location ||"Not available"}</p>
                        <p ><i class="fa-brands fa-twitter"></i>${info.twitter_username ||"Not available"}e</p>
                         <p  ><i class="fa-solid fa-link"></i> <a class="linkslar" href="${info.html_url ||"Not available"}">${info.html_url ||"Not available"}</a></p>
                        <p > <i class="fa-solid fa-place-of-worship"></i> ${info.company ||"Not Available"}</p>
                    </div>
                 </div>`
}
