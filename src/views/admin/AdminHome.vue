<template>
  <div class="container d-flex justify-content-center align-items-center text-center" style="height: 100vh;">
    <div class="flex-grow-1">
      <h1 class="Serif-TC letter-spacing">歡迎進入，後台管理</h1>
      <div class="d-flex justify-content-evenly pt-5 col-sm-12 col-md-10 m-auto">
        <router-link to="/admin/products">
          <i class="bi bi-box-seam" style="font-size: 4rem;"></i>
          <h4 class="Sans-TC">產品管理</h4>
        </router-link>
        <router-link to="/admin/orders">
          <i class="bi bi-card-checklist" style="font-size: 4rem;"></i>
          <h4 class="Sans-TC">訂單管理</h4>
        </router-link>
        <router-link to="/admin/coupons">
          <i class="bi bi-tag" style="font-size: 4rem;"></i>
          <h4 class="Sans-TC">優惠券管理</h4>
        </router-link>
      </div>
    </div>
  </div>
</template>
