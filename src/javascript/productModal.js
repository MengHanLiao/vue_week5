export const productModal = {
  data() {
    return {
      pruductNum: 1,
    }
  },
  props: ['isOpenModal','productDetail'],
  template: `
  <div class="overflow-hidden fixed inset-0 z-50 bg-slate-600/75 transition-opacity duration-200" aria-hidden="true"
    :class="{'opacity-0': !isOpenModal,'w-0': !isOpenModal}"
    aria-labelledby="productModal">
    <div class="w-full max-w-4xl mx-auto mt-4">
      <div class="bg-white px-6 py-4 divide-y-2 mx-3">
        <div class="flex justify-between items-center mb-4">
          <h5 class="text-xl font-bold">詳細資訊</h5>
          <button class="block hover:bg-red-200 p-2" type="button"
            @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>
        <div class="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0 py-4">
          <img class="block object-cover w-full h-48 md:w-1/3 md:h-96"
            :src="productDetail.imageUrl">
          <div class="md:w-2/3 text-lg">
            <h4 class="text-xl font-bold mb-3">
              {{ productDetail.title }}
              <span class="bg-red-50 text-base p-2 ml-2">{{ productDetail.category }}</span>
            </h4>
            <p class="mb-3">{{ productDetail.description }}</p>
            <p class="mb-3">原料: {{ productDetail.content }}</p>
            <div class="text-right">
              <del class="text-lg">原價 {{ productDetail.origin_price }} 元</del>
              <p class="text-2xl text-red-400">折扣價 {{ productDetail.price }} 元</p>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-x-4 pt-4">
          <input class="w-32 border-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-100 focus:bg-white py-1 px-2"
            type="number" min="1"
            v-model="pruductNum">
          <button class="block bg-red-200 hover:bg-red-300 font-semibold px-4 py-2" type="button"
            @click="updateCartItem(productDetail.id)">加入購物車</button>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    closeModal() {
      this.pruductNum = 1;
      this.$emit('close-product-modal');
    },
    updateCartItem(id) {
      if(this.pruductNum > 0) {
        this.$emit('update-cart-item', id, this.pruductNum);
      }
    }
  }
};