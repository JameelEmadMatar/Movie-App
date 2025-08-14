<template>
    <nav>
        <div class="container navbar-content">
            <div class="logo">
                <div class="title">
                    <font-awesome-icon icon="film"/>
                    <h1>Movie App</h1>
                </div>
                <button type="button" class="navbar-toggle" id="navbar-toggle" aria-label="navbar-toggle">
                    <span class=""icon-bar></span>
                    <span class=""icon-bar></span>
                    <span class=""icon-bar></span>
                </button>
            </div>
            <div class="navbar-list">
                <ul>
                    <li>
                        <router-link to='/'>Home</router-link>
                        <router-link to='/movies'>Movies</router-link>
                        <router-link to='/actors'>Actors</router-link>
                        <router-link to='/genres'>Genres</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(()=>{
    let navToggle = document.querySelector('.navbar-toggle')
    let navShow = document.querySelector('.navbar-list')
    navToggle.addEventListener('click' , showNav)
    function showNav(){
      navShow.classList.toggle('open')
      navToggle.classList.toggle('hamburger')
    }

})
</script>

<style scoped>
nav{
    background-color:#172026;
    color:#fff;
}
nav .navbar-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}
nav .navbar-content .logo{
    display: flex;
    align-items: center;
}
nav .navbar-content .logo .title{
    display: flex;
    gap: 10px;
    align-items: center;
}
nav .navbar-content .logo svg{
    width:30px;
    height:30px;
}
nav .navbar-content .logo .navbar-toggle {
    cursor: pointer;
    border: none;
    background-color: transparent;
    width: 40px;
    height: 40px;
    flex-direction: column;
    justify-content: space-around;
    display:none;
}
nav .navbar-content .logo .navbar-toggle span{
    width: 100%;
    height: 3px;
    background-color: #fff;
}
nav .open{
    display: flex !important;
}
nav .navbar-list ul li{
    list-style: none;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
}
nav .navbar-list ul li a{
    text-decoration:none;
    padding: 0 5px;
    color: #fff;
}
@media (max-width:768px){
    nav .navbar-content{
        flex-direction: column;
    }
    nav .navbar-list{
        display:none;
    }
    nav .navbar-content .logo{
        width:100%;
        justify-content:space-between;
    }
    nav .navbar-content .logo .navbar-toggle{
        display:flex
    }
    nav .navbar-list ul li{
        gap: 15px;
        margin-top: 20px;
        flex-direction: column;
    }
}
</style>