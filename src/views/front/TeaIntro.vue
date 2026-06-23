<template>
  <NavBar />
  <div class="bg-sec" style="padding-top: 90px; padding-bottom: 4vh;">
    <div class="position-relative d-flex align-items-center justify-content-center" style="min-height: 180px;">
      <div class="position-absolute" style="top:0; bottom: 0; left: 0; right: 0; background-image: url(https://images.unsplash.com/photo-1550450339-e7a4787a2074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80); background-position: center center; opacity: 1;"></div>
    </div>
    <div class="container pb-5 pt-3">
      <div class="row py-4 px-0">
        <div class="tel-use" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="100" data-aos-offset="0">
          <div class="d-flex col-md-2">
            <div class="col-auto ps-3 position-relative">
              <img src="/src/assets/img/right.svg" alt="title-icon-img" class="position-absolute" style="left: -0.1rem; top: -1rem;">
              <h3 class="letter-spacing Serif-TC mb-0 neutral-900">茶品介紹</h3>
              <span class="text-center fs-7 Serif-TC mt-4 neutral-900">Tea Intro</span>
            </div>
            <div class="col m-auto ps-3">
              <p class="bg-n500 m-auto" style="height: 1px;"></p>
            </div>
          </div>
        </div>
        <div class="col-md-auto other-use px-0">
          <div class="d-flex" style="max-height: 40vh;">
            <div class="ms-4">
              <div class="d-flex position-relative" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">
                <img src="/src/assets/img/left.svg" alt="title-icon-img" class="position-absolute" style="right: 0.5rem; top: 0.3rem;">
                <h3 class="letter-spacing Serif-TC mt-4 mx-0 writing-lr neutral-900">茶品介紹
                </h3>
                <span class="text-left fs-7 Serif-TC writing-lr mt-4 pt-4 neutral-900" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">Tea Intro</span>
              </div>
              <p class="bg-n500 m-auto" style="width: 1px; height: 15vh;" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0" data-aos-delay="100"></p>
            </div>
          </div>
        </div>
        <div class="row col-md-10 d-flex justify-content-left pt-5 m-auto" data-aos="fade-up" data-aos-duration="1000">
          <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch">
            <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
              <div class="position-relative">
                <img src="/src/assets/img/red-tea.svg" class="card-img-top rounded-0 object-cover" alt="紅茶" style="height: 200px;">
                <div class="position-absolute border border-white translate-middle top-50" style="z-index: 2; left: 50%;">
                  <p class="text-white fs-4  Serif-TC letter-spacing m-0 px-1 pb-2 pt-3" style="writing-mode: vertical-lr;">紅茶</p>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <p class="card-text Serif-TC neutral-500">紅茶在六大茶系當中是屬於近全發酵的茶款，其製茶流程從採茶後進行萎凋，後續進行發酵工藝至全發酵狀態。常見的阿薩姆紅茶、錫蘭紅茶、紅玉等皆紅茶系茶款。</p>
                <div class="align-self-start mt-auto mx-auto">
                  <router-link to="/category/紅茶" class="link-primary text-decoration-none Serif-TC stretched-link">前往選購</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch">
            <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
              <div class="position-relative">
                <img src="/src/assets/img/green-tea.svg" class="card-img-top rounded-0 object-cover" alt="綠茶" style="height: 200px;">
                <div class="position-absolute border border-white translate-middle top-50" style="z-index: 2; left: 50%;">
                  <p class="text-white fs-4  Serif-TC letter-spacing m-0 px-1 pb-2 pt-3" style="writing-mode: vertical-lr;">綠茶</p>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <p class="card-text Serif-TC neutral-500">綠茶在六大茶系當中是屬於不發酵的茶款，其製茶流程採茶後立刻進行殺青破壞酵素。台灣經典的綠茶款如三峽碧螺春、龍井即為綠茶系茶款。</p>
                <div class="align-self-start mt-auto mx-auto">
                  <router-link to="/category/綠茶" class="link-primary text-decoration-none Serif-TC stretched-link">前往選購</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch">
            <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
              <div class="position-relative">
                <img src="/src/assets/img/oolong-tea.svg" class="card-img-top rounded-0 object-cover" alt="青茶" style="height: 200px;">
                <div class="position-absolute border border-white translate-middle top-50" style="z-index: 2; left: 50%;">
                  <p class="text-white fs-4  Serif-TC letter-spacing m-0 px-1 pb-2 pt-3" style="writing-mode: vertical-lr;">青茶</p>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <p class="card-text Serif-TC neutral-500">青茶又被廣稱作烏龍茶，青茶在六大茶系當中是屬於部分發酵的茶款，發酵程度是介於綠茶與紅茶之間。台灣常見如：凍頂烏龍、阿里山烏龍、梨山烏龍等皆青茶系茶款。</p>
                <div class="align-self-start mt-auto mx-auto">
                  <router-link to="/category/青茶" class="link-primary text-decoration-none Serif-TC stretched-link">前往選購</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch">
            <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
              <div class="position-relative">
                <img src="/src/assets/img/black-tea.svg" class="card-img-top rounded-0 object-cover" alt="黑茶" style="height: 200px;">
                <div class="position-absolute border border-white translate-middle top-50" style="z-index: 2; left: 50%;">
                  <p class="text-white fs-4  Serif-TC letter-spacing m-0 px-1 pb-2 pt-3" style="writing-mode: vertical-lr;">黑茶</p>
                </div>
              </div>
              <div class="card-body d-flex flex-column">
                <p class="card-text Serif-TC neutral-500">黑茶在六大茶系中，屬於100%發酵的茶款，在茶葉進行加工後堆積發酵的時間較長，讓茶葉呈現為暗褐色的樣態。常見茶款如：普洱茶。</p>
                <div class="align-self-start mt-auto mx-auto">
                  <router-link to="/category/黑茶" class="link-primary text-decoration-none Serif-TC stretched-link">前往選購</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pb-5 mb-5 text-center">
        <a href="/vite-template/#/products" class="Serif-TC letter-spacing text-center btn btn-outline-custom m-auto" style="padding-left: 2rem;">產品總覽</a>
      </div>
    </div>
  </div>
  <FrontFooter />
</template>

<!-- <script>
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
export default {
  components: {
    NavBar,
    FrontFooter
  }
}
</script> -->

<script setup>
import NavBar from '@/components/NavBar.vue'
import FrontFooter from '@/components/FrontFooter.vue'
</script>

<style>
.hoverImg{
  background-color: rgb(0, 0, 0, 0.4);
}
.hoverImg:hover{
  background-color: rgb(0, 0, 0, 0);
}
</style>
