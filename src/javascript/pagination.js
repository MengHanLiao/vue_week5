export const pagination = {
  inject: ["pagination"],
  template: `<nav class="self-center">
    <ul class="flex divide-x-2 divide-red-200 border-2 border-red-200 max-w-min">
      <li>
        <a class="block cursor-pointer hover:bg-red-100 px-3 py-1 focus:bg-slate-200"
          :class="{disabled: !pagination.hasPrev}"
          @click="getTargetPage(pagination.currentPage-1)">prev</a>
      </li>
      <li v-for="n in pagination.totalPages" :key="n+'jfiafjfwe'">
        <a class="block cursor-pointer hover:bg-red-100 px-3 py-1 focus:bg-red-200 focus:font-bold"
          :class="{active: n===pagination.currentPage}"
          @click="getTargetPage(n)">{{ n }}</a>
      </li>
      <li>
        <a class="block cursor-pointer hover:bg-red-100 px-3 py-1"
          :class="{disabled: !pagination.hasNext}"
          @click="getTargetPage(pagination.currentPage+1)">next</a>
      </li>
    </ul>
  </nav>`,
  methods: {
    getTargetPage(target) {
      if(target < 0){
        this.pagination.currentPage = 1;
      }else if(target > this.pagination.totalPages){
        this.pagination.currentPage = this.pagination.totalPages;
      }else{
        this.pagination.currentPage = target;
      }
    }
  }
}