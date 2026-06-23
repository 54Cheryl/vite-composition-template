<template>
  <HomeNav />
  <!-- 第一屏 -->
  <div class="pt-5" style="background-image: url(https://images.unsplash.com/photo-1531970227416-f0cddeb1f748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80); background-position: center center; opacity: 1; height: 100vh; background-size: cover; background-repeat: no-repeat;">
    <div class="text-center" data-aos="flip-left" data-aos-duration="2000">
      <div class="p-2 d-inline-block" style="border: 4px solid rgb(255, 255, 255, 0.8); margin-top: 17vh; box-sizing: border-box; writing-mode: vertical-lr;">
        <div class="text-white fs-1 Serif-TC bg-opacity-20 pt-5" style="letter-spacing: 1rem; border: 1px solid rgb(255, 255, 255, 0.8);vertical-align: middle; box-sizing: border-box;">
          <p class="">坐酌泠泠水，</p>
          <p class="">看煎瑟瑟塵。</p>
          <p class="">無由持一碗，</p>
          <p class="">寄與愛茶人。</p>
        </div>
      </div>
    </div>
    <div class="position-relative text-center" style="top: -3rem;" data-aos="fade-down" data-aos-duration="1400">
      <p class="bg-white mx-auto" style="width: 1px; height: 90px;"></p>
      <span class="text-white letter-spacing Serif-TC ps-2">滾動觀看更多</span>
      <i class="bi bi-chevron-down text-white d-block downFrames"></i>
    </div>
  </div>
  <!-- 第二屏-手機 -->
  <div class="bg-sec tel-use">
    <div class="container py-5">
      <div class="row">
        <div class="col-12 col-md-5" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="100" data-aos-offset="0">
          <img src="/src/assets/img/brandAppeal.svg" alt="品牌理念" class="img-fluid">
        </div>
        <div class="tel-use mt-2">
          <div class="d-flex my-4 col-md-2" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="400" data-aos-offset="0">
            <div class="col-auto ps-3 position-relative">
              <img src="/src/assets/img/right.svg" alt="title-icon-img" class="position-absolute" style="left: -0.1rem; top: -1rem;">
              <h3 class="letter-spacing Serif-TC mb-0 neutral-900">品牌理念</h3>
              <span class="text-center fs-7 Serif-TC mt-4 neutral-900">Brand Appeal</span>
            </div>
            <div class="col m-auto ps-3">
              <p class="bg-n500 m-auto" style="height: 1px;"></p>
            </div>
          </div>
          <div class="col-12 col-md-auto my-auto p-0" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="400" data-aos-offset="0">
            <div class="bg-opacity-80 px-4">
              <p class="Sans-TC pt-4 m-0 neutral-700 fs-5 writing-lr">別茶寄與愛茶人</p>
              <p class="Sans-TC py-4 m-0 neutral-500 writing-lr">品牌名稱取自於《謝李六郎中寄新蜀茶》詩中的尾句「別茶人」，即專業的茶葉品評師。我們像白居易一樣，熱愛茶文化，將最好的茶葉帶給每位愛茶人。別茶二字象徵著我們對茶葉的鑑賞、了解和熱愛。我們期待與您分享這份熱情，為您帶來最美好的品茶體驗。無論您是在家中享用或與好友分享，我們的使命就是為您提供最好的茶葉。讓我們一起品嚐這份美好，享受別具風味的茶葉文化。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 第二屏 -->
  <div class="bg-sec other-use">
    <div class="container py-5">
      <div class="row flex-row-reverse justify-content-evenly my-5 position-relative">
        <div class="col-lg-6 col-md-10 my-auto p-0 position-relative appeal-img" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="100">
          <img src="/src/assets/img/brandAppeal.svg" alt="品牌理念" class="img-fluid card-img">
        </div>
        <div class="col-lg-6 col-md-10 p-0 d-flex justify-content-md-start justify-content-lg-center position-relative appeal-top" style="max-height: 450px; height: 55vh; z-index: 2;">
          <div class="col-md-auto pe-md-4 pe-lg-0 mx-5" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">
            <div class="d-flex position-relative">
              <img src="/src/assets/img/left.svg" alt="title-icon-img" class="position-absolute" style="right: 0.5rem; top: -0.2rem;">
              <h3 class="letter-spacing Serif-TC mt-3 mx-0 writing-lr neutral-900">品牌理念
              </h3>
              <span class="text-center fs-7 Serif-TC writing-lr mt-3 neutral-900">Brand Appeal</span>
            </div>
            <p class="bg-n500 m-auto" style="width: 1px; height: 15vh;"></p>
          </div>
          <div class="col-md-auto bg-opacity-80 writing-lr my-4" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="100" data-aos-offset="0">
            <p class="letter-spacing Sans-TC neutral-700 fs-5 mt-4" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="300" data-aos-offset="0">別茶寄與愛茶人</p>
            <p class="lh-lg Sans-TC neutral-500 mb-4 mt-4" style="letter-spacing: 0.3rem;" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="400" data-aos-offset="0">品牌名稱取自於《謝李六郎中寄新蜀茶》詩中的尾句「別茶人」，即專業的茶葉品評師。我們像白居易一樣，熱愛茶文化，將最好的茶葉帶給每位愛茶人。別茶二字象徵著我們對茶葉的鑑賞、了解和熱愛。我們期待與您分享這份熱情，為您帶來最美好的品茶體驗。無論您是在家中享用或與好友分享，我們的使命就是為您提供最好的茶葉。讓我們一起品嚐這份美好，享受別具風味的茶葉文化。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 第三屏 -->
  <div class="container">
    <div class="row pb-4 pt-5 px-0 justify-content-evenly">
      <div class="tel-use" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="400" data-aos-offset="0">
        <div class="d-flex col-md-2">
          <div class="col-auto ps-3 position-relative">
            <img src="/src/assets/img/right.svg" alt="title-icon-img" class="position-absolute" style="left: -0.1rem; top: -1rem;">
            <h3 class="letter-spacing Serif-TC mb-0 neutral-900">別茶消息</h3>
            <span class="text-center fs-7 Serif-TC mt-4 neutral-900">News</span>
          </div>
          <div class="col m-auto ps-3">
            <p class="bg-n500 m-auto" style="height: 1px;"></p>
          </div>
        </div>
      </div>
      <div class="row col-md-10 pt-5 m-auto">
        <div class="col-12 col-md-6 col-lg-4 position-relative d-flex align-items-stretch" v-for="item in news" :key="item.news_id" data-aos="fade-up" data-aos-duration="1000">
          <div v-if="item.new_arrivals" class="position-absolute bg-opacity-100" style="writing-mode: vertical-lr; z-index: 2; left: 2rem; top: -1rem; border: 1px solid #BB0000;">
            <p class="text-white Serif-TC letter-spacing px-1 pt-3 pb-2 m-1" style="background: #E52E2E;">
              新品上架
            </p>
          </div>
          <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 22rem;">
            <img :src="item.news_img" class="card-img-top rounded-0 object-cover" alt="別茶消息" style="height: 200px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="mb-3">
                <h5 class="card-title Serif-TC neutral-900">{{ item.news_title }}</h5>
                <p class="fs-sm neutral-300 Sans-TC">{{ item.news_date }}</p>
                <p class="card-text Serif-TC multiline-ellipsis neutral-500">{{ item.news_content }}</p>
              </div>
              <div>
                <router-link :to="`/news/${item.news_id}`" class="link-primary text-decoration-none Serif-TC stretched-link">瞭解更多</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-auto px-0 other-use">
        <div class="d-flex" style="max-height: 40vh;">
          <div class="me-4 pe-lg-5" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">
            <div class="d-flex position-relative">
              <img src="/src/assets/img/left.svg" alt="title-icon-img" class="position-absolute" style="right: 0.5rem; top: 0.3rem;">
              <h3 class="letter-spacing Serif-TC mt-4 mx-0 writing-lr neutral-900">別茶消息
              </h3>
              <span class="text-left fs-7 Serif-TC writing-lr mt-4 pt-4 neutral-900">News</span>
            </div>
            <p class="bg-n500 m-auto" style="width: 1px; height: 15vh;"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="pb-4 mb-4 text-center" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine"  data-aos-offset="0">
      <a href="/vite-template/#/news" class="Serif-TC letter-spacing text-center btn btn-outline-custom m-auto" style="padding-left: 2rem;">消息總覽</a>
    </div>
  </div>
  <!-- 第四屏 -->
  <div class="container">
    <div class="row pb-4 pt-4 px-0">
      <div class="tel-use" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-delay="400" data-aos-offset="0">
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
      <div class="col-md-auto other-use px-0" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">
        <div class="d-flex" style="max-height: 40vh;">
          <div class="ms-4 ps-lg-5">
            <div class="d-flex position-relative">
              <img src="/src/assets/img/left.svg" alt="title-icon-img" class="position-absolute" style="right: 0.5rem; top: 0.3rem;">
              <h3 class="letter-spacing Serif-TC mt-4 mx-0 writing-lr neutral-900">茶品介紹
              </h3>
              <span class="text-left fs-7 Serif-TC writing-lr mt-4 pt-4 neutral-900">Tea Intro</span>
            </div>
            <p class="bg-n500 m-auto" style="width: 1px; height: 15vh;"></p>
          </div>
        </div>
      </div>
      <div class="row col-md-10 d-flex justify-content-left pt-5 m-auto">
        <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-duration="800">
          <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
            <div class="position-relative">
              <img src="/src/assets/img/red-tea.svg" class="card-img-top rounded-0 object-cover" alt="紅茶" style="height: 220px;">
              <div class="position-absolute border border-white translate-middle top-50" style="z-index: 2; left: 50%; ">
                <p class="text-white fs-4 Serif-TC letter-spacing m-0 px-1 pb-2 pt-3" style="writing-mode: vertical-lr;">紅茶</p>
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
        <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
          <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
            <div class="position-relative">
              <img src="/src/assets/img/green-tea.svg" class="card-img-top rounded-0 object-cover" alt="綠茶" style="height: 220px;">
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
        <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
          <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
            <div class="position-relative">
              <img src="/src/assets/img/oolong-tea.svg" class="card-img-top rounded-0 object-cover" alt="青茶" style="height: 220px;">
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
        <div class="col-12 col-md-6 col-lg-3 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
          <div class="card rounded-0 border-0 shadow-custom mb-4 mx-auto" style="max-width: 20rem;">
            <div class="position-relative">
              <img src="/src/assets/img/black-tea.svg" class="card-img-top rounded-0 object-cover" alt="黑茶" style="height: 220px;">
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
    <div class=" pb-5 mb-5 text-center" data-aos="fade-zoom-in" data-aos-easing="ease-in-sine" data-aos-offset="0">
      <a href="/vite-template/#/products" class="Serif-TC letter-spacing text-center btn btn-outline-custom m-auto" style="padding-left: 2rem;">產品總覽</a>
    </div>
  </div>
  <FrontFooter />
</template>

<!-- <script>
import { mapState } from 'pinia'
import newsStore from '@/stores/newsStore'
import HomeNav from '@/components/HomeNav.vue'
import FrontFooter from '@/components/FrontFooter.vue'
export default {
  components: {
    HomeNav,
    FrontFooter
  },
  computed: {
    ...mapState(newsStore, ['news'])
  }
}
</script> -->

<script setup>
import { computed } from 'vue'
import useNewsStore from '@/stores/newsStore'
import HomeNav from '@/components/HomeNav.vue'
import FrontFooter from '@/components/FrontFooter.vue'
const newsStore = useNewsStore()
const news = computed(() => newsStore.news)

</script>

<style>
.downFrames{
  position: relative;
  animation: 2s;
  animation-name: moving;
  animation-iteration-count: infinite;
}
@keyframes moving {
  0%{
    top: 0
  }
  50%{
    top: 10px
  }
  100%{
    top: 0
  }
}
</style>
