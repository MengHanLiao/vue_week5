import { pagination } from "./pagination.js";
import { productModal } from "./productModal.js";

const app = Vue.createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2/api',
      path: 'meng001',
      allProducts: [],
      productList: [],
      cartList: [],
      productDetail: {},
      total: 0,
      pagination: {
        currentPage: 0,
        hasPrev: false,
        hasNext: false
      },
      orderData: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      loader: '',
      isNextPage: true,
      isOpenModal: false,
    }
  },
  components: {
    pagination,
    productModal
  },
  provide() {
    return {
      pagination: this.pagination,
    }
  },
  methods: {
    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
    getProductData() {
      axios.get(`${this.url}/${this.path}/products/all`)
        .then(res => {
          this.allProducts = res.data.products;
          this.pagination.totalPages = Math.ceil(this.allProducts.length / 6);
          this.pagination.currentPage = 1;
        })
        .catch(err => {
          console.dir(err);
        });
    },
    sliceAllProducts() {
      let start = this.pagination.currentPage*6 - 6;
      let end = this.pagination.currentPage*6;
      this.productList = this.allProducts.slice(start,end);
    },
    getCartData() {
      axios.get(`${this.url}/${this.path}/cart`)
        .then(res => {
          this.cartList = res.data.data.carts;
          this.total = res.data.data.total;
        })
        .catch(err => {
          console.dir(err);
        });
    },
    updateCartItem(id,num = 1) {
      this.isLoadingItem = id;
      const addToCartObj = {
        data: {
          "product_id": id,
          "qty": num
        },
      };
      let method = 'post';
      let methodUrl = `${this.url}/${this.path}/cart`;
      let msg = '加入購物車成功';
      const cart = this.cartList.find(item => item.product.id === id);
      if(cart){
        addToCartObj.data.qty = num + cart.qty;
        method = 'put';
        methodUrl = `${this.url}/${this.path}/cart/${cart.id}`;
        msg = '商品數量成功更新'
      }
      axios[method](`${methodUrl}`, addToCartObj)
        .then(res => {
          this.getCartData();
          this.closeModal();
          alert(msg);
        })
        .catch(err => {
          console.dir(err);
        });
    },
    deleteCartItem(id) {
      let methodUrl = `${this.url}/${this.path}/carts`;
      id ? methodUrl = `${this.url}/${this.path}/cart/${id}` : methodUrl;
      axios.delete(`${methodUrl}`)
        .then(res => {
          this.getCartData();
          alert('成功刪除商品')
        })
        .catch(err => {
          console.dir(err);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    changePage() {
      this.isNextPage = !this.isNextPage;
      this.loader = this.$loading.show({
        loader: 'dots',
        color: '#fca5a5',
      });
      setTimeout(() => this.loader.hide(),  500);
    },
    onSubmit() {
      const order = this.orderData;
      axios.post(`${this.url}/${this.path}/order`, { data: order })
        .then(res => {
          this.deleteCartItem();
          this.cartList = [];
          alert('訂單成功建立，返回商品頁');
          this.changePage();
        })
        .catch(err => {
          console.dir(err);
        });
    }
  },
  watch: {
    "pagination.currentPage": function() {
      this.pagination.currentPage !== this.pagination.totalPages ? this.pagination.hasNext = true : this.pagination.hasNext = false;
      this.pagination.currentPage !== 1 ? this.pagination.hasPrev = true : this.pagination.hasPrev = false;
      this.sliceAllProducts();
    }
  },
  mounted() {
    this.getProductData();
    this.getCartData();
    this.loader = this.$loading.show({
      loader: 'dots',
      color: '#fca5a5',
    });
    setTimeout(() => this.loader.hide(),  1000)
  },
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
app.component('defineRule', VeeValidate.defineRule);
app.component('configure', VeeValidate.configure);

VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);

VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true,
});

app.use(VueLoading.Plugin);
app.component('loading', VueLoading.Component);

app.mount('#app');